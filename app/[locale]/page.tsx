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
    <span className="text-2xl font-black tracking-[-0.06em] text-[#071545]">
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
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
      <path strokeLinecap="round" d="m15.2 15.2 4.3 4.3M7.7 12.2l1.8-2.1 1.7 1.5 2.1-2.7" />
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l2-5 4 10 2-5h6" />
    </svg>
  );
}

function MiniChart({
  persistent = false,
}: {
  persistent?: boolean;
}) {
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
    <div className="relative mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 pb-3 pt-4">
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
              <div key={index} className="border-t border-slate-100" />
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

      <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(7,21,69,0.12)] sm:p-7">
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

        <dl className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:grid-cols-2">
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
                className={`mt-1 text-sm font-bold ${index === 2
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

        <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200">
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
              <h3 className="font-bold text-[#071545]">Por que merece atenção</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                A mudança persiste além do normal e começou a afetar mais de um sinal da jornada.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function FormalLimitSection() {
  const stages = [
    {
      title: "Comportamento muda",
      description:
        "Clientes começam a tentar mais, demorar mais ou desistir em um contexto específico.",
      state: "Ainda não há falha",
    },
    {
      title: "Sinais persistem",
      description:
        "A mudança deixa de ser pontual, mas continua diluída nas métricas gerais.",
      state: "Ainda parece variação",
    },
    {
      title: "Impacto se acumula",
      description:
        "Conversão, atendimento ou receita começam a absorver os efeitos da mudança.",
      state: "O custo já começou",
    },
    {
      title: "Limite excedido",
      description:
        "A condição formal é atingida e o problema finalmente gera um alerta.",
      state: "Agora existe confirmação",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08),transparent_34%)]" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
            Quando o alerta chega
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#071545] sm:text-5xl">
            Um limite formal não mostra necessariamente quando o problema começou.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Ele mostra quando uma condição definida pela operação finalmente foi
            ultrapassada. Nesse momento, o alerta está correto — mas o impacto já
            teve tempo para se formar.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-[10%] right-[10%] top-7 hidden border-t-2 border-dashed border-slate-200 lg:block" />

          <div className="grid gap-5 lg:grid-cols-4">
            {stages.map((stage, index) => (
              <article
                key={stage.title}
                className={`relative rounded-3xl border p-6 ${
                  index === stages.length - 1
                    ? "border-orange-200 bg-orange-50 shadow-[0_18px_60px_rgba(244,81,30,0.10)]"
                    : "border-slate-200 bg-white"
                }`}
              >
                <span
                  className={`relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full border-4 border-white text-sm font-black shadow-md ${
                    index === stages.length - 1
                      ? "bg-[#f4511e] text-white"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {index + 1}
                </span>

                <h3 className="mt-6 text-xl font-black text-[#071545]">
                  {stage.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {stage.description}
                </p>

                <p
                  className={`mt-5 border-t pt-4 text-sm font-black ${
                    index === stages.length - 1
                      ? "border-orange-200 text-[#f4511e]"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  {stage.state}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
          <div className="grid lg:grid-cols-[1fr_auto_1fr]">
            <div className="p-7">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
                Antes do limite
              </p>
              <h3 className="mt-3 text-xl font-black text-[#071545]">
                Janela de percepção
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                O comportamento já mudou, mas a evidência ainda parece pequena,
                reversível ou localizada.
              </p>
            </div>

            <div className="hidden items-center justify-center px-4 text-2xl text-slate-300 lg:flex">
              →
            </div>

            <div className="border-t border-slate-200 p-7 lg:border-l lg:border-t-0">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f4511e]">
                Depois do limite
              </p>
              <h3 className="mt-3 text-xl font-black text-[#071545]">
                Reação formal
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                O impacto ficou evidente o suficiente para gerar alerta,
                investigação e prioridade.
              </p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-4xl text-center text-2xl font-black tracking-[-0.03em] text-[#071545]">
          O limite identifica quando o impacto ficou grande o suficiente para ser
          formalizado. O comportamento mostra quando ele começou a ser construído.
        </p>
      </div>
    </section>
  );
}

const signals = [
  "clientes mobile demoram mais para concluir",
  "o Pix começa a exigir mais tentativas",
  "o abandono cresce depois do cálculo do frete",
  "determinados produtos geram mais dúvidas",
  "a aprovação continua acontecendo, mas mais lentamente",
  "uma etapa deixa de se recuperar como antes",
];

const factors = [
  {
    title: "Persistência",
    text: "A mudança continua além da janela normal de recuperação.",
  },
  {
    title: "Contexto",
    text: "O problema se concentra em um canal, dispositivo, pagamento ou produto.",
  },
  {
    title: "Propagação",
    text: "Mais de um sinal da jornada começa a se deteriorar ao mesmo tempo.",
  },
  {
    title: "Impacto",
    text: "O comportamento começa a expor conversão, atendimento ou receita.",
  },
];

const flowSteps = [
  {
    number: "01",
    title: "O Ohrly entende o fluxo",
    text: "Checkout, pagamento, entrega, carrinho, recompra ou atendimento.",
  },
  {
    number: "02",
    title: "Reconhece o comportamento habitual",
    text: "Cada contexto é comparado com o histórico relevante da própria operação.",
  },
  {
    number: "03",
    title: "Separa oscilação de regressão",
    text: "Mudanças pontuais são filtradas. Persistência e perda de recuperação ganham prioridade.",
  },
  {
    number: "04",
    title: "Entrega uma leitura acionável",
    text: "Você entende o que mudou, onde, há quanto tempo e por que isso merece atenção.",
  },
];

const examples = [
  {
    label: "Checkout",
    before: "A conversão caiu 4%.",
    after:
      "A conclusão em Mobile + Pix piora há quatro dias, com mais tentativas e recuperação cada vez mais lenta.",
  },
  {
    label: "Frete",
    before: "O abandono aumentou.",
    after:
      "O abandono após o cálculo de frete cresceu em pedidos de menor valor, enquanto os demais contextos permaneceram estáveis.",
  },
  {
    label: "Atendimento",
    before: "Entraram mais mensagens.",
    after:
      "As dúvidas sobre tamanho e retirada estão aumentando antes da compra em produtos específicos.",
  },
];

export default function EcommerceAlertsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      <header className="relative z-20 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a aria-label="Ohrly — página inicial" href="/pt">
            <LogoMark />
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-8 text-sm font-semibold text-slate-700 md:flex"
          >
            <a className="transition hover:text-blue-700" href="#problema">
              O problema
            </a>
            <a className="transition hover:text-blue-700" href="#como-funciona">
              Como funciona
            </a>
            <a className="transition hover:text-blue-700" href="#exemplos">
              Exemplos
            </a>
          </nav>

          <a
            className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-800"
            href="/pt/contact"
          >
            Conversar com a Ohrly
          </a>
        </div>
      </header>

      <section className="relative">
        <div className="absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(circle_at_72%_30%,rgba(59,130,246,0.13),transparent_36%),radial-gradient(circle_at_88%_44%,rgba(244,81,30,0.08),transparent_24%)]" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-16 lg:grid-cols-[1.2fr_1fr] lg:px-8 lg:pb-32 lg:pt-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-4 py-2 text-xs font-black uppercase tracking-[0.13em] text-blue-700">
              <span className="h-2 w-2 rounded-full bg-[#f4511e]" />
              Inteligência operacional para e-commerce
            </div>

            <h1 className="mt-8 max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.06em] text-[#071545] sm:text-6xl lg:text-[74px]">
              Seu e-commerce não precisa de mais alertas.
              <span className="mt-2 block text-[#f4511e]">
                Precisa dos alertas certos.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              O Ohrly interpreta continuamente o comportamento dos seus clientes para
              revelar regressões que ainda não viraram falhas.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-800"
                href="/pt/contact"
              >
                <SearchSignalIcon />
                Quero descobrir o que está mudando
              </a>

              <a
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-black text-blue-700 transition hover:bg-blue-50"
                href="#exemplo-alerta"
              >
                Ver exemplo
                <ArrowRightIcon />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-slate-200 pt-6 text-sm text-slate-500">
              <span>Não é mais um dashboard</span>
              <span>Não dispara por qualquer oscilação</span>
              <span>Não depende de um limite fixo</span>
            </div>
          </div>

          <div className="grid items-center gap-5">
            <AlertPanel />
            {/* <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <SignalCard type="noise" />
              <SignalCard type="persistent" />
              <SignalCard type="context" />
            </div> */}
          </div>
        </div>
      </section>

      <section id="problema" className="bg-[#071545] py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-400">
              Nenhuma métrica precisa assustar
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              Sua loja pode continuar funcionando enquanto a jornada começa a piorar.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100/80">
              O sinal relevante raramente aparece como um incidente abrupto. Ele costuma
              surgir como pequenas mudanças que persistem, se concentram e perdem a
              capacidade natural de recuperação.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {signals.map((signal) => (
              <div
                key={signal}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-300">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <p className="leading-7 text-blue-50">{signal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FormalLimitSection/>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
              Você já tem dados
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#071545] sm:text-5xl">
              O que falta é saber quando eles realmente importam.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Plataformas e dashboards mostram números. O Ohrly interpreta quando uma
              mudança deixou de ser variação normal e começou a exigir decisão.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {factors.map((factor) => (
              <article
                key={factor.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(7,21,69,0.07)]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 font-black text-blue-700">
                  {factor.title.slice(0, 1)}
                </span>
                <h3 className="mt-5 text-xl font-black text-[#071545]">
                  {factor.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{factor.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-[32px] border border-slate-200 bg-white p-7">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                Sem leitura contínua
              </p>
              <h3 className="mt-4 text-2xl font-black text-[#071545]">
                Nenhum alerta
              </h3>
              <p className="mt-4 leading-7 text-slate-600">
                O problema só ganha prioridade quando a conversão cai, as reclamações
                aumentam ou o fechamento mostra a perda.
              </p>
            </article>

            <article className="rounded-[32px] border border-slate-200 bg-white p-7">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                Monitoramento tradicional
              </p>
              <h3 className="mt-4 text-2xl font-black text-[#071545]">
                Alertas demais
              </h3>
              <p className="mt-4 leading-7 text-slate-600">
                Toda oscilação vira notificação e alguém ainda precisa descobrir o que é
                ruído, sazonalidade ou regressão real.
              </p>
            </article>

            <article className="rounded-[32px] border border-orange-200 bg-orange-50 p-7 shadow-[0_18px_60px_rgba(244,81,30,0.12)]">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f4511e]">
                Com o Ohrly
              </p>
              <h3 className="mt-4 text-2xl font-black text-[#071545]">
                Os alertas certos
              </h3>
              <p className="mt-4 leading-7 text-slate-700">
                A mudança só chega até você quando persistência, contexto e impacto começam
                a formar uma janela real de decisão.
              </p>
            </article>
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-center text-2xl font-black tracking-[-0.03em] text-[#071545]">
            O Ohrly não tenta fazer você olhar mais dados. Ele mostra quais mudanças já não
            deveriam ser ignoradas.
          </p>
        </div>
      </section>

      <section id="como-funciona" className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
              Como funciona
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#071545] sm:text-5xl">
              Do dado bruto a uma decisão que merece atenção.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {flowSteps.map((step) => (
              <article
                key={step.number}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6"
              >
                <span className="absolute right-4 top-1 text-7xl font-black text-slate-100">
                  {step.number}
                </span>
                <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-sm font-black text-white">
                  {step.number}
                </span>
                <h3 className="relative mt-8 text-xl font-black text-[#071545]">
                  {step.title}
                </h3>
                <p className="relative mt-3 leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="exemplo-alerta" className="bg-[#071545] py-24 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-400">
              Uma leitura, não apenas uma métrica
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              O alerta explica o que mudou e por que isso merece atenção agora.
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100/80">
              O resultado não é “conversão caiu”. É uma leitura localizada, temporal e
              conectada ao comportamento real da jornada.
            </p>
          </div>

          <AlertPanel />
        </div>
      </section>

      <section id="exemplos" className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
              Mais contexto para agir
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#071545] sm:text-5xl">
              Menos “o número mudou”. Mais “é aqui que a jornada começou a piorar”.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {examples.map((example) => (
              <article
                key={example.label}
                className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(7,21,69,0.07)]"
              >
                <div className="border-b border-slate-200 bg-slate-50 p-6">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
                    {example.label}
                  </span>
                  <p className="mt-5 text-lg font-bold text-slate-400 line-through decoration-slate-300">
                    “{example.before}”
                  </p>
                </div>

                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#f4511e]">
                    Leitura Ohrly
                  </p>
                  <p className="mt-4 text-lg font-bold leading-8 text-[#071545]">
                    “{example.after}”
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[38px] bg-[linear-gradient(135deg,#0b1d5c_0%,#0b3aa5_65%,#124fcf_100%)] px-6 py-16 text-center text-white shadow-[0_30px_100px_rgba(11,58,165,0.28)] sm:px-12">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-200">
            O alerta que seu e-commerce ainda não recebeu
          </p>
          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black tracking-[-0.05em] sm:text-5xl">
            Descubra o que começou a piorar antes da queda aparecer no fechamento.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Seu e-commerce não precisa de mais notificações. Precisa saber quais mudanças
            realmente merecem uma decisão.
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

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <LogoMark />
            <p className="mt-2">Interpretação contínua do comportamento de fluxos digitais.</p>
          </div>

          <p>Ohrly · Pré-incubação Porto Digital 2026.1</p>
        </div>
      </footer>
    </main>
  );
}