# Ohrly — LP Intercom-first (Next.js + TypeScript + Tailwind)

Landing compacta de aquisição com:

- Next.js 16 App Router + TypeScript;
- Tailwind CSS v4;
- sinais comportamentais na tabela **existente** `analytics_events`;
- leads na tabela **existente** `decision_leads`;
- Meta Pixel no browser + Conversions API no servidor;
- deduplicação do `Lead` pelo mesmo `eventID/event_id`;
- Formspree acionado pelo Route Handler do formulário;
- UTM / fbclid / IDs de campanha, conjunto e anúncio;
- consentimento separado para analytics e marketing;
- `_fbp` / `_fbc` somente quando marketing foi aceito;
- chaves secretas somente no servidor.

## 1. Importante: não criei uma nova migration para o funil

Esta versão foi ajustada para o schema real já existente no projeto.

### `analytics_events`

Usa os campos existentes:

- `occurred_at`
- `event_name`
- `visitor_id`
- `session_id`
- `page_path`
- `landing_variant`
- `utm_source / medium / campaign / content / term`
- `referrer_host`
- `properties`

### `decision_leads`

O formulário preenche os campos obrigatórios já existentes (`session_id`, `name`, `company`, `email`, `decision`, `context`, `question`, `decision_type`) e também reaproveita:

- `landing_variant`
- `source_url`
- `attribution`
- `analytics_consent`
- `marketing_consent`
- `consent_version`
- `meta_lead_event_id`
- `meta_fbp`
- `meta_fbc`
- `metadata`

Isso mantém o `stage = new` e não interfere no fluxo já existente de `lead_stage_events`.

## 2. Instalação

```bash
npm install
npm run dev
```

Depois:

```bash
npm run build
```

## 3. Env

Copie `.env.example` para `.env.local`.

O env enviado já cobre Supabase e Meta. Falta somente o ID do formulário Formspree:

```env
FORMSPREE_FORM_ID=
```

Use apenas o hash/id, por exemplo `xabcdefg`.

`SUPABASE_SECRET_KEY` é usado preferencialmente e `SUPABASE_SERVICE_ROLE_KEY` funciona como fallback legado.

## 4. Eventos comportamentais preservando a taxonomia atual

Depois que analytics é aceito:

- `lp_view`
- `lp_engaged_10s`
- `section_view`
- `form_view`
- `form_start`
- `form_field_started`
- `cta_click`
- `scroll_25`
- `scroll_50`
- `scroll_75`
- `scroll_90`
- `form_submit_attempt`
- `form_submit`
- `form_submit_error`

Todos entram em `analytics_events` via `POST /api/analytics`.

## 5. Fluxo do formulário

```text
browser
  ↓ POST /api/lead
Supabase decision_leads
  ↓
  ├─ analytics_events: form_submit (se analytics aceito)
  ├─ Meta CAPI: Lead (se marketing aceito)
  └─ Formspree: envio operacional

browser, após sucesso
  └─ Meta Pixel: Lead com o MESMO eventID (se marketing aceito)
```

O mesmo UUID vira:

- `decision_leads.meta_lead_event_id`
- `metadata.client_event_id`
- Meta Pixel `eventID`
- Meta CAPI `event_id`

## 6. Consentimento

A implementação usa `ohrly_consent_v1` no `localStorage`:

- **Somente necessários:** sem analytics e sem Meta;
- **Aceitar medição:** `analytics_events`, sem Meta;
- **Aceitar todos:** Supabase + Meta.

Identificadores persistentes (`visitor_id` / `session_id`) só são criados no navegador depois do aceite de analytics. Sem esse aceite, o submit ainda funciona e usa IDs efêmeros apenas para correlacionar a requisição do lead.

O Formspree continua recebendo a submissão operacional do formulário. O `Lead` da Meta só é enviado quando marketing foi aceito.

## 7. Atribuição

A LP captura:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `fbclid`
- `meta_campaign_id` / `campaign_id`
- `meta_adset_id` / `adset_id`
- `meta_ad_id` / `ad_id`
- `referrer_host`
- `device_type` (em `properties`/`attribution`)

## 8. Landing variant

O código respeita o env atual:

```env
NEXT_PUBLIC_OHRLY_LANDING_VARIANT=decision_lp_v1
```

Porém, para não misturar esta campanha com a LP antiga de decisão, recomendo usar um novo valor no deploy, por exemplo:

```env
NEXT_PUBLIC_OHRLY_LANDING_VARIANT=intercom_behavior_lp_v1
```

Nenhuma query precisa mudar: `landing_variant` continua sendo gravado no mesmo campo; o novo valor apenas separa o experimento.

## 9. Meta

O standard event do formulário é `Lead`.

`META_QUALIFIED_EVENT_NAME` e `META_SPRINT_PAID_EVENT_NAME` permanecem no env, mas não são disparados no submit desta LP; eles continuam adequados para fases posteriores do funil.
