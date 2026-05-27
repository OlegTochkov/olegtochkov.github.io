#!/usr/bin/env python3
"""
Build script for cleanlogic.by.

Usage:
  python3 build.py           — build to public/
  python3 build.py --watch   — not implemented yet; run a simple server instead

Requirements:
  pip install jinja2 pillow  (or: .venv/bin/pip install jinja2 pillow)

What it does:
  1. Reads site config from src/_data/site.json
  2. Reads page definitions from src/_data/pages.json
  3. For each page, reads body HTML from files/page<ID>body.html
  4. Renders the base layout template (src/_includes/layouts/base.html)
  5. Writes output to public/page<ID>.html
  6. Copies static assets (css/, js/, images/, files/) into public/
  7. Copies root files (robots.txt, sitemap.xml, 404.html, htaccess → .htaccess)

After build:
  Deploy the contents of public/ to your web server.
"""

import json
import os
import shutil
import sys
from jinja2 import Environment, FileSystemLoader
from PIL import Image

BASE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(BASE, "src")
INCLUDES = os.path.join(SRC, "_includes")
DATA = os.path.join(SRC, "_data")
FILES = os.path.join(BASE, "files")
OUT = os.path.join(BASE, "public")
IMAGES = os.path.join(BASE, "images")

STATIC_DIRS = ["css", "js", "images", "files"]
STATIC_FILES = [
    ("robots.txt", "robots.txt"),
    ("sitemap.xml", "sitemap.xml"),
    ("404.html", "404.html"),
    ("htaccess", ".htaccess"),
]

GALLERY_SOURCE_DIR = os.path.join(BASE, "work")
GALLERY_OUTPUT_DIR = os.path.join(IMAGES, "work-gallery")
GALLERY_TARGET_WIDTHS = [800, 1600]
GALLERY_MAX_HEIGHT = 2000


def load_json(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def build_gallery_assets():
    if not os.path.isdir(GALLERY_SOURCE_DIR):
        print("  skip gallery assets: work/ folder not found")
        return

    if os.path.exists(GALLERY_OUTPUT_DIR):
        shutil.rmtree(GALLERY_OUTPUT_DIR)
    os.makedirs(GALLERY_OUTPUT_DIR, exist_ok=True)

    for index in range(1, 10):
        src_path = os.path.join(GALLERY_SOURCE_DIR, f"{index}.png")
        if not os.path.isfile(src_path):
            print(f"  skip gallery image: work/{index}.png not found")
            continue

        with Image.open(src_path) as source_image:
            source_width, source_height = source_image.size
            variants = sorted(set(w for w in GALLERY_TARGET_WIDTHS if w < source_width) | {source_width})
            has_alpha = "A" in source_image.getbands()

            for width in variants:
                resized = source_image.copy()
                resized.thumbnail((width, GALLERY_MAX_HEIGHT), Image.Resampling.LANCZOS)
                actual_width = resized.size[0]
                if actual_width == 0:
                    continue

                base_name = os.path.join(GALLERY_OUTPUT_DIR, f"{index}-{actual_width}")
                web_ready = resized.convert("RGBA" if has_alpha else "RGB")
                web_ready.save(base_name + ".webp", format="WEBP", quality=84, method=6)
                web_ready.save(base_name + ".png", format="PNG", optimize=True)

            print(f"  generated gallery variants for work/{index}.png ({source_width}x{source_height})")


def copy_static():
    for dirname in STATIC_DIRS:
        src_path = os.path.join(BASE, dirname)
        dst_path = os.path.join(OUT, dirname)
        if os.path.isdir(src_path):
            if os.path.exists(dst_path):
                shutil.rmtree(dst_path)
            shutil.copytree(src_path, dst_path)
            print(f"  copied: {dirname}/")

    for src_name, dst_name in STATIC_FILES:
        src_path = os.path.join(BASE, src_name)
        dst_path = os.path.join(OUT, dst_name)
        if os.path.isfile(src_path):
            shutil.copy2(src_path, dst_path)
            print(f"  copied: {src_name} → {dst_name}")


def build():
    os.makedirs(OUT, exist_ok=True)

    site = load_json(os.path.join(DATA, "site.json"))
    pages = load_json(os.path.join(DATA, "pages.json"))

    env = Environment(
        loader=FileSystemLoader(INCLUDES),
        autoescape=False,
        keep_trailing_newline=True,
    )

    built = 0
    errors = 0

    print(f"\nBuilding {len(pages)} pages...")
    for page in pages:
        page_id = page["pageId"]
        body_file = os.path.join(FILES, f"page{page_id}body.html")

        if not os.path.isfile(body_file):
            print(f"  SKIP (body not found): page{page_id}body.html")
            errors += 1
            continue

        with open(body_file, encoding="utf-8") as f:
            body_content = f.read()

        layout_name = page.get("layout", "layouts/base.html")
        page_template = env.get_template(layout_name)

        html = page_template.render(
            site=site,
            body_content=body_content,
            **page,
        )

        out_path = os.path.join(OUT, page["outputFile"])
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html)

        print(f"  built:  {page['outputFile']}")
        built += 1

    print(f"\nGenerating gallery image assets...")
    build_gallery_assets()

    print(f"\nCopying static assets...")
    copy_static()

    print(f"\n{'=' * 40}")
    print(f"Done: {built} pages built, {errors} skipped.")
    print(f"Output: {OUT}")
    if errors:
        sys.exit(1)


if __name__ == "__main__":
    build()
