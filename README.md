# Clean Logic — Migration Project

This repository contains the in-progress migration of the **cleanlogic.by** cleaning-services website from the Tilda Publishing platform to a custom Astro-based codebase.

## Project status

**Phase 0:** Documentation foundation. The site itself is not yet migrated — the live site still runs on Tilda at https://cleanlogic.by.

See [docs/MIGRATION_PLAN.md](docs/MIGRATION_PLAN.md) for the full phased plan.

## Why this exists

The Tilda User Agreement forbids using exported Tilda code outside the Tilda platform. To gain full ownership, freedom to scale (customer accounts, AI-assisted calculator, manager chat), and the ability to potentially sell the site to another cleaning company, the site is being rewritten from scratch on a clean, copyright-free stack.

## Tech stack

- **Astro** — static site generator, SSR-ready for future phases.
- **Vanilla JavaScript + plain CSS** — no client-side framework runtime by default.
- **Node.js LTS** — toolchain.
- **Git** — local version control (no GitHub on phase 1).

See [docs/TECH_STACK.md](docs/TECH_STACK.md) for rationale.

## Repository layout

```text
.cursor/       Cursor IDE configuration (rules and subagents)
docs/          Project documentation (RU/EN mix; see docs/README.md)
public/        Current site snapshot (Tilda-derived, being phased out)
tilda_export/  Original Tilda export archive (read-only reference)
serve.py       Legacy local server (will be replaced by `npm run dev`)
```

## Where to start

1. Read [docs/README.md](docs/README.md) for the documentation map.
2. Read [docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md) for business and legal context.
3. Read [docs/MIGRATION_PLAN.md](docs/MIGRATION_PLAN.md) for the phased migration plan.
4. Read [docs/glossary.md](docs/glossary.md) if any term is unfamiliar.

## Licensing

This repository contains custom source code authored for Clean Logic. All third-party dependencies use permissive licenses (MIT, Apache 2.0, BSD, ISC, MPL 2.0, OFL). No GPL/AGPL or proprietary licensed code is included.

Original Tilda export files in `tilda_export/` are retained only as a read-only reference during migration. They are not redistributed and will be removed when the migration completes.
