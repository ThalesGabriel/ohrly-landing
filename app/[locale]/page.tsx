import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O alerta que seu e-commerce ainda não recebeu | Ohrly",
  description:
    "O Ohrly interpreta continuamente o comportamento dos seus clientes para revelar regressões que ainda não viraram falhas.",
};

type IconProps = {
  className?: string;
};

function LogoMark() {
  return (
    <span className="text-2xl font-black tracking-[-0.06em] text-[#0b2f85]">
      Ohrly
    </span>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M13 6l6 6-6 6"
      />
    </svg>
  );
}

function SearchSignalIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path
        strokeLinecap="round"
        d="m15.2 15.2 4.3 4.3M7.7 12.2l1.8-2.1 1.7 1.5 2.1-2.7"
      />
    </svg>
  );
}

function WarningIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.3 3.6 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z"
      />
      <path strokeLinecap="round" d="M12 8v4.5M12 16.5h.01" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
    </svg>
  );
}

function TargetIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}

function PulseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12h4l2-5 4 10 2-5h6"
      />
    </svg>
  );
}

function MiniChart({ persistent = false }: { persistent?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-16 w-full"
      viewBox="0 0 220 64"
      preserveAspectRatio="none"
    >
      <path
        d="M0 35 H220"
        stroke={persistent ? "#fed7aa" : "#d1d5db"}
        strokeDasharray="5 5"
      />
      <polyline
        fill="none"
        stroke={persistent ? "#f4511e" : "#9ca3af"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        points={
          persistent
            ? "4,14 40,18 76,22 112,30 148,38 184,48 216,56"
            : "4,36 40,18 76,39 112,34 148,44 184,24 216,42"
        }
      />
      {(persistent
        ? [
            [4, 14],
            [40, 18],
            [76, 22],
            [112, 30],
            [148, 38],
            [184, 48],
            [216, 56],
          ]
        : [
            [4, 36],
            [40, 18],
            [76, 39],
            [112, 34],
            [148, 44],
            [184, 24],
            [216, 42],
          ]
      ).map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="4"
          fill={persistent ? "#f4511e" : "#9ca3af"}
        />
      ))}
    </svg>
  );
}

