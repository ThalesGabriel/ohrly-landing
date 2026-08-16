-- Ohrly Signal Controller v0.2
-- Shadow production validation: discovery -> FDR -> frozen challengers ->
-- confirmation -> Holm -> independent verification -> manual pilot eligible.
-- IMPORTANT: defaults are deliberately passive. Nothing is sent to Meta.

create extension if not exists pgcrypto;

-- =========================================================
-- 1) GLOBAL CONTROLLER CONFIG
-- =========================================================
create table if not exists public.qualification_controller_config (
  id smallint primary key default 1 check (id = 1),
  enabled boolean not null default true,
  mode text not null default 'shadow' check (mode in ('shadow','manual_pilot','auto')),
  auto_promote boolean not null default false,
  send_qualified_visit_to_meta boolean not null default false,
  public_evidence_enabled boolean not null default false,
  target_event text not null default 'form_start',
  shadow_started_at timestamptz null,
  discovery_scope jsonb not null default '{"utm_source":"meta","page_path":"/"}'::jsonb,
  confirmation_scope jsonb not null default '{"utm_source":"meta","utm_campaign":"ohrly_intercom_engaged10_v1","page_path":"/"}'::jsonb,

  discovery_lookback_days integer not null default 30 check (discovery_lookback_days between 7 and 180),
  supply_window_hours integer not null default 72 check (supply_window_hours between 24 and 336),
  outcome_maturation_hours integer not null default 48 check (outcome_maturation_hours between 12 and 336),
  max_challengers integer not null default 5 check (max_challengers between 1 and 10),

  min_discovery_candidate_sessions integer not null default 30 check (min_discovery_candidate_sessions >= 10),
  min_discovery_target_positives integer not null default 10 check (min_discovery_target_positives >= 3),
  discovery_fdr_alpha numeric(8,6) not null default 0.05 check (discovery_fdr_alpha > 0 and discovery_fdr_alpha <= 0.25),

  min_confirmation_sessions integer not null default 200 check (min_confirmation_sessions >= 50),
  min_confirmation_target_positives integer not null default 10 check (min_confirmation_target_positives >= 3),
  confirmation_familywise_alpha numeric(8,6) not null default 0.05 check (confirmation_familywise_alpha > 0 and confirmation_familywise_alpha <= 0.25),

  min_verification_sessions integer not null default 200 check (min_verification_sessions >= 50),
  min_verification_target_positives integer not null default 10 check (min_verification_target_positives >= 3),
  verification_required boolean not null default true,

  min_lift numeric(10,4) not null default 1.50 check (min_lift >= 1),
  promotion_margin numeric(10,4) not null default 0.15 check (promotion_margin >= 0),
  min_candidate_supply_rate numeric(10,6) not null default 0.03 check (min_candidate_supply_rate > 0 and min_candidate_supply_rate < 1),
  min_weekly_meta_supply integer not null default 30 check (min_weekly_meta_supply >= 1),
  target_weekly_meta_supply integer not null default 50 check (target_weekly_meta_supply >= min_weekly_meta_supply),

  starvation_grace_hours integer not null default 12 check (starvation_grace_hours >= 1),
  starvation_min_sessions integer not null default 100 check (starvation_min_sessions >= 20),
  starvation_min_events integer not null default 5 check (starvation_min_events >= 1),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.qualification_controller_config (id)
values (1)
on conflict (id) do update set
  mode = 'shadow',
  auto_promote = false,
  send_qualified_visit_to_meta = false,
  outcome_maturation_hours = greatest(public.qualification_controller_config.outcome_maturation_hours, 48),
  min_discovery_target_positives = greatest(public.qualification_controller_config.min_discovery_target_positives, 10),
  min_confirmation_target_positives = greatest(public.qualification_controller_config.min_confirmation_target_positives, 10),
  min_verification_target_positives = greatest(public.qualification_controller_config.min_verification_target_positives, 10),
  updated_at = now();

-- =========================================================
-- 2) PRE-SPECIFIED CANDIDATE FAMILY
-- =========================================================
create table if not exists public.qualification_candidates (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  family text not null default 'behavioral',
  rules jsonb not null,
  priority integer not null default 100,
  eligible_from timestamptz null,
  is_enabled boolean not null default true,
  fallback_allowed boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (jsonb_typeof(rules) = 'object')
);

