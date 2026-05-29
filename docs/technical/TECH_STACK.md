# Tech Stack — Clean Logic

## Chosen stack

- **Astro** (latest stable, 5.x) — static site generator with optional SSR for future phases.
- **TypeScript** — for type safety on components and configuration. Optional for content-heavy pages.
- **Plain CSS** — no Tailwind, no CSS-in-JS, no preprocessors. Goal: readable, simple, portable.
- **Vanilla JavaScript** — for interactive widgets (calculator, mobile menu, forms). No client-side framework on phase 1.
- **Node.js LTS** — toolchain runtime (currently v22 LTS).
- **Git** — local version control. GitHub is not connected on phase 1.

## Why Astro

The user is a non-developer building a static-leaning site that needs to grow into a dynamic app over time. Astro fits because:

1. **Output is plain HTML/CSS/JS.** No client-side framework runtime by default. SEO and performance are identical to hand-written HTML.
2. **Component model.** Shared layouts (header, footer) live in one file instead of being copy-pasted across 20 HTML pages.
3. **Growth path.** When personal accounts and AI features arrive, Astro switches to SSR mode without rewriting the frontend.
4. **Low learning curve.** Astro syntax is essentially HTML with a small templating layer. Approachable for a marketer learning to code.
5. **License.** Astro is MIT, which satisfies project constraints.

Alternatives considered and rejected:

- **Plain HTML/CSS/JS** — viable, but creates copy-paste hell across 20 pages and offers no growth path.
- **Next.js / Nuxt** — overkill for phase 1. Suitable later if SSR needs grow large.
- **11ty (Eleventy)** — similar to Astro, but smaller ecosystem and less newbie-friendly tooling.

## Project directory layout (planned for phase 1)

```text
cleanlogic.by/
  src/
    components/        Reusable .astro components (Header, Footer, etc.)
    layouts/           Base page layouts
    pages/             Each .astro file becomes a route (index.astro -> /)
    styles/            Global CSS, design tokens
    scripts/           Vanilla JS for interactive features
  public/              Static assets served as-is (images, robots.txt, sitemap.xml, favicons)
  docs/                Project documentation
  tilda_export/        Read-only reference (removed eventually, after phase 9)
  astro.config.mjs     Astro configuration
  package.json         Dependencies
  tsconfig.json        TypeScript configuration
  .gitignore
  README.md
```

The existing root-level `public/` directory will be **replaced** by Astro's own `public/` once migration starts. Until then it stays as a working Tilda-derived snapshot for reference.

## Fonts

- **TildaSans** (Tilda-licensed) — removed.
- **Onest** (Google Fonts, OFL license) — replacement. Visually close to TildaSans: similar geometric grotesque feel.

Onest is self-hosted (not loaded from Google's CDN) to avoid third-party requests and to keep the project portable. Font files live in `public/fonts/` once migration begins.

## Analytics

- **Google Tag Manager** (container `AW-17974152760`) — preserved as-is.
- **Yandex.Metrica** — preserved as-is.

Both are external services unrelated to Tilda. Their snippets are loaded in the base layout.

## Form handling

Forms on the original Tilda site posted to Tilda's own form endpoint. In the new stack:

- A serverless function or simple Node endpoint receives the form POST.
- It validates the input.
- It sends the lead to a **Telegram bot** that delivers to the manager's chat.

The Telegram bot is created during phase 6. Details TBD then.

## Image handling

- Image filenames (e.g., `tild6638-...png`) are renamed to human-readable names (e.g., `logo.png`, `hero-bg.jpg`).
- File contents are preserved — no recompression, no regeneration.
- Astro's built-in image optimization may be applied to new images later. Existing images stay as-is during phase 1.

## Hosting (deferred to phase 8)

Hosting decision is deferred. Likely candidates:

- **Vercel** — free tier, auto-deploy on git push once GitHub is connected.
- **Netlify** — equivalent to Vercel.
- **Custom Apache/Nginx** — mirrors current Tilda setup via `.htaccess`.

DNS switch from Tilda to the new host happens only after staging passes full QA.

## What we do NOT use

- Build tools other than what Astro provides (no extra Webpack, no Vite plugins beyond Astro defaults).
- CSS frameworks (Tailwind, Bootstrap, etc.).
- UI component libraries (Material UI, Chakra, etc.).
- JavaScript frameworks (React, Vue, Svelte) on phase 1. May reconsider for specific widgets in later phases.
- Tilda's own scripts, fonts, classes, image hashes (covered by `.cursor/rules/tilda-migration.mdc`).

## Dependency checklist

Every new dependency must satisfy:

- License is MIT, Apache 2.0, BSD, ISC, MPL 2.0, OFL (fonts), CC0, or CC-BY (with attribution).
- Maintenance status: actively maintained or stable enough that abandonment risk is low.
- Bundle-size impact is measured. Heavy dependencies require explicit justification.

If a candidate dependency fails the checklist, propose an alternative or a custom implementation.

## See also

- [MIGRATION_PLAN.md](MIGRATION_PLAN.md) — phased migration plan.
- [ROADMAP.md](ROADMAP.md) — post-migration features.
- `.cursor/rules/tilda-migration.mdc` — Tilda residue removal rules.
