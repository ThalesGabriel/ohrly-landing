# Ohrly Campaign Kit V1
Meta Ads → Landing Page → Supabase → OQP → Diagnostic → Sprint

Kit para projeto **Next.js + TypeScript + Tailwind (App Router)**.

## Inclui
- LP `/investigue`
- captura de UTMs, `fbclid` e IDs de Meta quando presentes
- `session_id` por sessão
- eventos de comportamento no Supabase
- consentimento separado para analytics e marketing
- formulário real de Decision Sprint
- Meta Pixel opcional
- Meta Conversions API opcional no `Lead`
- deduplicação browser/server por `event_id`
- endpoint interno de estágio comercial
- SQL de diagnóstico da LP e OQP
- protocolo congelado V1

## Dependência
No projeto existente:
```bash
npm install @supabase/supabase-js
```

## Banco
Execute:
```text
supabase/migrations/20260811_ohrly_campaign_v1.sql
```

As tabelas usam RLS e não ficam abertas ao browser. As escritas passam pelos Route Handlers do Next.js usando chave secreta do Supabase.

## Ambiente
Copie `.env.local.example` para `.env.local`.

Obrigatório:
```env
SUPABASE_URL=
SUPABASE_SECRET_KEY=
CAMPAIGN_INTERNAL_API_KEY=
```

Meta opcional:
```env
NEXT_PUBLIC_META_PIXEL_ID=
META_DATASET_ID=
META_ACCESS_TOKEN=
META_GRAPH_API_VERSION=
META_TEST_EVENT_CODE=
```

`META_GRAPH_API_VERSION` fica sem valor fixo: use a versão atual configurada no seu app Meta.

## URL de anúncio
Comece com UTMs explícitas por criativo:
```text
https://ohrly.com.br/investigue?utm_source=meta&utm_medium=paid_social&utm_campaign=ohrly_decision_v1&utm_content=decision_expensive_v1
```

Variações:
```text
utm_content=problem_before_solution_v1
utm_content=case_digital_v1
```

O tracker também reconhece:
```text
campaign_id / meta_campaign_id
adset_id / meta_adset_id
ad_id / meta_ad_id
```

## Eventos
```text
lp_view
engaged_10s
scroll_25
scroll_50
scroll_75
offer_view
cta_click
form_view
form_start
form_step
form_error
form_submit
thank_you_view
```

## Teste local
1. Abra `/investigue?utm_source=test&utm_campaign=local&utm_content=manual`
2. aceite analytics
3. role a página e clique em CTA
4. envie um lead de teste
5. confira no Supabase:
   - `campaign_sessions`
   - `campaign_events`
   - `campaign_leads`
   - `campaign_lead_stage_events`
6. execute `analytics/diagnostic_queries.sql`
7. se Meta estiver configurado, valide no Test Events

## OQP
Atualize o estágio pelo endpoint interno:
```bash
curl -X POST https://ohrly.com.br/api/campaign/lead-stage \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $CAMPAIGN_INTERNAL_API_KEY" \
  -d '{"lead_id":"UUID","stage":"oqp","note":"Decisão + impacto + dados + dono."}'
```

Script pronto: `scripts/update-lead-stage.sh`.

## Regra de debugging
```text
CTR ruim                         → anúncio
LP view → engaged ruim           → hero/alinhamento
engaged → scroll_50 ruim         → corpo/argumentação
offer_view → CTA ruim            → oferta/prova
CTA → form_start ruim            → transição para formulário
form_start → submit ruim         → formulário
submit → OQP ruim                → targeting/promessa
OQP → diagnostic ruim            → follow-up
diagnostic → proposal ruim       → scoping
proposal → paid ruim             → preço/confiança/valor
```

Não altere múltiplas camadas ao mesmo tempo.