-- 1s/3s/5s were introduced later than 10s in the current Ohrly tracker.
-- eligible_from prevents treating historical absence as behavioral failure.
insert into public.qualification_candidates
  (key, label, family, rules, priority, eligible_from, fallback_allowed)
values
  ('engaged_1s', 'Engaged 1s', 'time', '{"all":["lp_engaged_1s"]}'::jsonb, 10, '2026-08-15 00:00:00+00', true),
  ('engaged_3s', 'Engaged 3s', 'time', '{"all":["lp_engaged_3s"]}'::jsonb, 20, '2026-08-15 00:00:00+00', true),
  ('engaged_5s', 'Engaged 5s', 'time', '{"all":["lp_engaged_5s"]}'::jsonb, 30, '2026-08-15 00:00:00+00', true),
  ('engaged_10s', 'Engaged 10s', 'time', '{"all":["lp_engaged_10s"]}'::jsonb, 40, null, true),
  ('scroll_25', 'Scroll 25%', 'depth', '{"all":["scroll_25"]}'::jsonb, 50, null, true),
  ('scroll_50', 'Scroll 50%', 'depth', '{"all":["scroll_50"]}'::jsonb, 60, null, true),
  ('engaged5_scroll25', 'Engaged 5s + Scroll 25%', 'combined', '{"all":["lp_engaged_5s","scroll_25"]}'::jsonb, 70, '2026-08-15 00:00:00+00', true),
  ('engaged10_scroll25', 'Engaged 10s + Scroll 25%', 'combined', '{"all":["lp_engaged_10s","scroll_25"]}'::jsonb, 80, null, true),
  ('engaged10_scroll50', 'Engaged 10s + Scroll 50%', 'combined', '{"all":["lp_engaged_10s","scroll_50"]}'::jsonb, 90, null, false),
  ('cta_click', 'CTA click', 'intent', '{"all":["cta_click"]}'::jsonb, 100, null, false),
  ('form_view', 'Form view', 'intent', '{"all":["form_view"]}'::jsonb, 110, '2026-08-15 00:00:00+00', false),
  ('engaged10_cta', 'Engaged 10s + CTA', 'intent', '{"all":["lp_engaged_10s","cta_click"]}'::jsonb, 120, null, false),
  ('engaged10_formview', 'Engaged 10s + Form view', 'intent', '{"all":["lp_engaged_10s","form_view"]}'::jsonb, 130, '2026-08-15 00:00:00+00', false),
  ('demo_start', 'Demo start', 'demo', '{"all":["demo_start"]}'::jsonb, 140, '2026-08-15 00:00:00+00', false),
  ('engaged10_demo', 'Engaged 10s + Demo start', 'demo', '{"all":["lp_engaged_10s","demo_start"]}'::jsonb, 150, '2026-08-15 00:00:00+00', false)
on conflict (key) do update set
  label = excluded.label,
  family = excluded.family,
  rules = excluded.rules,
  priority = excluded.priority,
  eligible_from = coalesce(public.qualification_candidates.eligible_from, excluded.eligible_from),
  fallback_allowed = excluded.fallback_allowed,
  updated_at = now();

-- =========================================================
-- 3) STABLE EVENT POLICY USED ONLY IN MANUAL/AUTO PILOT
-- =========================================================
create table if not exists public.qualification_policies (
  id uuid primary key default gen_random_uuid(),
  version text not null unique,
  status text not null default 'draft' check (status in ('draft','active','retired')),
  event_name text not null default 'QualifiedVisit',
  target_event text not null default 'form_start',
  source_candidate_id uuid null references public.qualification_candidates(id),
  rules jsonb not null,
  scope jsonb not null default '{"utm_source":"meta","page_path":"/"}'::jsonb,
  activation_reason text null,
  activated_at timestamptz not null default now(),
  optimization_started_at timestamptz null,
  retired_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (jsonb_typeof(rules) = 'object'),
  check (jsonb_typeof(scope) = 'object')
);

