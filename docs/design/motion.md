# Motion — Clean Logic

Animation and transition policy. Values from `public/css/home.css`.

## Base transition

`--transition` = `0.2s ease-in-out`.

Used for: button background/color/border/transform, header shadow, generic hover states. Form fields use a slightly longer `0.22s ease` for border/shadow/background.

Keep durations in the `0.2s–0.3s` range. Avoid slow (>0.4s) transitions on interactive elements — they feel sluggish.

## Allowed animations

- **Hover feedback:** color/background change on buttons and links; gradient button lifts `translateY(-1px)` + `opacity 0.9`.
- **Focus rings:** form fields show a soft ring on focus.
- **Smooth scroll:** `html { scroll-behavior: smooth }` for anchor links.
- **Scroll reveal:** a subtle reveal-on-scroll exists (section 24 in `home.css`). Keep it subtle (fade/short translate), not flashy.
- **Header shadow on scroll:** appears when the page is scrolled.
- **Mobile menu open/close:** slide/fade.
- **Inline form badge:** fades in for validation hints.

## Forbidden animations (from anti-references)

See `anti-references/video-lessons.md`, rule 1.1.

- No decorative "fly-in from all directions" on every block.
- No "space"/parallax/cosmic effects.
- No animations added at the end "to look more expensive."
- No looping/auto-playing motion that distracts from the CTA.

Principle: animation must serve clarity or feedback. If it only decorates, remove it. This is a static, fast, conversion-focused site — not a showcase/festival site.

## Performance

85% of traffic is mobile, and the site already loads slowly (see `docs/marketing/metrics.md`). Motion must be cheap: prefer `transform` and `opacity` (GPU-friendly), avoid animating layout properties (width/height/top/left) on scroll.

## Rules

- One base duration/easing (`0.2s ease-in-out`) for interactive states.
- Every interactive element: visible hover + focus.
- Reveal-on-scroll stays subtle.
- No purely decorative motion.
