# Spacing & Grid — Clean Logic

All values extracted from `public/css/home.css`.

## Container

- Max width: `--container-max` = `1200px`.
- Horizontal padding: `0 20px` (via `.container`).
- Centered: `margin: 0 auto`.

All main content sits inside the 1200px container. Full-bleed backgrounds may extend wider, but their inner content aligns to the container.

## Header height

`--header-h` = `80px`. The header is sticky (`position: sticky; top: 0`).

## Spacing scale

Gaps and internal spacing cluster around an 8-based-ish scale. Common values in use:

`5, 6, 8, 10, 12, 14, 16, 20, 24, 31, 40px`

Recommended canonical scale to standardize toward:

`4, 8, 12, 16, 24, 32, 40, 64px`

When adding new spacing, pick from the canonical scale. Existing one-off values (31px hero gap, etc.) are tolerated but not extended.

### Grouping principle (from anti-references)

- Inner spacing inside a group: small (`X`).
- Between related elements: medium (`~2X`).
- Between distinct sections: large (`~4X`).

This makes semantic grouping readable. Do not use one uniform gap for everything.

## Section vertical padding

Sections use vertical padding in the `45–90px` range (desktop), most commonly `60px 0`. Pattern: `padding: <V>px 0` where V is one of `48, 50, 52, 58, 60, 70, 80, 90`.

Standardize toward `60px 0` for regular sections, `80–90px 0` for major sections. Reduce on mobile (handled in media queries).

## Border radius

| Token / value | Use |
|---|---|
| `--radius-sm` = `5px` | buttons |
| `--radius` = `8px` | general elements |
| `12px` | inputs, cards |
| `999px` | pills, badges |
| `50%` | circular elements (avatars, icon circles) |

Keep radii to this set. Do not introduce arbitrary values (the codebase has a few strays like 6px/9px/20px — do not propagate them).

## Breakpoints

Media queries present in `home.css`:

| Breakpoint | Target |
|---|---|
| `max-width: 1199px` | tablet-large |
| `max-width: 959px` | tablet |
| `max-width: 899px` (and `min-width: 768px`) | narrow tablet (special cases) |
| `max-width: 767px` | mobile landscape / small tablet |
| `max-width: 639px` | mobile-large |
| `max-width: 479px` | mobile |

Primary breakpoints to design against: **1199 / 959 / 639 / 479**. The 767/899 are used for specific component fixes.

Since 85% of traffic is mobile (see `docs/marketing/audience.md`), the mobile layout (≤479 and ≤639) is the priority, not an afterthought.

## Shadow

Single card shadow: `--shadow-card` = `0 0 15px rgba(0,0,0,0.08)`. Header-scrolled shadow: `0 2px 12px rgba(0,0,0,0.1)`.

## Rules

- One spacing system across the whole site (anti-reference: inconsistent spacing = visual chaos).
- One radius set, one shadow.
- Mobile-first priority.