create unique index if not exists qualification_one_active_policy_idx
  on public.qualification_policies ((status)) where status = 'active';

insert into public.qualification_policies
  (version,status,event_name,target_event,source_candidate_id,rules,scope,activation_reason,activated_at)
select
  'qv_engaged10_seed_v02', 'active', 'QualifiedVisit', 'form_start', c.id, c.rules,
  '{"utm_source":"meta","page_path":"/"}'::jsonb,
  'shadow_seed_only_not_emitted', now()
from public.qualification_candidates c
where c.key = 'engaged_10s'
  and not exists (select 1 from public.qualification_policies where status = 'active')
limit 1;

-- =========================================================
-- 4) SESSION FEATURE LEDGER
-- =========================================================
create table if not exists public.qualification_session_features (
  session_id uuid primary key,
  visitor_id uuid null,
  first_seen timestamptz not null,
  last_seen timestamptz not null,
  landing_variant text null,
  entry_page_path text null,
  utm_source text null,
  utm_medium text null,
  utm_campaign text null,
  utm_content text null,
  utm_term text null,
  utm_placement text null,
  marketing_consent_seen boolean not null default false,
  lp_view boolean not null default false,
  lp_engaged_1s boolean not null default false,
  lp_engaged_3s boolean not null default false,
  lp_engaged_5s boolean not null default false,
  lp_engaged_10s boolean not null default false,
  scroll_25 boolean not null default false,
  scroll_50 boolean not null default false,
  scroll_75 boolean not null default false,
  scroll_90 boolean not null default false,
  cta_click boolean not null default false,
  demo_start boolean not null default false,
  demo_step_2 boolean not null default false,
  demo_step_3 boolean not null default false,
  demo_step_5 boolean not null default false,
  form_view boolean not null default false,
  form_start boolean not null default false,
  form_submit boolean not null default false,
  last_event_name text null,
  updated_at timestamptz not null default now()
);

create index if not exists qualification_features_first_seen_idx on public.qualification_session_features (first_seen desc);
create index if not exists qualification_features_campaign_idx on public.qualification_session_features (utm_campaign, first_seen desc);
create index if not exists qualification_features_source_idx on public.qualification_session_features (utm_source, first_seen desc);
create index if not exists qualification_features_form_start_idx on public.qualification_session_features (form_start, first_seen desc);

create or replace function public.sync_qualification_session_features()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  marketing_seen boolean;
  placement text;
