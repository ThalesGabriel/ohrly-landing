// app/diagnosticos/mocks/orderDeliveryDiagnostic.mock.ts

export const orderDeliveryDiagnosticMock = {
  flowId: "order_delivery_lifecycle",
  flowLabel: "Ciclo de Entrega",
  header: {
    title: "Diagnóstico de Saúde Operacional",
    subtitle:
      "Leitura comportamental do fluxo Ciclo de Entrega no período analisado.",
    generatedAt: "2026-05-21T14:55:16.319311Z",
    periodLabel: null,
    dataSource: "CSV order_delivery_lifecycle.csv",
    aggregationWindow: "Janelas de agregação diárias",
    contractVersion: "v3",
  },
  generalInterpretation: {
    question: "Como meu sistema se comportou?",
    answerTitle: "Perda de consistência operacional",
    answer:
      "O fluxo continuou funcionando, mas apresentou episódios sustentados de degradação comportamental. A leitura indica concentração em atraso de entrega e sinais de propagação para outras partes do fluxo.",
    operationalState: "CRITICAL_PROPAGATED_PRESSURE",
    operationalStateLabel: "Pressão crítica propagada",
    decisionReading:
      "Em termos práticos: esperar deixou de ser uma decisão neutra em vários períodos do histórico analisado.",
    confidenceLabel: "Alta confiança nos episódios prioritários",
    priorityEvidenceConfidenceScore: 100,
    globalHighConfidenceRatio: 44.07,
  },
  byPressureLevel: {
    CRITICAL_PRESSURE: 6,
    HIGH_PRESSURE: 13,
    MODERATE_PRESSURE: 40,
  },
  byMetric: {
    approval_time_minutes: 14,
    carrier_dispatch_time_hours: 13,
    carrier_to_customer_time_days: 8,
    delivery_delay_days: 17,
    total_delivery_time_days: 7,
  },
  summary: {
    totalEpisodes: 59,
    criticalEpisodes: 6,
    highPressureEpisodes: 13,
    propagatedEpisodes: 29,
    dominantMetricKey: "delivery_delay_days",
    dominantMetricLabel: "atraso de entrega",
    executiveSummary:
      "O fluxo Ciclo de Entrega apresentou 59 episódios de pressão de recuperação. 6 chegaram a pressão crítica e 13 a pressão alta. 29 episódios tiveram influência de propagação comportamental. A principal concentração ocorreu em atraso de entrega.",
  },
  decisionWindow: {
    episodeId: "6decbaeb-6aa0-494e-81d3-f996b33bc848",
    startedAt: "2018-01-02T00:00:00Z",
    endedAt: "2018-01-14T00:00:00Z",
    episodeDurationDays: 12,
    decisionWindowDays: 5,
    latePressureDays: 7,
    decisionWindowConsumedRatio: 58.33,
    status: "CONSUMED",
    statusLabel: "Janela consumida",
    calculationMode: "ESTIMATED_FROM_EPISODE_DURATION",
    interpretation:
      "O episódio mais relevante durou 12 dias. Nesta versão, a janela de decisão é estimada a partir da duração do episódio: 5 dias foram tratados como janela inicial de decisão, enquanto 7 dias ocorreram após essa janela. Isso sugere que parte relevante do episódio ocorreu quando esperar já não era neutro.",
  },
  analysisCoverage: {
    totalAnalyzedEvents: 99295,
    eventsInDegradedEpisodes: 15240,
    eventsInHighOrCriticalPressure: 12403,
    degradedExposureRatio: 15.35,
    highOrCriticalExposureRatio: 12.49,
    estimatedBusinessValueExposed: null,
    uniqueEntitiesImpacted: null,
    interpretation:
      "Foram analisadas 99295 execuções do fluxo. 15240 eventos passaram por episódios degradados e 12403 ocorreram em períodos de pressão alta ou crítica.",
  },
  mainEvidenceEpisode: {
    id: "6decbaeb-6aa0-494e-81d3-f996b33bc848",
    metricKey: "delivery_delay_days",
    metricLabel: "atraso de entrega",
    startedAt: "2018-01-02T00:00:00Z",
    endedAt: "2018-01-14T00:00:00Z",
    durationDays: 12,
    totalEventCount: 1252,
    rpiScore: 96.43,
    pressureLevel: "CRITICAL_PRESSURE",
    pressureLabel: "pressão crítica",
    confidenceLevel: "HIGH_CONFIDENCE",
    confidenceLabel: "alta confiança estatística",
    propagationScore: 82.14,
    propagated: true,
    context: {
      orderStatus: "delivered",
    },
    businessReading:
      "O atraso de entrega permaneceu em degradação sustentada por 12 dias, expondo 1252 eventos. A pressão de recuperação chegou a pressão crítica com alta confiança estatística. A leitura indica propagação comportamental, sugerindo que a degradação não ficou isolada em uma única parte do fluxo.",
  },
  highlightedEpisodes: [
    {
      id: "6decbaeb-6aa0-494e-81d3-f996b33bc848",
      metricKey: "delivery_delay_days",
      metricLabel: "atraso de entrega",
      startedAt: "2018-01-02T00:00:00Z",
      endedAt: "2018-01-14T00:00:00Z",
      durationDays: 12,
      totalEventCount: 1252,
      rpiScore: 96.43,
      pressureLevel: "CRITICAL_PRESSURE",
      pressureLabel: "pressão crítica",
      confidenceLevel: "HIGH_CONFIDENCE",
      confidenceLabel: "alta confiança estatística",
      propagationScore: 82.14,
      propagated: true,
      reading:
        "O atraso de entrega permaneceu em degradação sustentada por 12 dias, expondo 1252 eventos. A pressão de recuperação chegou a pressão crítica com alta confiança estatística. A leitura indica propagação comportamental, sugerindo que a degradação não ficou isolada em uma única parte do fluxo.",
    },
    {
      id: "9ed284b6-b9f8-4cc8-980c-d74f0dd7d719",
      metricKey: "delivery_delay_days",
      metricLabel: "atraso de entrega",
      startedAt: "2018-04-16T00:00:00Z",
      endedAt: "2018-04-22T00:00:00Z",
      durationDays: 6,
      totalEventCount: 1570,
      rpiScore: 95,
      pressureLevel: "CRITICAL_PRESSURE",
      pressureLabel: "pressão crítica",
      confidenceLevel: "HIGH_CONFIDENCE",
      confidenceLabel: "alta confiança estatística",
      propagationScore: 96.43,
      propagated: true,
      reading:
        "O atraso de entrega permaneceu em degradação sustentada por 6 dias, expondo 1570 eventos. A pressão de recuperação chegou a pressão crítica com alta confiança estatística. A leitura indica propagação comportamental, sugerindo que a degradação não ficou isolada em uma única parte do fluxo.",
    },
    {
      id: "53c2186f-78e0-4675-81f1-004377cd3489",
      metricKey: "carrier_dispatch_time_hours",
      metricLabel: "tempo entre aprovação e envio para transportadora",
      startedAt: "2016-10-04T00:00:00Z",
      endedAt: "2016-10-14T00:00:00Z",
      durationDays: 10,
      totalEventCount: 249,
      rpiScore: 90.35,
      pressureLevel: "CRITICAL_PRESSURE",
      pressureLabel: "pressão crítica",
      confidenceLevel: "HIGH_CONFIDENCE",
      confidenceLabel: "alta confiança estatística",
      propagationScore: 89.29,
      propagated: true,
      reading:
        "O tempo entre aprovação e envio para transportadora permaneceu em degradação sustentada por 10 dias, expondo 249 eventos. A pressão de recuperação chegou a pressão crítica com alta confiança estatística. A leitura indica propagação comportamental, sugerindo que a degradação não ficou isolada em uma única parte do fluxo.",
    },
    {
      id: "73b9e804-7357-4598-a561-fbff3ca4ad51",
      metricKey: "carrier_to_customer_time_days",
      metricLabel: "tempo entre transportadora e cliente",
      startedAt: "2018-03-05T00:00:00Z",
      endedAt: "2018-03-11T00:00:00Z",
      durationDays: 6,
      totalEventCount: 1187,
      rpiScore: 87.02,
      pressureLevel: "CRITICAL_PRESSURE",
      pressureLabel: "pressão crítica",
      confidenceLevel: "HIGH_CONFIDENCE",
      confidenceLabel: "alta confiança estatística",
      propagationScore: 82.14,
      propagated: true,
      reading:
        "O tempo entre transportadora e cliente permaneceu em degradação sustentada por 6 dias, expondo 1187 eventos. A pressão de recuperação chegou a pressão crítica com alta confiança estatística. A leitura indica propagação comportamental, sugerindo que a degradação não ficou isolada em uma única parte do fluxo.",
    },
    {
      id: "2a54cf86-94c8-4dcd-98e0-0f4f7fd3e5e6",
      metricKey: "delivery_delay_days",
      metricLabel: "atraso de entrega",
      startedAt: "2017-12-26T00:00:00Z",
      endedAt: "2017-12-31T00:00:00Z",
      durationDays: 5,
      totalEventCount: 944,
      rpiScore: 77.79,
      pressureLevel: "CRITICAL_PRESSURE",
      pressureLabel: "pressão crítica",
      confidenceLevel: "HIGH_CONFIDENCE",
      confidenceLabel: "alta confiança estatística",
      propagationScore: 82.14,
      propagated: true,
      reading:
        "O atraso de entrega permaneceu em degradação sustentada por 5 dias, expondo 944 eventos. A pressão de recuperação chegou a pressão crítica com alta confiança estatística. A leitura indica propagação comportamental, sugerindo que a degradação não ficou isolada em uma única parte do fluxo.",
    },
  ],
  propagation: {
    hasPropagation: true,
    propagatedEpisodes: 29,
    interpretation:
      "A degradação não ficou completamente isolada. 29 episódios apresentaram influência de propagação comportamental.",
    nodes: [
      {
        metricKey: "approval_time_minutes",
        metricLabel: "tempo de aprovação",
        episodes: 14,
        dominant: false,
      },
      {
        metricKey: "carrier_dispatch_time_hours",
        metricLabel: "tempo entre aprovação e envio para transportadora",
        episodes: 13,
        dominant: false,
      },
      {
        metricKey: "carrier_to_customer_time_days",
        metricLabel: "tempo entre transportadora e cliente",
        episodes: 8,
        dominant: false,
      },
      {
        metricKey: "delivery_delay_days",
        metricLabel: "atraso de entrega",
        episodes: 17,
        dominant: true,
      },
      {
        metricKey: "total_delivery_time_days",
        metricLabel: "tempo total de entrega",
        episodes: 7,
        dominant: false,
      },
    ],
    edges: [
      {
        sourceMetricKey: "approval_time_minutes",
        targetMetricKey: "carrier_to_customer_time_days",
        strength: 81.55,
        overlapEpisodes: 6,
      },
      {
        sourceMetricKey: "carrier_dispatch_time_hours",
        targetMetricKey: "carrier_to_customer_time_days",
        strength: 80.23,
        overlapEpisodes: 6,
      },
      {
        sourceMetricKey: "carrier_dispatch_time_hours",
        targetMetricKey: "total_delivery_time_days",
        strength: 80.14,
        overlapEpisodes: 7,
      },
      {
        sourceMetricKey: "approval_time_minutes",
        targetMetricKey: "total_delivery_time_days",
        strength: 76.14,
        overlapEpisodes: 10,
      },
      {
        sourceMetricKey: "carrier_to_customer_time_days",
        targetMetricKey: "total_delivery_time_days",
        strength: 74.11,
        overlapEpisodes: 8,
      },
      {
        sourceMetricKey: "approval_time_minutes",
        targetMetricKey: "carrier_dispatch_time_hours",
        strength: 73.87,
        overlapEpisodes: 16,
      },
      {
        sourceMetricKey: "carrier_to_customer_time_days",
        targetMetricKey: "delivery_delay_days",
        strength: 72.09,
        overlapEpisodes: 9,
      },
      {
        sourceMetricKey: "delivery_delay_days",
        targetMetricKey: "total_delivery_time_days",
        strength: 70.08,
        overlapEpisodes: 5,
      },
      {
        sourceMetricKey: "carrier_dispatch_time_hours",
        targetMetricKey: "delivery_delay_days",
        strength: 69.13,
        overlapEpisodes: 14,
      },
      {
        sourceMetricKey: "approval_time_minutes",
        targetMetricKey: "delivery_delay_days",
        strength: 68.52,
        overlapEpisodes: 11,
      },
    ],
  },
  confidence: {
    totalEpisodes: 59,
    highConfidenceEpisodes: 26,
    mediumConfidenceEpisodes: 14,
    lowConfidenceEpisodes: 19,
    highConfidenceRatio: 44.07,
    mediumConfidenceRatio: 23.73,
    lowConfidenceRatio: 32.2,
    interpretation:
      "A leitura principal é sustentada por episódios com maior confiança estatística. Sinais com baixa confiança foram considerados, mas não determinam a conclusão principal.",
  },
  investigationHypotheses: [
    {
      title: "Comparar episódios críticos com mudanças operacionais",
      description:
        "Compare os períodos de maior pressão com deploys, mudanças de regra, campanhas ou alterações logísticas.",
      priority: "HIGH",
      rationale:
        "Episódios críticos indicam períodos em que a operação já acumulava pressão suficiente para justificar investigação.",
    },
    {
      title: "Investigar propagação entre métricas",
      description:
        "Analise se atraso de entrega degradou junto com outras etapas do fluxo.",
      priority: "HIGH",
      rationale:
        "Propagação sugere que a degradação pode ter coexistido com outros sinais pressionados, reduzindo a chance de ser um problema isolado.",
    },
    {
      title: "Separar sinais robustos de sinais frágeis",
      description:
        "Priorize episódios com alta confiança estatística antes de investigar sinais de baixo volume.",
      priority: "MEDIUM",
      rationale:
        "ConfidenceLevel evita que baixo volume seja interpretado como conclusão forte.",
    },
    {
      title: "Acompanhar recorrência comportamental",
      description:
        "Compare os episódios destacados com ocorrências anteriores para avaliar se existe família recorrente de degradação.",
      priority: "MEDIUM",
      rationale:
        "A memória comportamental é um diferencial importante para identificar padrões que voltam.",
    },
  ],
} as const;

export type OrderDeliveryDiagnostic = typeof orderDeliveryDiagnosticMock;