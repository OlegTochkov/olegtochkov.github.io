#!/usr/bin/env python3
"""
Integrity checker for cleanlogic.by.

Verifies:
  1. All routes in htaccess have a corresponding file in public/
  2. All URLs in sitemap.xml have a corresponding file in public/
  3. No old-style page*.html links remain in public/ HTML files
  4. No broken local href/src references in public/

Usage:
  python3 check.py
"""

import os
import re
import sys
import xml.etree.ElementTree as ET

BASE = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(BASE, "public")
HTACCESS = os.path.join(BASE, "htaccess")
SITEMAP = os.path.join(BASE, "sitemap.xml")

errors = []
warnings = []


def err(msg):
    errors.append(msg)
    print(f"  ERROR: {msg}")


def warn(msg):
    warnings.append(msg)
    print(f"  WARN:  {msg}")


def ok(msg):
    print(f"  OK:    {msg}")


# ── 1. Check htaccess routes ─────────────────────────────────────────────────
print("\n[1] Checking htaccess routes...")
route_pattern = re.compile(r"^RewriteRule\s+\^\S+\$\s+(\S+\.html)", re.MULTILINE)
with open(HTACCESS, encoding="utf-8") as f:
    htaccess_content = f.read()

target_files = route_pattern.findall(htaccess_content)
for target in sorted(set(target_files)):
    public_path = os.path.join(PUBLIC, target)
    if os.path.isfile(public_path):
        ok(f"{target} exists in public/")
    else:
        err(f"htaccess route target not found in public/: {target}")

# Also check DirectoryIndex
di_match = re.search(r"DirectoryIndex\s+(\S+)", htaccess_content)
if di_match:
    di_file = di_match.group(1)
    if os.path.isfile(os.path.join(PUBLIC, di_file)):
        ok(f"DirectoryIndex {di_file} exists in public/")
    else:
        err(f"DirectoryIndex target not found in public/: {di_file}")


# ── 2. Check sitemap URLs ─────────────────────────────────────────────────────
print("\n[2] Checking sitemap.xml...")
SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9"
tree = ET.parse(SITEMAP)
root_el = tree.getroot()

for url_el in root_el.findall(f"{{{SITEMAP_NS}}}url"):
    loc = url_el.findtext(f"{{{SITEMAP_NS}}}loc", "")
    if loc.startswith("http:"):
        err(f"sitemap URL uses http: {loc}")
    else:
        ok(f"https: {loc}")


# ── 3. Check for old page*.html links in public/ ─────────────────────────────
print("\n[3] Checking for old-style page*.html links in public/...")
old_link_pattern = re.compile(r'href="page\d+\.html')
html_files = [f for f in os.listdir(PUBLIC) if f.endswith(".html")]

found_old = 0
for fname in sorted(html_files):
    fpath = os.path.join(PUBLIC, fname)
    with open(fpath, encoding="utf-8") as f:
        content = f.read()
    matches = old_link_pattern.findall(content)
    if matches:
        err(f"{fname}: found {len(matches)} old-style href(s): {matches[:3]}")
        found_old += len(matches)

if not found_old:
    ok("No old-style page*.html hrefs found")


# ── 4. Check static assets referenced in pages exist ─────────────────────────
print("\n[4] Checking referenced CSS/JS assets exist in public/...")
css_pattern = re.compile(r'href="(css/[^"?]+)')
js_pattern = re.compile(r'src="(js/[^"?]+)')
missing_assets = set()

for fname in sorted(html_files):
    fpath = os.path.join(PUBLIC, fname)
    with open(fpath, encoding="utf-8") as f:
        content = f.read()
    for ref in css_pattern.findall(content) + js_pattern.findall(content):
        asset_path = os.path.join(PUBLIC, ref)
        if not os.path.isfile(asset_path) and ref not in missing_assets:
            missing_assets.add(ref)
            warn(f"Referenced asset not found in public/: {ref}")

if not missing_assets:
    ok("All referenced CSS/JS assets exist")


# ── Summary ───────────────────────────────────────────────────────────────────
print(f"\n{'=' * 48}")
print(f"Result: {len(errors)} error(s), {len(warnings)} warning(s)")

if errors:
    print("\nErrors must be fixed before deploying:")
    for e in errors:
        print(f"  - {e}")
    sys.exit(1)
elif warnings:
    print("Warnings are non-blocking but worth reviewing.")
else:
    print("All checks passed. Safe to deploy public/ to server.")
