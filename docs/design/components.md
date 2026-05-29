# Components — Clean Logic

Reusable UI elements with values from `public/css/home.css`. Reuse these specs; do not reinvent per page (consistency principle).

## Buttons

Base `.btn`:

- Height: `60px`.
- Padding: `0 28px`.
- Font: `19px`, weight `500`, line-height `1`.
- Border: `2px solid transparent`.
- Radius: `--radius-sm` (5px).
- Transition: background, color, border, transform (`0.2s ease-in-out`).
- `white-space: nowrap`, inline-flex centered.

Variants:

| Variant | Background | Text | Border | Notes |
|---|---|---|---|---|
| `--primary` | `--color-brand` | white | brand | hover → `--color-brand-d` |
| `--ghost` | transparent | white | white | hover → `rgba(255,255,255,0.12)`; for dark/photo backgrounds |
| `--gradient` | `--grad-btn` | white | none | font 20px; hover → `opacity 0.9` + `translateY(-1px)`; main CTA |
| `--dark` | `--color-dark` | white | dark | font 18px; hover → `#333` |

The **gradient button is the primary conversion CTA**. Use it for the single most important action on a screen (one CTA per block — see `do-and-dont.md`).

## Form fields (`fast-form`)

Input / textarea:

- Padding: `15px 16px` (right padding larger, `76px`, when a badge/icon sits inside).
- Font: `16px`, line-height `1.45`.
- Background: `#f3f4f6` (light gray).
- Border: `1px solid rgba(0,0,0,0.06)`.
- Radius: `12px`.
- Textarea min-height: `~104px`, resizable vertically.

States:

- **Focused** (`.is-focused`): background `#fff`, border `rgba(0,104,173,0.35)`, ring `0 0 0 3px rgba(0,104,173,0.12)`.
- **Invalid** (`.is-invalid`): background `#faf5f5`, border `rgba(200,80,90,0.35)`, ring `0 0 0 2px rgba(200,80,90,0.08)`.
- Placeholder color: `rgba(85,85,85,0.72)`.

Every field must have a visible focus state and an invalid state. Forms must give feedback (anti-reference: "interface gives no feedback").

### Badge inside field

Optional `.fast-form__badge`: pill (`999px`), font `12px/800`, green success palette (`#0b6b3a` on `#dff7e8→#c4edd4` gradient), hidden by default, fades in. Used for inline validation/confirmation hints.

## Cards

- Radius: `12px` (or `--radius` 8px for smaller blocks).
- Shadow: `--shadow-card` (`0 0 15px rgba(0,0,0,0.08)`).
- Background: white or light-blue bg tokens.

Service/specialized cards share one structure: icon (brand palette, one style) + title + short text. Differentiate the recommended option with color/border, not by making everything different.

## Header

- Sticky, height `80px`, white background, `z-index: 200`.
- On scroll (`--scrolled`): adds shadow `0 2px 12px rgba(0,0,0,0.1)`.
- Inner: flex, space-between, `gap: 20px`.
- Contains: logo, nav (3 items), contacts/phone, socials, burger (mobile).

## Hero

- `min-height: 660px`, `height: 100vh`.
- Background image with dark overlay gradient (`rgba(0,0,0,0.4)→0.2`) for text legibility — this overlay is an allowed functional use of gradient.
- Content: max 1200px, padding `100px 20px 40px`, `gap: 31px`, left-aligned.
- Title 55/700 white, subtitle 24/500 white.

Note: `home.css` currently sets `background-attachment: fixed` on the hero/section backgrounds — this is why screenshots show the background only at the top (see `screenshots/README.md`). Real behavior: background stays fixed while content scrolls.

## Rules

- Reuse these components verbatim across pages.
- One button system, one form-field system, one card system.
- Any interactive element needs hover + focus states.