begin
  marketing_seen := coalesce(new.properties ->> 'marketing_consent', 'false') = 'true';
  placement := nullif(new.properties ->> 'utm_placement', '');

  insert into public.qualification_session_features (
    session_id, visitor_id, first_seen, last_seen, landing_variant, entry_page_path,
    utm_source, utm_medium, utm_campaign, utm_content, utm_term, utm_placement,
    marketing_consent_seen,
    lp_view, lp_engaged_1s, lp_engaged_3s, lp_engaged_5s, lp_engaged_10s,
    scroll_25, scroll_50, scroll_75, scroll_90, cta_click,
    demo_start, demo_step_2, demo_step_3, demo_step_5,
    form_view, form_start, form_submit, last_event_name, updated_at
  ) values (
    new.session_id, new.visitor_id, new.occurred_at, new.occurred_at,
    new.landing_variant, new.page_path,
    new.utm_source, new.utm_medium, new.utm_campaign, new.utm_content, new.utm_term,
    placement, marketing_seen,
    new.event_name = 'lp_view',
    new.event_name = 'lp_engaged_1s',
    new.event_name = 'lp_engaged_3s',
    new.event_name = 'lp_engaged_5s',
    new.event_name = 'lp_engaged_10s',
    new.event_name = 'scroll_25',
    new.event_name = 'scroll_50',
    new.event_name = 'scroll_75',
    new.event_name = 'scroll_90',
    new.event_name = 'cta_click',
    new.event_name = 'demo_start',
    new.event_name = 'demo_step_2',
    new.event_name = 'demo_step_3',
    new.event_name = 'demo_step_5',
    new.event_name = 'form_view',
    new.event_name = 'form_start',
    new.event_name = 'form_submit',
    new.event_name, now()
  )
  on conflict (session_id) do update set
    visitor_id = coalesce(public.qualification_session_features.visitor_id, excluded.visitor_id),
    first_seen = least(public.qualification_session_features.first_seen, excluded.first_seen),
    last_seen = greatest(public.qualification_session_features.last_seen, excluded.last_seen),
    landing_variant = coalesce(public.qualification_session_features.landing_variant, excluded.landing_variant),
    entry_page_path = coalesce(public.qualification_session_features.entry_page_path, excluded.entry_page_path),
    utm_source = coalesce(public.qualification_session_features.utm_source, excluded.utm_source),
    utm_medium = coalesce(public.qualification_session_features.utm_medium, excluded.utm_medium),
    utm_campaign = coalesce(public.qualification_session_features.utm_campaign, excluded.utm_campaign),
    utm_content = coalesce(public.qualification_session_features.utm_content, excluded.utm_content),
    utm_term = coalesce(public.qualification_session_features.utm_term, excluded.utm_term),
    utm_placement = coalesce(public.qualification_session_features.utm_placement, excluded.utm_placement),
    marketing_consent_seen = public.qualification_session_features.marketing_consent_seen or excluded.marketing_consent_seen,
    lp_view = public.qualification_session_features.lp_view or excluded.lp_view,
    lp_engaged_1s = public.qualification_session_features.lp_engaged_1s or excluded.lp_engaged_1s,
    lp_engaged_3s = public.qualification_session_features.lp_engaged_3s or excluded.lp_engaged_3s,
    lp_engaged_5s = public.qualification_session_features.lp_engaged_5s or excluded.lp_engaged_5s,
    lp_engaged_10s = public.qualification_session_features.lp_engaged_10s or excluded.lp_engaged_10s,
    scroll_25 = public.qualification_session_features.scroll_25 or excluded.scroll_25,
    scroll_50 = public.qualification_session_features.scroll_50 or excluded.scroll_50,
    scroll_75 = public.qualification_session_features.scroll_75 or excluded.scroll_75,
    scroll_90 = public.qualification_session_features.scroll_90 or excluded.scroll_90,
    cta_click = public.qualification_session_features.cta_click or excluded.cta_click,
    demo_start = public.qualification_session_features.demo_start or excluded.demo_start,
    demo_step_2 = public.qualification_session_features.demo_step_2 or excluded.demo_step_2,
    demo_step_3 = public.qualification_session_features.demo_step_3 or excluded.demo_step_3,
    demo_step_5 = public.qualification_session_features.demo_step_5 or excluded.demo_step_5,
    form_view = public.qualification_session_features.form_view or excluded.form_view,
    form_start = public.qualification_session_features.form_start or excluded.form_start,
    form_submit = public.qualification_session_features.form_submit or excluded.form_submit,
    last_event_name = excluded.last_event_name,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists analytics_events_sync_qualification_features on public.analytics_events;
create trigger analytics_events_sync_qualification_features
after insert on public.analytics_events
for each row execute function public.sync_qualification_session_features();