function ImpactChart() {
  return (
    <div className="relative mt-5 overflow-hidden rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 pb-3 pt-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-bold text-[#071545]">Evolução do impacto</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#f4511e]">
          ↘ Tendência piorando
        </span>
      </div>

      <div className="grid grid-cols-[42px_1fr] gap-2">
        <div className="flex h-44 flex-col justify-between pb-5 text-[11px] text-slate-500">
          <span>+20%</span>
          <span>+10%</span>
          <span>0%</span>
          <span>-10%</span>
          <span>-20%</span>
        </div>

        <div className="relative h-44">
          <div className="absolute inset-0 flex flex-col justify-between pb-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="border-t border-blue-50" />
            ))}
          </div>

          <svg
            aria-label="Gráfico mostrando piora gradual entre 13 e 18 de maio"
            className="absolute inset-x-0 top-0 h-[138px] w-full overflow-visible"
            viewBox="0 0 600 138"
            preserveAspectRatio="none"
            role="img"
          >
            <defs>
              <linearGradient id="impactArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f4511e" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#f4511e" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            <path
              d="M12 45 C90 38, 120 35, 180 47 S290 63, 355 70 S455 90, 588 112 L588 138 L12 138 Z"
              fill="url(#impactArea)"
            />
            <path
              d="M12 45 C90 38, 120 35, 180 47 S290 63, 355 70 S455 90, 588 112"
              fill="none"
              stroke="#f4511e"
              strokeLinecap="round"
              strokeWidth="4"
            />

            {[
              [12, 45],
              [105, 39],
              [205, 49],
              [300, 67],
              [395, 75],
              [490, 94],
              [588, 112],
            ].map(([cx, cy], index) => (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={index === 6 ? 8 : 5}
                fill="white"
                stroke="#f4511e"
                strokeWidth={index === 6 ? 4 : 3}
              />
            ))}
          </svg>

          <div className="absolute inset-x-0 bottom-0 grid grid-cols-6 text-center text-[10px] text-slate-500">
            <span>13 Mai</span>
            <span>14 Mai</span>
            <span>15 Mai</span>
            <span>16 Mai</span>
            <span>17 Mai</span>
            <span>18 Mai</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertPanel() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-blue-100/50 blur-3xl" />

      <article className="rounded-[28px] border border-blue-100 bg-white p-5 shadow-[0_24px_80px_rgba(7,21,69,0.12)] sm:p-7">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#f4511e]">
            <WarningIcon />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4511e]">
              Sinal priorizado
            </p>
            <h2 className="mt-1 text-xl font-black tracking-[-0.03em] text-[#071545] sm:text-2xl">
              Regressão comportamental detectada
            </h2>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 sm:grid-cols-2">
          {[
            ["Fluxo", "Checkout e pagamento"],
            ["Contexto", "Mobile + Pix"],
            ["Persistência", "4 dias"],
            ["Status técnico", "Funcionando normalmente"],
          ].map(([label, value], index) => (
            <div key={label}>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                {label}
              </dt>
              <dd
                className={`mt-1 text-sm font-bold ${
                  index === 2
                    ? "text-[#f4511e]"
                    : index === 3
                      ? "text-emerald-600"
                      : "text-[#071545]"
                }`}
              >
                {index === 3 ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    {value}
                  </span>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <ImpactChart />

        <div className="mt-4 divide-y divide-blue-100 rounded-2xl border border-blue-100">
          <div className="flex gap-3 p-4">
            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#f4511e]">
              <PulseIcon className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-bold text-[#071545]">O que mudou</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Mais tentativas antes da confirmação e recuperação mais lenta.
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-4">
            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
              i
            </span>
            <div>
              <h3 className="font-bold text-[#071545]">
                Por que merece atenção
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                A mudança persiste além do normal e começou a afetar mais de um
                sinal da jornada.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function SignalCard({ type }: { type: "noise" | "persistent" | "context" }) {
  if (type === "context") {
    return (
      <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-[0_18px_50px_rgba(7,21,69,0.08)]">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <TargetIcon />
        </span>
        <h3 className="mt-4 text-xl font-black tracking-[-0.03em] text-[#071545]">
          Menos ruído.
          <br />
          Mais contexto.
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Alertas que conectam comportamento, persistência e impacto na jornada.
        </p>
      </div>
    );
  }

  const persistent = type === "persistent";

  return (
    <div
      className={`rounded-3xl border bg-white p-5 shadow-[0_18px_50px_rgba(7,21,69,0.08)] ${
        persistent ? "border-[#f4511e] shadow-orange-100/70" : "border-blue-100"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${
            persistent
              ? "bg-[#f4511e] text-white"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {persistent ? "↘" : "↝"}
        </span>
        <h3
          className={`font-black ${
            persistent ? "text-[#f4511e]" : "text-slate-600"
          }`}
        >
          {persistent ? "Mudança persistente" : "Oscilação pontual"}
        </h3>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {persistent
          ? "Piora consistente ao longo dos dias."
          : "Variação que segue dentro do comportamento habitual."}
      </p>

      <div className="mt-3">
        <MiniChart persistent={persistent} />
      </div>
    </div>
  );
}

const silentSignals = [
  "Mais tentativas antes da confirmação",
  "Conclusão mais lenta em Mobile",
  "Abandono concentrado depois do frete",
  "Recuperação pior a cada dia",
];

const costs = [
  {
    title: "Mídia exposta",
    text: "O investimento continua levando pessoas para uma jornada que já responde pior.",
  },
  {
    title: "Clientes desistindo",
    text: "A fricção cresce sem necessariamente gerar erro ou reclamação explícita.",
  },
  {
    title: "Operação compensando",
    text: "Atendimento e equipes internas absorvem manualmente sinais que parecem isolados.",
  },
  {
    title: "Diagnóstico mais caro",
    text: "Quando o impacto aparece, ele pode já ter alcançado mais etapas da jornada.",
  },
];

const selectionCriteria = [
  {
    title: "Persistência",
    text: "A mudança continua além da recuperação habitual.",
  },
  {
    title: "Contexto",
    text: "A piora se concentra em um dispositivo, pagamento, produto ou perfil.",
  },
  {
    title: "Recuperação",
    text: "O fluxo deixa de voltar naturalmente ao padrão anterior.",
  },
  {
    title: "Impacto",
    text: "Esperar começa a expor conversão, receita ou atendimento.",
  },
];

const examples = [
  {
    label: "Checkout",
    metric: "A conversão caiu.",
    reading:
      "A conclusão em Mobile + Pix piora há quatro dias, com mais tentativas e recuperação mais lenta.",
  },
  {
    label: "Frete",
    metric: "O abandono aumentou.",
    reading:
      "A desistência depois do cálculo de frete cresce em pedidos de menor valor, enquanto os demais contextos seguem estáveis.",
  },
  {
    label: "Atendimento",
    metric: "Entraram mais mensagens.",
    reading:
      "As dúvidas sobre tamanho e retirada aumentam antes da compra em produtos específicos.",
  },
];

function FormalLimitSection() {
  const stages = [
    {
      title: "O comportamento muda",
      note: "Ainda parece variação",
    },
    {
      title: "A mudança persiste",
      note: "O custo começa",
    },
    {
      title: "O impacto se acumula",
      note: "A média começa a responder",
    },
    {
      title: "O limite é excedido",
      note: "O alerta finalmente chega",
    },
  ];

  return (
    <section
      id="limite"
      className="relative overflow-hidden bg-[#f3f7ff] py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_8%_85%,rgba(37,99,235,0.06),transparent_26%)]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
            Quando o alerta chega
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#071545] sm:text-5xl">
            Um limite formal confirma um impacto que já teve tempo para se
            formar.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Conversão abaixo da meta, abandono acima do aceitável ou reclamações
            em alta são sinais importantes. Mas eles aparecem no fim de uma
            trajetória, não necessariamente no começo.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-[10%] right-[10%] top-6 hidden border-t-2 border-dashed border-blue-200 lg:block" />

          <div className="grid gap-4 lg:grid-cols-4">
            {stages.map((stage, index) => {
              const isLast = index === stages.length - 1;

              return (
                <article
                  key={stage.title}
                  className={`relative rounded-3xl border p-6 shadow-[0_16px_45px_rgba(11,47,133,0.06)] ${
                    isLast
                      ? "border-orange-200 bg-orange-50"
                      : "border-blue-100 bg-white/90"
                  }`}
                >
                  <span
                    className={`relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border-4 border-white text-sm font-black shadow-sm ${
                      isLast
                        ? "bg-[#f4511e] text-white"
                        : "bg-blue-700 text-white"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <h3 className="mt-5 text-lg font-black text-[#071545]">
                    {stage.title}
                  </h3>

                  <p
                    className={`mt-3 text-sm font-bold ${
                      isLast ? "text-[#f4511e]" : "text-blue-700/70"
                    }`}
                  >
                    {stage.note}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-[26px] border border-blue-100 bg-white/80 px-6 py-6 text-center shadow-[0_16px_45px_rgba(11,47,133,0.05)] backdrop-blur sm:px-10">
          <p className="text-xl font-black tracking-[-0.02em] text-[#071545]">
            O limite mostra quando o impacto ficou grande o suficiente para ser
            formalizado. O comportamento mostra quando ele começou.
          </p>
        </div>
      </div>
    </section>
  );
}

function DelayedReactionCostSection() {
  return (
    <section
      id="custo"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#06143e_0%,#0a2d7a_62%,#1049bd_100%)] py-20 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(96,165,250,0.16),transparent_30%),radial-gradient(circle_at_90%_85%,rgba(244,81,30,0.10),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-400">
              O custo de reagir depois
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              O alerta não cria o impacto.
              <span className="block text-orange-400">
                Ele confirma o que já vinha se acumulando.
              </span>
            </h2>
          </div>

          <p className="text-lg leading-8 text-blue-100/85">
            Enquanto a operação espera uma métrica ultrapassar seu limite,
            clientes, mídia e equipes continuam atravessando uma jornada que já
            responde pior.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {costs.map((cost, index) => (
            <article
              key={cost.title}
              className="rounded-3xl border border-blue-200/15 bg-white/[0.07] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.12)] backdrop-blur-sm"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-orange-400/15 text-sm font-black text-orange-400 ring-1 ring-inset ring-orange-200/15">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-black text-white">
                {cost.title}
              </h3>
              <p className="mt-3 leading-7 text-blue-100/75">{cost.text}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-[28px] border border-blue-200/15 bg-blue-950/25 px-6 py-7 text-center backdrop-blur-sm sm:px-10">
          <p className="text-2xl font-black tracking-[-0.03em] text-white">
            O custo da percepção tardia é tudo o que permaneceu exposto entre o
            início da mudança e a primeira decisão.
          </p>
        </div>
      </div>
    </section>
  );
}

function EarlierDecisionSection() {
  const traditional = [
    "O comportamento muda",
    "O impacto se acumula",
    "O limite é excedido",
    "A investigação começa",
  ];

  const ohrly = [
    "O comportamento muda",
    "A persistência é reconhecida",
    "O contexto é localizado",
    "A decisão pode começar",
  ];

  return (
    <section id="resposta" className="relative overflow-hidden bg-white py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.08),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
            Antes do impacto consolidado
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#071545] sm:text-5xl">
            O Ohrly não espera a métrica assustar.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Ele reduz a distância entre o momento em que o comportamento muda e
            o momento em que alguém consegue decidir.
          </p>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-[32px] border border-blue-100 bg-white shadow-[0_24px_80px_rgba(11,47,133,0.10)] lg:grid-cols-2">
          <div className="border-b border-blue-100 bg-[#f7f9fc] p-7 lg:border-b-0 lg:border-r sm:p-9">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
              Reação pelo limite
            </p>

            <div className="mt-6 space-y-4">
              {traditional.map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-black text-slate-600">
                    {index + 1}
                  </span>
                  <p className="font-bold text-slate-600">{item}</p>
                </div>
              ))}
            </div>

            <p className="mt-7 border-t border-slate-200 pt-5 text-sm font-black text-slate-500">
              A reação começa depois que o impacto se consolidou.
            </p>
          </div>

          <div className="bg-[linear-gradient(145deg,#eef5ff_0%,#f8fbff_100%)] p-7 sm:p-9">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
              Interpretação com Ohrly
            </p>

            <div className="mt-6 space-y-4">
              {ohrly.map((item, index) => {
                const isLast = index === ohrly.length - 1;

                return (
                  <div key={item} className="flex items-center gap-3">
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                        isLast
                          ? "bg-[#f4511e] text-white"
                          : "bg-blue-700 text-white"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <p className="font-bold text-[#071545]">{item}</p>
                  </div>
                );
              })}
            </div>

            <p className="mt-7 border-t border-blue-100 pt-5 text-sm font-black text-blue-700">
              A decisão pode começar enquanto o impacto ainda está sendo
              construído.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectiveAlertingSection() {
  return (
    <section
      id="relevancia"
      className="relative overflow-hidden bg-[#eef5ff] py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_22%,rgba(59,130,246,0.14),transparent_30%),radial-gradient(circle_at_8%_85%,rgba(37,99,235,0.06),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
            Relevância antes de notificação
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#071545] sm:text-5xl">
            Isso não significa alertar sobre tudo.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            O Ohrly não reage a uma variação isolada. Ele destaca mudanças
            quando sinais diferentes começam a formar uma leitura relevante.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {selectionCriteria.map((criterion, index) => (
            <article
              key={criterion.title}
              className="rounded-3xl border border-blue-100 bg-white/90 p-6 shadow-[0_18px_55px_rgba(11,47,133,0.07)] backdrop-blur-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_65px_rgba(11,47,133,0.12)]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-sm font-black text-white shadow-md shadow-blue-200">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-5 text-xl font-black text-[#071545]">
                {criterion.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">{criterion.text}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-[28px] border border-blue-300/20 bg-[linear-gradient(135deg,#071545_0%,#0b3a9f_100%)] px-6 py-7 text-center text-white shadow-[0_22px_70px_rgba(11,47,133,0.22)] sm:px-10">
          <p className="text-2xl font-black tracking-[-0.03em]">
            O Ohrly não antecipa qualquer alerta.
          </p>

          <p className="mt-2 text-lg font-bold leading-8 text-blue-100">
            Ele antecipa o momento em que uma mudança já começou a merecer
            atenção.
          </p>
        </div>
      </div>
    </section>
  );
}

function ReadingExamplesSection() {
  return (
    <section id="exemplos" className="relative overflow-hidden bg-white py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(59,130,246,0.06),transparent_25%)]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
            Uma leitura, não apenas uma métrica
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#071545] sm:text-5xl">
            Menos “o número mudou”. Mais “é aqui que a jornada começou a
            piorar”.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {examples.map((example) => (
            <article
              key={example.label}
              className="overflow-hidden rounded-[28px] border border-blue-100 bg-white shadow-[0_18px_60px_rgba(11,47,133,0.08)]"
            >
              <div className="border-b border-blue-100 bg-[#f3f7ff] p-6">
                <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                  {example.label}
                </span>
                <p className="mt-5 text-lg font-bold text-slate-400">
                  “{example.metric}”
                </p>
              </div>

              <div className="border-l-4 border-blue-600 p-6">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
                  Leitura Ohrly
                </p>
                <p className="mt-4 text-lg font-bold leading-8 text-[#071545]">
                  “{example.reading}”
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function EcommerceAlertsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fbff] text-slate-900">
      <header className="relative z-20 border-b border-blue-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a aria-label="Ohrly — página inicial" href="/pt">
            <LogoMark />
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-7 text-sm font-semibold text-[#18305f] md:flex"
          >
            <a className="transition hover:text-blue-700" href="#problema">
              O problema
            </a>
            <a className="transition hover:text-blue-700" href="#custo">
              O custo
            </a>
            <a className="transition hover:text-blue-700" href="#resposta">
              Como o Ohrly ajuda
            </a>
          </nav>

          <a
            className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200/70 transition hover:-translate-y-0.5 hover:bg-blue-800"
            href="/pt/contact"
          >
            Conversar com a Ohrly
          </a>
        </div>
      </header>

      <section className="relative bg-[#f8fbff]">
        <div className="absolute inset-x-0 top-0 -z-10 h-[680px] bg-[radial-gradient(circle_at_72%_30%,rgba(59,130,246,0.16),transparent_36%),radial-gradient(circle_at_88%_44%,rgba(244,81,30,0.07),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:pb-28 lg:pt-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-4 py-2 text-xs font-black uppercase tracking-[0.13em] text-blue-700">
              <span className="h-2 w-2 rounded-full bg-[#f4511e]" />
              Inteligência operacional para e-commerce
            </div>

            <h1 className="mt-8 max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.06em] text-[#071545] sm:text-6xl lg:text-[70px]">
              Seu e-commerce não precisa de mais alertas.
              <span className="mt-2 block text-[#f4511e]">
                Precisa dos alertas certos.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              O Ohrly interpreta continuamente o comportamento dos seus clientes
              para revelar regressões que ainda não viraram falhas.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-200/70 transition hover:-translate-y-0.5 hover:bg-blue-800"
                href="/pt/contact"
              >
                <SearchSignalIcon />
                Quero descobrir o que está mudando
              </a>

              <a
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-black text-blue-700 transition hover:bg-blue-50"
                href="#resposta"
              >
                Entender como funciona
                <ArrowRightIcon />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-blue-100 pt-6 text-sm text-[#52698f]">
              <span>Não é mais um dashboard</span>
              <span>Não dispara por qualquer oscilação</span>
              <span>Não espera o fechamento</span>
            </div>
          </div>

          <AlertPanel />
        </div>
      </section>

      <section
        id="problema"
        className="relative overflow-hidden bg-[linear-gradient(135deg,#071545_0%,#0a2d7a_70%,#1049bd_100%)] py-20 text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(96,165,250,0.16),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-400">
              Nenhuma métrica precisa assustar
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              Sua loja pode continuar funcionando enquanto a jornada começa a
              piorar.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100/80">
              O primeiro sinal costuma aparecer como pequenas mudanças
              persistentes, não como uma falha explícita.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {silentSignals.map((signal) => (
              <div
                key={signal}
                className="flex items-center gap-3 rounded-2xl border border-blue-200/15 bg-white/[0.07] p-4 backdrop-blur-sm"
              >
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <p className="font-bold text-blue-50">{signal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FormalLimitSection />
      <DelayedReactionCostSection />
      <EarlierDecisionSection />
      <SelectiveAlertingSection />
      <ReadingExamplesSection />

      <section className="bg-white px-5 pb-20 pt-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#0b1d5c_0%,#0b3aa5_65%,#124fcf_100%)] px-6 py-14 text-center text-white shadow-[0_30px_100px_rgba(11,58,165,0.28)] sm:px-12">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-200">
            O alerta que seu e-commerce ainda não recebeu
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black tracking-[-0.05em] sm:text-5xl">
            Descubra o que começou a piorar antes da queda aparecer no
            fechamento.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Veja quais mudanças realmente merecem uma decisão, sem transformar
            toda oscilação em mais uma notificação.
          </p>

          <a
            className="mt-9 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-black text-blue-800 shadow-xl transition hover:-translate-y-0.5"
            href="/pt/contact"
          >
            Quero analisar minha operação
            <ArrowRightIcon />
          </a>
        </div>
      </section>

      <footer className="border-t border-blue-100 bg-[#eef5ff]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-[#52698f] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <LogoMark />
            <p className="mt-2">
              Interpretação contínua do comportamento de fluxos digitais.
            </p>
          </div>

          <p>Ohrly · Pré-incubação Porto Digital 2026.1</p>
        </div>
      </footer>
    </main>
  );
}
