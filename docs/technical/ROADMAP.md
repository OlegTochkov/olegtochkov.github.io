# Roadmap — Post-Migration Features

Features explicitly **out of scope** for the Tilda-to-Astro migration but planned for after phase 9. Each item gets its own plan and timeline when it becomes active work.

## R1. Cost calculator conversion boost

**Problem:** Visitors enter the calculator, see the price, and leave. Conversion is low.

**Hypothesis:** Adding contextual value statements as users select options improves perceived worth.

**Two implementation tiers:**

- **Tier 1 (low cost):** Static, pre-written messages keyed by option combinations. Example: "С генеральной уборкой вы получаете чистоту в шкафах, на люстрах, за мебелью." Shown progressively as the user makes choices.
- **Tier 2 (LLM-powered):** Real-time generation by a small LLM (cheaper model class) that produces a tailored value statement based on selected options.

**Dependencies:**

- Phase 6 form handling complete.
- Phase 8 staging URL exists for A/B testing.

## R2. Calculator state restore

**Problem:** Return visitors who did not finish the calculator lose their input. They start over and often abandon.

**Solution:** Store calculator state in `localStorage`. On return visit, detect saved state and show a small CTA: "Продолжить с того места, где остановились?" — restores all inputs.

**Privacy:** No data leaves the browser. Belarus personal-data law not triggered since storage is local-only.

## R3. Photo-based price estimate

**Problem:** Calculator is abstract. Customers want to know if a specific real room fits a price.

**Two implementation tiers:**

- **Tier 1 (manual):** Customer uploads photo. Photo plus contact go to manager via Telegram. Manager replies with a quote within roughly 5 minutes.
- **Tier 2 (AI-assisted):** Customer uploads photo. A vision-capable model produces an initial estimate. Customer leaves contact. Manager confirms in 5 minutes.

**Dependencies:**

- R2 (state restore patterns).
- A backend with file storage (small object storage).
- Vendor selection for the vision model (license, cost, latency).

## R4. Manager chat widget

**Problem:** Some customers prefer chat over filling forms.

**Two implementation tiers:**

- **Tier 1:** Third-party widget (Crisp, Tawk.to, Jivo) with free tier. Check licenses and terms for compliance with Belarus personal-data law and the project's "no proprietary" rule.
- **Tier 2:** Custom widget connecting directly to a Telegram channel via Bot API. Full control, no third-party data sharing.

## R5. Customer accounts

**Problem:** Returning customers should not re-enter the same info every time.

**Required for:** R6, R7.

**Features:**

- Sign up and log in by phone (SMS verification).
- Order history.
- Saved calculator presets.
- One-click reorder.

**Compliance:**

- Belarus personal-data law: explicit consent at sign-up, encrypted phone storage, account deletion path.
- Privacy policy updated with concrete data-handling description.

**Stack impact:**

- Astro switches from SSG to SSR or hybrid.
- Backend with database (Postgres or SQLite).
- SMS gateway provider for OTP.

## R6. Recurring cleaning subscriptions

**Idea:** Weekly, biweekly, or monthly cleaning auto-orders. Customer sets the schedule once; manager confirms each occurrence.

**Dependencies:** R5.

## R7. Loyalty and referral

**Idea:** Discount codes, referral bonuses, returning-customer pricing.

**Dependencies:** R5.

## R8. Service area map

**Idea:** Interactive map showing the 50 km service zone around Minsk. Customer enters an address; system confirms whether it is covered.

**Stack:** OpenStreetMap plus Leaflet (both permissively licensed).

**Dependencies:** none — can ship independently of other roadmap items.

## R9. Multilingual content

**Not planned.** Site stays Russian-only.

## R10. Mobile app

**Not planned.** Adaptive web is sufficient.

## Selling the site

Throughout all roadmap work, keep the project sellable:

- Document each new feature in `docs/`.
- Avoid hard-coding Maxim-specific contact info; use config files.
- Keep all third-party licenses recorded.

When a sale becomes likely, prepare a clean handover packet: documentation index, environment setup steps, deployment runbook, list of credentials needed (in a separate secure document).

## See also

- [../business/BUSINESS_GOALS.md](../business/BUSINESS_GOALS.md) — drivers for these features.
- [TECH_STACK.md](TECH_STACK.md) — current stack constraints.
- [MIGRATION_PLAN.md](MIGRATION_PLAN.md) — the migration that must finish before any roadmap item.