-- =========================================================
-- 5) SHADOW EPOCHS + FROZEN CHALLENGERS
-- =========================================================
create table if not exists public.qualification_epochs (
  id uuid primary key default gen_random_uuid(),
  version text not null unique,
  state text not null default 'discovery' check (state in (
    'discovery','collecting_confirmation','maturating','evaluating',
    'insufficient_evidence','signal_starvation','shadow_recommended',
    'verifying','manual_pilot_eligible','manual_pilot','validated','rejected'
  )),
  champion_candidate_id uuid null references public.qualification_candidates(id),
  target_event text not null default 'form_start',
  discovery_scope jsonb not null default '{"utm_source":"meta","page_path":"/"}'::jsonb,
  scope jsonb not null default '{"utm_source":"meta","utm_campaign":"ohrly_intercom_engaged10_v1","page_path":"/"}'::jsonb,
  discovery_started_at timestamptz not null,
  discovery_ended_at timestamptz not null,
  confirmation_started_at timestamptz not null,
  recommendation_id uuid null,
  verification_started_at timestamptz null,
  closed_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (jsonb_typeof(discovery_scope) = 'object'),
  check (jsonb_typeof(scope) = 'object')
);

create unique index if not exists qualification_one_open_epoch_idx
  on public.qualification_epochs ((closed_at is null)) where closed_at is null;
create index if not exists qualification_epochs_created_idx on public.qualification_epochs (created_at desc);

create table if not exists public.qualification_epoch_candidates (
  id uuid primary key default gen_random_uuid(),
  epoch_id uuid not null references public.qualification_epochs(id) on delete cascade,
  candidate_id uuid not null references public.qualification_candidates(id),
  rank integer not null,

  discovery_sessions integer not null,
  discovery_positives integer not null,
  discovery_rate numeric(12,8) not null,
  discovery_lift numeric(12,6) not null,
  discovery_p_value numeric(18,16) not null,
  discovery_q_value numeric(18,16) not null,
  discovery_supply_rate numeric(12,8) not null,
  discovery_snapshot jsonb not null default '{}'::jsonb,

  confirmation_sessions integer null,
  confirmation_positives integer null,
  confirmation_rate numeric(12,8) null,
  confirmation_lift numeric(12,6) null,
  confirmation_p_value numeric(18,16) null,
  confirmation_adjusted_p_value numeric(18,16) null,
  confirmation_supply_rate numeric(12,8) null,
  confirmation_projected_weekly_meta_supply numeric(12,4) null,
  confirmation_status text not null default 'pending' check (
    confirmation_status in ('pending','needs_more_positives','signal_starvation','failed','passed')
  ),
  confirmation_snapshot jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (epoch_id, candidate_id),
  unique (epoch_id, rank)
);

create index if not exists qualification_epoch_candidates_epoch_idx
  on public.qualification_epoch_candidates (epoch_id, rank);

-- =========================================================
-- 6) SHADOW RECOMMENDATIONS + INDEPENDENT VERIFICATION
-- =========================================================
create table if not exists public.qualification_recommendations (
  id uuid primary key default gen_random_uuid(),
  epoch_id uuid not null references public.qualification_epochs(id) on delete cascade,
  candidate_id uuid not null references public.qualification_candidates(id),
  status text not null default 'shadow_recommended' check (
    status in ('shadow_recommended','verifying','verified','rejected','pilot_started','validated')
  ),
  recommended_at timestamptz not null default now(),
  verification_started_at timestamptz null,
  verified_at timestamptz null,
  expected_lift numeric(12,6) null,
  expected_supply_rate numeric(12,8) null,
  expected_weekly_meta_supply numeric(12,4) null,
  confirmation_snapshot jsonb not null default '{}'::jsonb,
  verification_sessions integer null,
  verification_positives integer null,
  verification_rate numeric(12,8) null,
  verification_lift numeric(12,6) null,
  verification_p_value numeric(18,16) null,
  verification_projected_weekly_meta_supply numeric(12,4) null,
  verification_snapshot jsonb not null default '{}'::jsonb,
  reason text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists qualification_recommendations_epoch_idx
  on public.qualification_recommendations (epoch_id, recommended_at desc);

-- =========================================================
-- 7) DAILY EVALUATION SNAPSHOTS
-- =========================================================
create table if not exists public.qualification_evaluations (
  id bigint generated always as identity primary key,
  epoch_id uuid null references public.qualification_epochs(id) on delete cascade,
  evaluated_at timestamptz not null default now(),
  state text not null,
  reason text not null,
  metrics jsonb not null default '{}'::jsonb,
  decision jsonb not null default '{}'::jsonb
);

