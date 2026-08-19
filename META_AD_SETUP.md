# Meta Ads — Setup V1

Estrutura inicial:
```text
1 campanha
1 conjunto
3 criativos
1 LP
1 oferta
```

Criativos:
```text
decision_expensive_v1
problem_before_solution_v1
case_digital_v1
```

URL:
```text
https://ohrly.com.br/investigue?utm_source=meta&utm_medium=paid_social&utm_campaign=ohrly_decision_v1&utm_content=decision_expensive_v1
```

## Pixel + CAPI
O kit envia:
- `PageView` no Pixel quando marketing é autorizado
- `Lead` no browser depois do submit
- `Lead` pela CAPI com o mesmo `event_id`

O objetivo é permitir deduplicação browser/server.

## Downstream
`/api/campaign/lead-stage` pode enviar eventos quando:
- `stage=oqp`
- `stage=sprint_paid`

Os nomes desses eventos são configuráveis:
```env
META_QUALIFIED_EVENT_NAME=
META_SPRINT_PAID_EVENT_NAME=
```

Não congele esses nomes antes de confirmar no Events Manager/CRM a estratégia de otimização.

## Checklist
- testar no Events Manager
- validar Pixel ID
- validar Dataset ID / access token
- definir Graph API version atual
- usar `META_TEST_EVENT_CODE` apenas no teste
- verificar deduplicação do `Lead`

