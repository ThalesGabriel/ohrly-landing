# Signal Controller v0.2 — implementation notes

Applied to the uploaded project:

- passive shadow mode by default;
- 48h outcome maturation;
- pre-specified candidate family with instrumentation eligibility dates;
- historical discovery using Meta traffic from `/`;
- BH/FDR multiple-testing guard in discovery;
- maximum 5 frozen challengers per epoch;
- prospective confirmation restricted by default to `ohrly_intercom_engaged10_v1`;
- Holm family-wise correction in confirmation;
- minimum 10 target positives;
- minimum lift + promotion margin versus Engaged10 champion;
- projected Meta supply using marketing-consented sessions;
- signal-starvation rejection for under-supplied challengers;
- independent second verification window;
- `manual_pilot_eligible` gate;
- no `QualifiedVisit` emission to Meta in shadow mode;
- future manual-pilot Pixel/CAPI path with stable `QualifiedVisit` event and matching event IDs;
- internal epoch/status/reconcile/pilot APIs;
- daily reconcile cron;
- optional public live-evidence component, disabled by default;
- RLS and service-role-only database access for controller tables;
- fix for Engaged10 Meta consent guard;
- final demo CTA preserves UTMs.

Validation performed in this environment:

- all 35 TS/TSX files transpiled through TypeScript with 0 syntax diagnostics;
- BH/Holm/enrichment statistical helpers sanity-tested with known examples;
- full Next build could not be executed because the environment could not resolve `registry.npmjs.org` (`EAI_AGAIN`) while installing dependencies.

The remote Supabase migration was not executed because no Supabase connection credentials are available in this runtime. The migration is included under `supabase/migrations/` and `sql/`.
