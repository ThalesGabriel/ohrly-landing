-- Ohrly Signal Controller v0.2 - post-migration checks

-- 1. Must be passive by default.
select id, enabled, mode, auto_promote, send_qualified_visit_to_meta,
       outcome_maturation_hours, max_challengers,
       min_discovery_target_positives, min_confirmation_target_positives,
       discovery_scope, confirmation_scope
from public.qualification_controller_config
where id = 1;

-- Expected: mode=shadow, auto_promote=false, send_qualified_visit_to_meta=false,
-- outcome_maturation_hours=48.

-- 2. Historical feature backfill.
select
  count(*) as sessions,
  min(first_seen) as first_session,
  max(first_seen) as last_session,
  count(*) filter (where utm_source = 'meta') as meta_sessions,
  count(*) filter (where form_start) as form_start_sessions
from public.qualification_session_features;

-- 3. Candidate family and instrumentation eligibility.
select key, family, priority, eligible_from, rules
from public.qualification_candidates
where is_enabled
order by priority;

-- 4. No epoch should exist until /api/qualification/epoch/start is called.
select *
from public.qualification_epochs
where closed_at is null
order by created_at desc;

-- 5. After starting the epoch, inspect frozen challengers.
select
  e.version,
  e.state,
  c.key,
  ec.rank,
  ec.discovery_sessions,
  ec.discovery_positives,
  ec.discovery_lift,
  ec.discovery_p_value,
  ec.discovery_q_value,
  ec.discovery_supply_rate,
  ec.confirmation_status
from public.qualification_epochs e
join public.qualification_epoch_candidates ec on ec.epoch_id = e.id
join public.qualification_candidates c on c.id = ec.candidate_id
where e.closed_at is null
order by ec.rank;

-- 6. Latest controller evaluation.
select evaluated_at, state, reason, metrics, decision
from public.qualification_evaluations
order by evaluated_at desc
limit 10;

-- 7. Shadow mode must not emit QualifiedVisit.
select count(*) as qualified_visits_emitted
from public.qualified_visits;
-- Expected during shadow: 0.

-- 8. Recommendations, when evidence becomes sufficient.
select
  r.recommended_at,
  c.key,
  r.status,
  r.expected_lift,
  r.expected_supply_rate,
  r.expected_weekly_meta_supply,
  r.verification_lift,
  r.verification_p_value,
  r.verification_projected_weekly_meta_supply
from public.qualification_recommendations r
join public.qualification_candidates c on c.id = r.candidate_id
order by r.recommended_at desc;