create index if not exists qualification_evaluations_epoch_time_idx
  on public.qualification_evaluations (epoch_id, evaluated_at desc);

-- =========================================================
-- 8) FUTURE MANUAL PILOT EMISSIONS (INERT IN SHADOW MODE)
-- =========================================================
create table if not exists public.qualified_visits (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  visitor_id uuid null,
  policy_id uuid not null references public.qualification_policies(id),
  policy_version text not null,
  event_name text not null default 'QualifiedVisit',
  qualified_at timestamptz not null default now(),
  score numeric(8,4) not null default 1,
  matched_signals jsonb not null default '[]'::jsonb,
  target_event text not null default 'form_start',
  landing_variant text null,
  page_path text null,
  utm_source text null,
  utm_medium text null,
  utm_campaign text null,
  utm_content text null,
  utm_term text null,
  utm_placement text null,
  marketing_consent boolean not null default false,
  meta_event_id uuid not null,
  meta_capi_delivered boolean not null default false,
  meta_capi_delivered_at timestamptz null,
  meta_capi_status integer null,
  meta_capi_response jsonb null,
  created_at timestamptz not null default now(),
  unique (session_id, policy_id),
  unique (meta_event_id)
);

create index if not exists qualified_visits_policy_time_idx on public.qualified_visits (policy_id, qualified_at desc);
create index if not exists qualified_visits_meta_delivery_idx on public.qualified_visits (meta_capi_delivered, qualified_at desc);

