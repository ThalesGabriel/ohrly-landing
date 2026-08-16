# Ohrly Signal Controller v0.2 — Shadow Production Validation

## Estado inicial esperado

A v0.2 entra deliberadamente passiva:

- `mode = shadow`
- `auto_promote = false`
- `send_qualified_visit_to_meta = false`
- `public_evidence_enabled = false`
- target = `form_start`
- outcome maturation = 48h
- discovery = histórico Meta anterior ao início da epoch
- até 5 challengers congelados após BH/FDR
- confirmação futura = somente `ohrly_intercom_engaged10_v1`, com Holm
- segunda janela independente de verificação

A campanha `ohrly_intercom_engaged10_v1` continua otimizada por `Engaged10`. O Signal Controller não altera a Meta durante o shadow.

## 1. Aplicar a migration

No Supabase SQL Editor, execute:

`supabase/migrations/20260816144500_signal_controller_v02.sql`

A migration:

1. cria config/candidates/policies;
2. cria o ledger `qualification_session_features`;
3. cria trigger em `analytics_events`;
4. cria epochs, frozen challengers, recommendations e evaluations;
5. cria `qualified_visits` para o futuro manual pilot;
6. faz backfill de `analytics_events` e, se existir, `analytics_events_old`;
7. deixa todo envio de `QualifiedVisit` para Meta desligado.

Depois rode `sql/qualification_engine_checks_v02.sql`.

## 2. Variáveis de ambiente

Adicionar no Vercel:

```bash
QUALIFICATION_INTERNAL_API_KEY=<segredo-longo>
CRON_SECRET=<outro-segredo-longo>
META_QUALIFIED_VISIT_EVENT_NAME=QualifiedVisit
NEXT_PUBLIC_META_QUALIFIED_VISIT_EVENT_NAME=QualifiedVisit
NEXT_PUBLIC_OHRLY_SIGNAL_EVIDENCE_ENABLED=false
```

As variáveis Meta existentes continuam iguais.

## 3. Deploy

Faça build e deploy normalmente.

O `vercel.json` agenda `/api/qualification/reconcile` uma vez por dia.

## 4. Marcar T0 e iniciar a primeira epoch

Somente depois do deploy, chame:

```bash
curl -X POST 'https://www.ohrly.com.br/api/qualification/epoch/start' \
  -H 'x-ohrly-internal-key: SEU_SEGREDO'
```

Esse instante vira simultaneamente:

- `discovery_ended_at`
- `confirmation_started_at`
- `shadow_started_at`

O discovery usa o histórico Meta da home (`utm_source=meta`, `page_path=/`). A confirmação prospectiva fica restrita à campanha atual `ohrly_intercom_engaged10_v1`. Isso permite descobrir padrões com volume histórico e exigir que eles generalizem no wedge atual antes de qualquer recomendação.

O endpoint aplica BH/FDR no discovery e congela no máximo 5 challengers. Eles não são recalculados durante a epoch.

## 5. Conferir estado

```bash
curl 'https://www.ohrly.com.br/api/qualification/status' \
  -H 'x-ohrly-internal-key: SEU_SEGREDO'
```

Durante os primeiros dias, estados esperados:

- `collecting_confirmation`
- `maturating`
- `insufficient_evidence`

Não é erro permanecer nesses estados. O target `FormStart` é raro e a v0.2 exige evidência suficiente.

## 6. Reconcile manual opcional

```bash
curl -X POST 'https://www.ohrly.com.br/api/qualification/reconcile' \
  -H 'x-ohrly-internal-key: SEU_SEGREDO'
```

O reconcile diário faz:

1. espera 48h antes de tratar uma sessão sem outcome como negativa;
2. avalia somente challengers congelados no discovery;
3. aplica Holm na família de confirmação;
4. exige >=10 positivos por challenger;
5. compara contra o champion `Engaged10`;
6. verifica supply projetado para Meta;
7. se houver vencedor, abre uma segunda janela independente de verificação;
8. não toca na campanha.

## 7. Gate de segurança principal

Durante shadow:

```sql
select mode, auto_promote, send_qualified_visit_to_meta
from qualification_controller_config
where id = 1;
```

Precisa retornar:

```text
shadow | false | false
```

E:

```sql
select count(*) from qualified_visits;
```

Deve continuar `0` durante todo o shadow.

## 8. Quando aparece `manual_pilot_eligible`

Não há promoção automática.

O controller só chega nesse estado depois de:

- discovery com BH/FDR;
- confirmation independente com Holm;
- >=10 outcomes na confirmação;
- lift mínimo;
- supply mínimo;
- segunda janela independente de verificação;
- >=10 outcomes também na verificação.

Nesse momento revisamos a recomendação antes de mudar a Meta.

## 9. Manual closed-loop pilot — NÃO executar agora

Quando decidirmos iniciar o piloto real:

```bash
curl -X POST 'https://www.ohrly.com.br/api/qualification/pilot/start' \
  -H 'Content-Type: application/json' \
  -H 'x-ohrly-internal-key: SEU_SEGREDO' \
  -d '{"recommendationId":"UUID_VERIFICADO"}'
```

Esse endpoint chama a função SQL `activate_verified_qualification_recommendation`, troca o modo para `manual_pilot`, ativa o evento estável `QualifiedVisit` e marca `optimization_started_at`.

Só devemos chegar aqui após revisar o primeiro resultado shadow.

## Observação sobre retorno em outra sessão

Nesta v0.2 o target primário é atribuído no nível da sessão (`form_start` da própria sessão). A janela de 48h evita classificar cedo demais, mas ainda não faz atribuição probabilística entre sessões diferentes do mesmo visitante. Isso deve ser tratado como evolução separada se o histórico produtivo mostrar que uma parcela relevante dos FormStarts ocorre em visitas posteriores.
