# Typography — Clean Logic

All values extracted from `public/css/home.css`. This is the live system, formalized.

## Font family

- **Current (in `home.css`):** `'TildaSans', Arial, sans-serif` via `--font-main`.
- **Target after migration:** `Onest` (Google Fonts, OFL license), self-hosted in `public/fonts/`.

`TildaSans` is Tilda-licensed and must be removed during migration. `Onest` is the chosen replacement — a geometric grotesque visually close to TildaSans. The fallback stack stays `Arial, sans-serif`.

Do not change the font in `home.css` now — that is migration work (Phase 2), not documentation work.

## Base

- Base font size: `16px`.
- Base line-height: `1.55`.
- Base text color: `--color-text` (`#222222`).

## Type scale

Sizes actually used in the codebase, grouped by role. Use these; do not invent new sizes.

| Role | Size | Weight | Line-height | Notes |
|---|---|---|---|---|
| Hero title | 55px | 700 | 1.2 | `letter-spacing: 1px`, white on hero |
| Hero subtitle | 24px | 500 | 1.5 | |
| Hero promo | 22px | 400 | — | |
| Section title | 36px | 700 | 1.3 | `.section-title` |
| Large headings | 40 / 44 / 48px | 700–800 | — | hero-adjacent / emphasis |
| Sub-headings | 28 / 30 / 32 / 34px | 600–700 | — | |
| Card / block titles | 22 / 24 / 26px | 600–700 | — | |
| Body large | 18 / 19 / 20px | 400–500 | ~1.5 | |
| Body | 16 / 17px | 400–500 | 1.55 | default |
| Small / captions | 13 / 14 / 15px | 400–500 | — | |
| Micro (badges, labels) | 11 / 12px | 700–800 | 1 | uppercase-ish accents |

## Weights

Available weights in use: `400`, `500`, `600`, `700`, `800`. When migrating to Onest, load these weights (Onest provides them).

- 400 — secondary text, promo lines.
- 500 — body emphasis, buttons, subtitles.
- 600 — sub-headings.
- 700 — section and hero titles (dominant heading weight).
- 800 — strong emphasis, badges.

## Responsive behavior

Font sizes step down at mobile breakpoints (see `spacing-grid.md` for the breakpoint list). The reference scale above is desktop. On mobile, hero/section titles shrink — match the existing `home.css` media-query reductions rather than inventing new mobile sizes.

Reminder from anti-references: do not use oversized desktop text (e.g. body at 36px). The current `home.css` scale is already correctly sized — use it as the ceiling, not a starting point to inflate.

## Rules

- One type scale for the whole site. A heading at one level must be the same size everywhere.
- Do not introduce sizes outside the documented scale without updating this file.
- Pair size with a consistent weight per role (e.g. section titles are always 36/700).