-- =========================================================
-- 9) MANUAL PILOT ACTIVATION FUNCTION
-- Only call after shadow verification says manual_pilot_eligible.
-- =========================================================
create or replace function public.activate_verified_qualification_recommendation(
  p_recommendation_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  rec public.qualification_recommendations%rowtype;
  candidate public.qualification_candidates%rowtype;
  current_policy public.qualification_policies%rowtype;
  new_policy public.qualification_policies%rowtype;
  new_version text;
begin
  perform pg_advisory_xact_lock(hashtext('ohrly_qualification_manual_pilot'));

  select * into rec
  from public.qualification_recommendations
  where id = p_recommendation_id and status = 'verified'
  for update;

  if rec.id is null then
    raise exception 'recommendation must exist and be verified';
  end if;

  select * into candidate from public.qualification_candidates where id = rec.candidate_id;
  if candidate.id is null then raise exception 'candidate not found'; end if;

  select * into current_policy
  from public.qualification_policies
  where status = 'active'
  order by activated_at desc
  limit 1
  for update;

  if current_policy.id is not null then
    update public.qualification_policies
    set status = 'retired', retired_at = now(), updated_at = now()
    where id = current_policy.id;
  end if;

  new_version := 'qv_' || candidate.key || '_' || to_char(clock_timestamp(), 'YYYYMMDD_HH24MISS');

  insert into public.qualification_policies (
    version,status,event_name,target_event,source_candidate_id,rules,scope,
    activation_reason,activated_at,optimization_started_at
  ) values (
    new_version,'active','QualifiedVisit','form_start',candidate.id,candidate.rules,
    '{"utm_source":"meta","page_path":"/"}'::jsonb,
    'verified_shadow_recommendation',now(),now()
  ) returning * into new_policy;

  update public.qualification_recommendations
  set status = 'pilot_started', updated_at = now()
  where id = rec.id;

  update public.qualification_epochs
  set state = 'manual_pilot', updated_at = now()
  where id = rec.epoch_id;

  update public.qualification_controller_config
  set mode = 'manual_pilot', send_qualified_visit_to_meta = true,
      auto_promote = false, updated_at = now()
  where id = 1;

  return jsonb_build_object(
    'policy_id', new_policy.id,
    'policy_version', new_policy.version,
    'candidate_key', candidate.key,
    'optimization_started_at', new_policy.optimization_started_at
  );
end;
$$;

-- =========================================================
-- 10) HISTORICAL BACKFILL
-- =========================================================
create or replace function public.backfill_qualification_features_from_table(p_table regclass)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  sql text;
begin
  sql := format($fmt$
    insert into public.qualification_session_features (
      session_id, visitor_id, first_seen, last_seen, landing_variant, entry_page_path,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term, utm_placement,
      marketing_consent_seen,
      lp_view, lp_engaged_1s, lp_engaged_3s, lp_engaged_5s, lp_engaged_10s,
      scroll_25, scroll_50, scroll_75, scroll_90, cta_click,
      demo_start, demo_step_2, demo_step_3, demo_step_5,
      form_view, form_start, form_submit, last_event_name, updated_at
    )
    select
      session_id,
      max(visitor_id::text)::uuid,
      min(occurred_at),
      max(occurred_at),
      max(landing_variant),
      (array_agg(page_path order by occurred_at asc))[1],
      max(utm_source), max(utm_medium), max(utm_campaign), max(utm_content), max(utm_term),
      max(nullif(properties ->> 'utm_placement', '')),
      bool_or(coalesce(properties ->> 'marketing_consent', 'false') = 'true'),
      bool_or(event_name = 'lp_view'),
      bool_or(event_name = 'lp_engaged_1s'),
      bool_or(event_name = 'lp_engaged_3s'),
      bool_or(event_name = 'lp_engaged_5s'),
      bool_or(event_name = 'lp_engaged_10s'),
      bool_or(event_name = 'scroll_25'),
      bool_or(event_name = 'scroll_50'),
      bool_or(event_name = 'scroll_75'),
      bool_or(event_name = 'scroll_90'),
      bool_or(event_name = 'cta_click'),
      bool_or(event_name = 'demo_start'),
      bool_or(event_name = 'demo_step_2'),
      bool_or(event_name = 'demo_step_3'),
      bool_or(event_name = 'demo_step_5'),
      bool_or(event_name = 'form_view'),
      bool_or(event_name = 'form_start'),
      bool_or(event_name = 'form_submit'),
      (array_agg(event_name order by occurred_at desc))[1],
      now()
    from %s
    where session_id is not null
    group by session_id
    on conflict (session_id) do update set
      visitor_id = coalesce(public.qualification_session_features.visitor_id, excluded.visitor_id),
      first_seen = least(public.qualification_session_features.first_seen, excluded.first_seen),
      last_seen = greatest(public.qualification_session_features.last_seen, excluded.last_seen),
      landing_variant = coalesce(public.qualification_session_features.landing_variant, excluded.landing_variant),
      entry_page_path = coalesce(public.qualification_session_features.entry_page_path, excluded.entry_page_path),
      utm_source = coalesce(public.qualification_session_features.utm_source, excluded.utm_source),
      utm_medium = coalesce(public.qualification_session_features.utm_medium, excluded.utm_medium),
      utm_campaign = coalesce(public.qualification_session_features.utm_campaign, excluded.utm_campaign),
      utm_content = coalesce(public.qualification_session_features.utm_content, excluded.utm_content),
      utm_term = coalesce(public.qualification_session_features.utm_term, excluded.utm_term),
      utm_placement = coalesce(public.qualification_session_features.utm_placement, excluded.utm_placement),
      marketing_consent_seen = public.qualification_session_features.marketing_consent_seen or excluded.marketing_consent_seen,
      lp_view = public.qualification_session_features.lp_view or excluded.lp_view,
      lp_engaged_1s = public.qualification_session_features.lp_engaged_1s or excluded.lp_engaged_1s,
      lp_engaged_3s = public.qualification_session_features.lp_engaged_3s or excluded.lp_engaged_3s,
      lp_engaged_5s = public.qualification_session_features.lp_engaged_5s or excluded.lp_engaged_5s,
      lp_engaged_10s = public.qualification_session_features.lp_engaged_10s or excluded.lp_engaged_10s,
      scroll_25 = public.qualification_session_features.scroll_25 or excluded.scroll_25,
      scroll_50 = public.qualification_session_features.scroll_50 or excluded.scroll_50,
      scroll_75 = public.qualification_session_features.scroll_75 or excluded.scroll_75,
      scroll_90 = public.qualification_session_features.scroll_90 or excluded.scroll_90,
      cta_click = public.qualification_session_features.cta_click or excluded.cta_click,
      demo_start = public.qualification_session_features.demo_start or excluded.demo_start,
      demo_step_2 = public.qualification_session_features.demo_step_2 or excluded.demo_step_2,
      demo_step_3 = public.qualification_session_features.demo_step_3 or excluded.demo_step_3,
      demo_step_5 = public.qualification_session_features.demo_step_5 or excluded.demo_step_5,
      form_view = public.qualification_session_features.form_view or excluded.form_view,
      form_start = public.qualification_session_features.form_start or excluded.form_start,
      form_submit = public.qualification_session_features.form_submit or excluded.form_submit,
      updated_at = now()
  $fmt$, p_table);

  execute sql;
