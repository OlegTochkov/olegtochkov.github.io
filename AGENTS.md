# AGENTS.md — Clean Logic

Navigation index for AI agents and humans. This file is read automatically by Cursor. Start here when unsure where to look.

## What this project is

Migration of the **cleanlogic.by** cleaning-services website (Minsk, Belarus) from the Tilda Publishing platform to a custom **Astro** codebase. Goal: remove Tilda copyright, gain freedom to scale, keep the UI 1:1. Currently in the documentation-foundation stage — the site itself is not migrated yet.

Full context: [docs/business/PROJECT_OVERVIEW.md](docs/business/PROJECT_OVERVIEW.md).

## Rules (in `.cursor/rules/`)

Always-on:

- `general.mdc` — language (Russian), chat titles in Russian, licensing (permissive only), code style, project context.
- `workflow.mdc` — UI 1:1 fidelity, report-don't-fix bugs, confirm destructive actions, language conventions.
- `tilda-migration.mdc` — zero Tilda traces, read-only `tilda_export/`, pre-deletion docs in `docs/legacy/`.
- `simplicity.mdc` — anti-complexity, explain complex actions, **goal-first Russian text before every terminal Run**, file header comments.

Context-triggered:

- `design.mdc` — triggers on UI/styling/visual work → read `docs/design/`.
- `copywriting.mdc` — triggers on copy/text work → read `docs/marketing/`.

## Documentation map (`docs/`)

| Need | Read |
|---|---|
| Business, legal, company context | `docs/business/PROJECT_OVERVIEW.md` |
| Goals by stage | `docs/business/BUSINESS_GOALS.md` |
| Stack and rationale | `docs/technical/TECH_STACK.md` |
| Migration phases | `docs/technical/MIGRATION_PLAN.md` |
| Future features | `docs/technical/ROADMAP.md` |
| Design system | `docs/design/` (start at `do-and-dont.md`) |
| Marketing, audience, tone | `docs/marketing/` |
| Removed Tilda scripts | `docs/legacy/` |
| Term definitions | `docs/glossary.md` |
| Full doc map | `docs/README.md` |

## Subagents (`.cursor/agents/`)

- `bug-hunter` — read-only QA. Scans for Tilda residue, broken refs, a11y, SEO issues. Reports only, never fixes.

## Commands (`.cursor/commands/`)

- `/summarize` — distills the current chat into a compact, paste-ready handoff text for a new chat.

## Hard constraints (non-negotiable)

- Permissive licenses only (MIT / Apache 2.0 / BSD / ISC / MPL 2.0 / OFL / CC0 / CC-BY). No GPL/AGPL/proprietary.
- Never modify `tilda_export/` (read-only reference).
- No "tilda" / "t-" / `tild...` hashes in new code.
- Preserve UI 1:1; report bugs, do not silently fix.
- Respond in Russian; chat titles and labels in Russian; explain new terms simply.
- Do not over-engineer; explain anything non-obvious before doing it.
