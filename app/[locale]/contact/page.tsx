import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Converse com a Ohrly | E-commerce",
  description:
    "Conte qual parte da jornada do seu e-commerce mais preocupa e descubra quais mudanças já podem merecer atenção.",
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

function ArrowLeftIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m6 6-6-6 6-6" />
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

function WarningIcon({ className = "h-5 w-5" }: IconProps) {
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

const nextSteps = [
  {
    title: "Entendemos o fluxo",
    description:
      "Checkout, pagamento, frete, entrega, recompra ou atendimento.",
  },
  {
    title: "Validamos o que pode ser observado",
    description:
      "Explicamos quais dados ajudam a diferenciar variação de regressão.",
  },
  {
    title: "Definimos a primeira leitura",
    description:
      "Você entende qual comportamento acompanhar e por que ele merece atenção.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f9ff] text-slate-900">
      <header className="border-b border-blue-100/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a aria-label="Ohrly — página inicial" href="/pt">
            <LogoMark />
          </a>

          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-900"
          >
            <ArrowLeftIcon />
            Voltar para a página
          </a>
        </div>
      </header>

      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_15%,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_88%_70%,rgba(244,81,30,0.08),transparent_24%)]" />

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-20">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
              <span className="h-2 w-2 rounded-full bg-[#f4511e]" />
              Primeiro contato
            </div>

            <h1 className="mt-7 max-w-xl text-4xl font-black leading-[1.02] tracking-[-0.055em] text-[#071545] sm:text-5xl lg:text-6xl">
              Vamos descobrir se alguma mudança já merece atenção.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Conte rapidamente sobre sua operação e o fluxo que mais preocupa.
              Você não precisa enviar dados neste primeiro contato.
            </p>

            <div className="mt-9 rounded-[28px] border border-blue-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(7,21,69,0.08)]">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#f4511e]">
                  <WarningIcon />
                </span>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#f4511e]">
                    Exemplo de contexto
                  </p>
                  <h2 className="mt-1 text-lg font-black text-[#071545]">
                    “A conversão não despencou, mas o checkout parece responder pior.”
                  </h2>
                </div>
              </div>

              <p className="mt-5 leading-7 text-slate-600">
                Esse tipo de percepção já é suficiente para começar a conversa. A
                Ohrly ajuda a transformar a sensação em uma hipótese observável.
              </p>
            </div>

            <div className="mt-10">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">
                O que acontece depois
              </p>

              <div className="mt-5 space-y-5">
                {nextSteps.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-black text-white shadow-md shadow-blue-200">
                      {index + 1}
                    </span>

                    <div>
                      <h3 className="font-black text-[#071545]">{step.title}</h3>
                      <p className="mt-1 leading-6 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-9 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm leading-6 text-blue-900">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white">
                <CheckIcon className="h-3 w-3" />
              </span>
              <p>
                A conversa inicial serve para avaliar aderência. Não pressupõe
                contratação, integração ou envio imediato de base.
              </p>
            </div>
          </aside>

          <div className="rounded-[34px] border border-blue-100 bg-white p-5 shadow-[0_30px_100px_rgba(7,21,69,0.10)] sm:p-8 lg:p-10">
            <div className="border-b border-slate-200 pb-7">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">
                Fale sobre sua operação
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#071545]">
                Onde você sente que a jornada pode estar respondendo pior?
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                O formulário leva poucos minutos. Use o campo final para contar o
                que despertou essa percepção.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-blue-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
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