end;
$$;

select public.backfill_qualification_features_from_table('public.analytics_events'::regclass);

do $$
begin
  if to_regclass('public.analytics_events_old') is not null then
    perform public.backfill_qualification_features_from_table('public.analytics_events_old'::regclass);
  end if;
end;
$$;

-- =========================================================
-- 11) RLS: SERVER/SERVICE-ROLE ONLY
-- =========================================================
alter table public.qualification_controller_config enable row level security;
alter table public.qualification_candidates enable row level security;
alter table public.qualification_policies enable row level security;
alter table public.qualification_session_features enable row level security;
alter table public.qualification_epochs enable row level security;
alter table public.qualification_epoch_candidates enable row level security;
alter table public.qualification_recommendations enable row level security;
alter table public.qualification_evaluations enable row level security;
alter table public.qualified_visits enable row level security;

-- No anon/authenticated policies are intentionally created.
-- Supabase service-role bypasses RLS from Next server routes.


-- Harden SECURITY DEFINER helpers against direct anon/authenticated RPC calls.
revoke all on function public.activate_verified_qualification_recommendation(uuid) from public, anon, authenticated;
grant execute on function public.activate_verified_qualification_recommendation(uuid) to service_role;

revoke all on function public.backfill_qualification_features_from_table(regclass) from public, anon, authenticated;
grant execute on function public.backfill_qualification_features_from_table(regclass) to service_role;


-- Explicit table privileges: server/service-role only.
revoke all on table public.qualification_controller_config from anon, authenticated;
revoke all on table public.qualification_candidates from anon, authenticated;
revoke all on table public.qualification_policies from anon, authenticated;
revoke all on table public.qualification_session_features from anon, authenticated;
revoke all on table public.qualification_epochs from anon, authenticated;
revoke all on table public.qualification_epoch_candidates from anon, authenticated;
revoke all on table public.qualification_recommendations from anon, authenticated;
revoke all on table public.qualification_evaluations from anon, authenticated;
revoke all on table public.qualified_visits from anon, authenticated;

grant select, insert, update, delete on table public.qualification_controller_config to service_role;
grant select, insert, update, delete on table public.qualification_candidates to service_role;
grant select, insert, update, delete on table public.qualification_policies to service_role;
grant select, insert, update, delete on table public.qualification_session_features to service_role;
grant select, insert, update, delete on table public.qualification_epochs to service_role;
grant select, insert, update, delete on table public.qualification_epoch_candidates to service_role;
grant select, insert, update, delete on table public.qualification_recommendations to service_role;
grant select, insert, update, delete on table public.qualification_evaluations to service_role;
grant select, insert, update, delete on table public.qualified_visits to service_role;
grant usage, select on sequence public.qualification_evaluations_id_seq to service_role;
