"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowRight, Check, X } from "lucide-react";

import { LeadFormIntentTrigger } from "@/components/lead-form-modal";
import { trackBehavior } from "@/lib/tracking/client";

type DemoSource = {
  ctaId: string;
  location: string;
  label: string;
};

type DemoContextValue = {
  openDemo: (source: DemoSource) => void;
};

type AccountKey = "acme" | "luma";
type ActionKey = "primary" | "context" | "monitor";

type TimelineItem = {
  date: string;
  title: string;
  body: string;
  tone?: "brand" | "positive" | "neutral";
};

const DemoContext = createContext<DemoContextValue | null>(null);

const accountCopy: Record<
  AccountKey,
  {
    name: string;
    score: number;
    summary: string;
    detail: string;
    expected: string;
    desired: string;
    signals: Array<{
      label: string;
      value: string;
      width: string;
      changed?: boolean;
    }>;
  }
> = {
  acme: {
    name: "Acme",
    score: 41,
    summary: "A adoção está se degradando.",
    detail: "A relação saiu do padrão próprio da Acme há 18 dias.",
    expected: "Uso recorrente e cadência estável.",
    desired: "Recuperar adoção.",
    signals: [
      { label: "Uso", value: "↓ 38%", width: "42%", changed: true },
      { label: "Cadência", value: "↓", width: "50%", changed: true },
      { label: "Contrato", value: "Estável", width: "78%" },
    ],
  },
  luma: {
    name: "Luma",
    score: 43,
    summary: "A mudança está fora do produto.",
    detail: "Uso continua normal; a ruptura apareceu na continuidade contratual.",
    expected: "Uso dentro do padrão e continuidade contratual estável.",
    desired: "Entender e estabilizar a mudança contratual.",
    signals: [
      { label: "Uso", value: "Estável", width: "82%" },
      { label: "Cadência", value: "Estável", width: "77%" },
      { label: "Contrato", value: "↓ forte", width: "34%", changed: true },
    ],
  },
};

const actionCopy: Record<
  AccountKey,
  Record<
    ActionKey,
    {
      label: string;
      helper: string;
      headline: string;
      response: string;
      timeline: TimelineItem[];
    }
  >
> = {
  acme: {
    primary: {
      label: "Workshop de adoção",
      helper: "Quero recuperar uso e cadência.",
      headline: "A relação começou a responder.",
      response: "O Ohrly continua acompanhando se a recuperação persiste.",
      timeline: [
        {
          date: "13 ago",
          title: "Mudança começou",
          body: "Uso saiu da faixa habitual.",
          tone: "brand",
        },
        {
          date: "24 ago",
          title: "Workshop de adoção",
          body: "Ação registrada pelo time.",
          tone: "brand",
        },
        {
          date: "28 ago",
          title: "Primeiros sinais de recuperação",
          body: "Uso e cadência começaram a voltar.",
          tone: "positive",
        },
        {
          date: "Hoje",
          title: "Recuperando",
          body: "A melhora continua, mas o ciclo ainda está aberto.",
          tone: "positive",
        },
      ],
    },
    context: {
      label: "Contato com o champion",
      helper: "Quero entender o que mudou antes de agir.",
      headline: "A história ganhou contexto, mas ainda não virou recuperação.",
      response: "O ciclo permanece aberto e o Ohrly continua acompanhando a relação.",
      timeline: [
        {
          date: "13 ago",
          title: "Mudança começou",
          body: "Uso saiu da faixa habitual.",
          tone: "brand",
        },
        {
          date: "24 ago",
          title: "Contato com o champion",
          body: "Ação registrada pelo time.",
          tone: "brand",
        },
        {
          date: "27 ago",
          title: "Novo contexto",
          body: "A cadência estabilizou, mas o uso segue baixo.",
          tone: "neutral",
        },
        {
          date: "Hoje",
          title: "Persistente",
          body: "Ainda não há recuperação suficiente.",
          tone: "neutral",
        },
      ],
    },
    monitor: {
      label: "Só acompanhar por enquanto",
      helper: "Quero ver se a mudança persiste.",
      headline: "A mudança continuou sem intervenção.",
      response: "Ohrly acompanha a persistência e mantém a memória do ciclo.",
      timeline: [
        {
          date: "13 ago",
          title: "Mudança começou",
          body: "Uso saiu da faixa habitual.",
          tone: "brand",
        },
        {
          date: "24 ago",
          title: "Acompanhamento mantido",
          body: "Nenhuma intervenção registrada.",
          tone: "brand",
        },
        {
          date: "28 ago",
          title: "Mudança persistiu",
          body: "Uso continuou fora do padrão.",
          tone: "neutral",
        },
        {
          date: "Hoje",
          title: "Ainda degradando",
          body: "O ciclo continua aberto.",
          tone: "neutral",
        },
      ],
    },
  },
  luma: {
    primary: {
      label: "Revisar a renovação",
      helper: "Quero entender a mudança contratual.",
      headline: "O uso segue normal, mas a incerteza contratual continua.",
      response: "Ohrly mantém as dimensões separadas e acompanha a evolução da relação.",
      timeline: [
        {
          date: "15 ago",
          title: "Mudança contratual apareceu",
          body: "Uso ainda permanecia dentro do padrão.",
          tone: "brand",
        },
        {
          date: "24 ago",
          title: "Revisão de renovação",
          body: "Ação registrada pelo time.",
          tone: "brand",
        },
        {
          date: "29 ago",
          title: "Uso segue estável",
          body: "A dimensão comportamental não se degradou.",
          tone: "positive",
        },
        {
          date: "Hoje",
          title: "Contrato ainda em mudança",
          body: "O ciclo continua aberto em outra dimensão.",
          tone: "neutral",
        },
      ],
    },
    context: {
      label: "Falar com o responsável",
      helper: "Quero adicionar contexto antes de decidir.",
      headline: "A leitura ficou mais clara sem transformar uso normal em saúde.",
      response: "Ohrly preserva o conflito entre sinais em vez de achatá-los em outro score.",
      timeline: [
        {
          date: "15 ago",
          title: "Mudança contratual apareceu",
          body: "Uso seguia dentro do padrão.",
          tone: "brand",
        },
        {
          date: "24 ago",
          title: "Contato com responsável",
          body: "Contexto registrado pelo time.",
          tone: "brand",
        },
        {
          date: "28 ago",
          title: "Uso continua normal",
          body: "Nenhuma ruptura comportamental relevante.",
          tone: "positive",
        },
        {
          date: "Hoje",
          title: "Mudança contratual persiste",
          body: "Ohrly mantém o ciclo em acompanhamento.",
          tone: "neutral",
        },
      ],
    },
    monitor: {
      label: "Só acompanhar por enquanto",
      helper: "Quero observar se outra dimensão muda.",
      headline: "O risco continua alto, mas a história permanece diferente da Acme.",
      response: "Ohrly acompanha o que muda sem presumir uma única experiência para todas as contas.",
      timeline: [
        {
          date: "15 ago",
          title: "Mudança contratual apareceu",
          body: "Uso seguia dentro do padrão.",
          tone: "brand",
        },
        {
          date: "24 ago",
          title: "Acompanhamento mantido",
          body: "Nenhuma intervenção registrada.",
          tone: "brand",
        },
        {
          date: "29 ago",
          title: "Uso permanece estável",
          body: "A relação não se degradou da mesma forma que a Acme.",
          tone: "positive",
        },
        {
          date: "Hoje",
          title: "Contrato ainda mudou",
          body: "O ciclo segue aberto.",
          tone: "neutral",
        },
      ],
    },
  },
};

function SignalRow({
  label,
  value,
  width,
  changed = false,
}: {
  label: string;
  value: string;
  width: string;
  changed?: boolean;
}) {
  return (
    <div className="grid grid-cols-[78px_1fr_auto] items-center gap-2.5 text-xs">
      <span className="font-bold text-[#59667e]">{label}</span>
      <div className="h-2 overflow-hidden rounded-full bg-[#edf1f6]">
        <span
          className={`block h-full rounded-full ${
            changed ? "bg-[#f43b35]" : "bg-[#1457ff]"
          }`}
          style={{ width }}
        />
      </div>
      <strong
        className={`text-[10px] ${
          changed ? "text-[#c8322d]" : "text-[#39455c]"
        }`}
      >
        {value}
      </strong>
    </div>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Etapa ${step + 1} de 4`}>
      {[0, 1, 2, 3].map((index) => (
        <span
          key={index}
          className={`h-1.5 w-8 rounded-full transition ${
            index <= step ? "bg-[#1457ff]" : "bg-[#e3e9f2]"
          }`}
        />
      ))}
    </div>
  );
}

export function CommercialDemoProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<DemoSource | null>(null);
  const [step, setStep] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState<AccountKey | null>(null);
  const [selectedAction, setSelectedAction] = useState<ActionKey | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const seenStepRef = useRef<Set<string>>(new Set());

  const activeAccount = selectedAccount ? accountCopy[selectedAccount] : null;
  const activeAction = useMemo(() => {
    if (!selectedAccount || !selectedAction) return null;
    return actionCopy[selectedAccount][selectedAction];
  }, [selectedAccount, selectedAction]);

  function openDemo(nextSource: DemoSource) {
    setSource(nextSource);
    setStep(0);
    setSelectedAccount(null);
    setSelectedAction(null);
    seenStepRef.current.clear();
    setIsOpen(true);

    void trackBehavior("commercial_demo_open", {
      demoId: "two_accounts_cycle_demo_v1",
      sourceCtaId: nextSource.ctaId,
      sourceLocation: nextSource.location,
      sourceLabel: nextSource.label,
    });
  }

  function closeDemo(reason: "button" | "backdrop" | "escape" | "lead_intent") {
    if (!isOpen) return;

    void trackBehavior("commercial_demo_close", {
      demoId: "two_accounts_cycle_demo_v1",
      sourceCtaId: source?.ctaId || null,
      sourceLocation: source?.location || null,
      reason,
      step,
      selectedAccount,
      selectedAction,
    });

    setIsOpen(false);
  }

  function moveTo(nextStep: number) {
    setStep(Math.max(0, Math.min(3, nextStep)));
  }

  function selectAccount(account: AccountKey) {
    setSelectedAccount(account);

    void trackBehavior("commercial_demo_account_selected", {
      demoId: "two_accounts_cycle_demo_v1",
      account,
      sourceCtaId: source?.ctaId || null,
      sourceLocation: source?.location || null,
    });

    moveTo(1);
  }

  function selectAction(action: ActionKey) {
    if (!selectedAccount) return;

    setSelectedAction(action);

    void trackBehavior("commercial_demo_intervention_selected", {
      demoId: "two_accounts_cycle_demo_v1",
      account: selectedAccount,
      action,
    });

    void trackBehavior("commercial_demo_response_view", {
      demoId: "two_accounts_cycle_demo_v1",
      account: selectedAccount,
      action,
    });
  }

  useEffect(() => {
    if (!isOpen) return;

    const key = `${source?.ctaId || "unknown"}:${step}`;
    if (seenStepRef.current.has(key)) return;
    seenStepRef.current.add(key);

    void trackBehavior("commercial_demo_step_view", {
      demoId: "two_accounts_cycle_demo_v1",
      step,
      selectedAccount,
      selectedAction,
      sourceCtaId: source?.ctaId || null,
      sourceLocation: source?.location || null,
    });

    if (step === 1) {
      void trackBehavior("commercial_demo_comparison_view", {
        demoId: "two_accounts_cycle_demo_v1",
        selectedAccount,
      });
    }

    if (step === 3) {
      void trackBehavior("commercial_demo_complete", {
        demoId: "two_accounts_cycle_demo_v1",
        selectedAccount,
        selectedAction,
      });
    }
  }, [isOpen, selectedAccount, selectedAction, source, step]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeDemo("escape");
    }

    window.addEventListener("keydown", onKeyDown);

    const frame = window.requestAnimationFrame(() => {
      panelRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(frame);
    };
  }, [isOpen]);

  return (
    <DemoContext.Provider value={{ openDemo }}>
      {children}

      {isOpen ? (
        <div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-[#091126]/60 backdrop-blur-[4px] sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDemo("backdrop");
          }}
        >
          <div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="commercial-demo-title"
            className="relative flex max-h-[96dvh] w-full flex-col overflow-hidden rounded-t-[28px] border border-[#dfe5f0] bg-[#f8fafc] shadow-[0_30px_100px_rgba(8,22,60,.30)] outline-none sm:max-w-[960px] sm:rounded-[28px]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[#e5eaf4] bg-white px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase tracking-[.13em] text-[#1457ff]">
                  Demo · menos de 1 minuto
                </div>
                <div id="commercial-demo-title" className="mt-1 truncate text-sm font-black text-[#101b35] sm:text-base">
                  Mesmo risco. Histórias diferentes.
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Progress step={step} />
                <button
                  type="button"
                  aria-label="Fechar demo"
                  onClick={() => closeDemo("button")}
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#e1e6ef] bg-[#f8faff] text-[#6f7b91] transition hover:bg-[#eef3ff] hover:text-[#101b35]"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto px-4 py-5 sm:px-7 sm:py-7">
              {step === 0 ? (
                <div className="mx-auto max-w-[760px]">
                  <div className="text-center">
                    <div className="text-[11px] font-black uppercase tracking-[.12em] text-[#8995a8]">
                      Seu health score sinalizou as duas
                    </div>
                    <h2 className="mt-2 text-[30px] font-black leading-[1.02] tracking-[-0.05em] text-[#101b35] sm:text-[42px]">
                      Qual você quer entender?
                    </h2>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {(["acme", "luma"] as AccountKey[]).map((accountKey) => {
                      const account = accountCopy[accountKey];
                      return (
                        <button
                          key={accountKey}
                          type="button"
                          onClick={() => selectAccount(accountKey)}
                          className="group rounded-[22px] border border-[#dfe5f0] bg-white p-5 text-left shadow-[0_12px_34px_rgba(25,45,90,.05)] transition hover:-translate-y-0.5 hover:border-[#9bb3ff] hover:shadow-[0_16px_42px_rgba(25,45,90,.09)]"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-[24px] font-black tracking-[-0.04em] text-[#101b35]">
                                {account.name}
                              </div>
                              <div className="mt-1 text-xs font-semibold text-[#7b879b]">
                                Health Score {account.score}
                              </div>
                            </div>
                            <span className="rounded-full bg-[#fff0ef] px-2.5 py-1 text-[9px] font-black text-[#d2332e]">
                              RISCO ALTO
                            </span>
                          </div>

                          <div className="mt-7 flex items-center justify-between rounded-xl border border-[#edf0f5] bg-[#fbfcfe] px-3.5 py-3 text-sm font-black text-[#101b35]">
                            O que está acontecendo aqui?
                            <ArrowRight size={15} className="text-[#1457ff] transition group-hover:translate-x-0.5" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="mx-auto max-w-[860px]">
                  <div className="text-center">
                    <div className="text-[11px] font-black uppercase tracking-[.12em] text-[#8995a8]">
                      Mesmo risco
                    </div>
                    <h2 className="mt-2 text-[30px] font-black leading-[1.02] tracking-[-0.05em] text-[#101b35] sm:text-[42px]">
                      Razões diferentes.
                    </h2>
                  </div>

                  <div className="mt-6 grid gap-3 lg:grid-cols-2">
                    {(["acme", "luma"] as AccountKey[]).map((accountKey) => {
                      const account = accountCopy[accountKey];
                      const isSelected = selectedAccount === accountKey;

                      return (
                        <div
                          key={accountKey}
                          className={`rounded-[22px] border bg-white p-5 shadow-[0_12px_34px_rgba(25,45,90,.05)] ${
                            isSelected ? "border-[#8aa8ff] ring-4 ring-[#edf3ff]" : "border-[#dfe5f0]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-[23px] font-black tracking-[-0.04em] text-[#101b35]">
                                {account.name}
                              </div>
                              <div className="mt-1 text-xs font-semibold text-[#7b879b]">
                                Health Score {account.score} · risco alto
                              </div>
                            </div>
                            {isSelected ? (
                              <span className="rounded-full bg-[#edf3ff] px-2.5 py-1 text-[9px] font-black text-[#1457ff]">
                                SUA ESCOLHA
                              </span>
                            ) : null}
                          </div>

                          <div className="mt-4 rounded-2xl border border-[#dfe7ff] bg-[linear-gradient(135deg,#eef3ff,#f8f6ff)] p-4">
                            <strong className="block text-sm font-black text-[#101b35]">
                              {account.summary}
                            </strong>
                            <span className="mt-1 block text-xs leading-5 text-[#68758f]">
                              {account.detail}
                            </span>
                          </div>

                          <div className="mt-4 space-y-3">
                            {account.signals.map((signal) => (
                              <SignalRow key={signal.label} {...signal} />
                            ))}
                          </div>

                          <div className="mt-4 grid gap-2 sm:grid-cols-2">
                            <div className="rounded-xl border border-[#e7ebf2] bg-[#fbfcfe] p-3">
                              <div className="text-[9px] font-black uppercase tracking-[.11em] text-[#8995a8]">
                                Esperado
                              </div>
                              <div className="mt-1 text-xs font-black leading-5 text-[#39455c]">
                                {account.expected}
                              </div>
                            </div>
                            <div className="rounded-xl border border-[#e7ebf2] bg-[#fbfcfe] p-3">
                              <div className="text-[9px] font-black uppercase tracking-[.11em] text-[#8995a8]">
                                Desejado
                              </div>
                              <div className="mt-1 text-xs font-black leading-5 text-[#39455c]">
                                {account.desired}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 flex justify-center">
                    <button
                      type="button"
                      onClick={() => moveTo(2)}
                      className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#1457ff] bg-[#1457ff] px-5 text-sm font-black text-white shadow-[0_12px_26px_rgba(20,87,255,.18)] transition hover:-translate-y-px hover:bg-[#0f49dc]"
                    >
                      Interagir com {activeAccount?.name || "a conta"}
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              ) : null}

              {step === 2 && selectedAccount && activeAccount ? (
                <div className="mx-auto max-w-[760px]">
                  <div className="text-center">
                    <div className="text-[11px] font-black uppercase tracking-[.12em] text-[#8995a8]">
                      {activeAccount.name} · ciclo em andamento
                    </div>
                    <h2 className="mt-2 text-[30px] font-black leading-[1.02] tracking-[-0.05em] text-[#101b35] sm:text-[42px]">
                      O que você faria agora?
                    </h2>
                  </div>

                  <div className="mt-6 grid gap-2.5">
                    {(Object.keys(actionCopy[selectedAccount]) as ActionKey[]).map((actionKey) => {
                      const action = actionCopy[selectedAccount][actionKey];
                      const active = selectedAction === actionKey;

                      return (
                        <button
                          key={actionKey}
                          type="button"
                          onClick={() => selectAction(actionKey)}
                          className={`rounded-2xl border p-4 text-left transition ${
                            active
                              ? "border-[#8aa8ff] bg-[#f3f6ff] ring-4 ring-[#edf3ff]"
                              : "border-[#dfe5f0] bg-white hover:border-[#b8c8f2]"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                                active ? "bg-[#1457ff] text-white" : "bg-[#edf1f6] text-[#8995a8]"
                              }`}
                            >
                              {active ? <Check size={12} strokeWidth={3} /> : null}
                            </span>
                            <div>
                              <div className="text-sm font-black text-[#101b35]">{action.label}</div>
                              <div className="mt-1 text-xs leading-5 text-[#7b879b]">{action.helper}</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {activeAction ? (
                    <div className="mt-5 rounded-[22px] border border-[#dfe5f0] bg-white p-5 shadow-[0_12px_34px_rgba(25,45,90,.05)]">
                      <div className="text-[10px] font-black uppercase tracking-[.12em] text-[#1457ff]">
                        O que acontece depois
                      </div>

                      <div className="mt-4 space-y-0">
                        {activeAction.timeline.map((item, index) => (
                          <div key={`${item.date}-${item.title}`} className="grid grid-cols-[28px_1fr] gap-3">
                            <div className="flex flex-col items-center">
                              <span
                                className={`mt-1.5 size-2.5 rounded-full ${
                                  item.tone === "positive"
                                    ? "bg-[#1f9b69]"
                                    : item.tone === "brand"
                                      ? "bg-[#1457ff]"
                                      : "bg-[#a8b4c6]"
                                }`}
                              />
                              {index < activeAction.timeline.length - 1 ? (
                                <span className="min-h-8 w-px flex-1 bg-[#e3e8f0]" />
                              ) : null}
                            </div>
                            <div className="pb-4">
                              <div className="text-[10px] font-black uppercase tracking-[.09em] text-[#8995a8]">
                                {item.date}
                              </div>
                              <div className="mt-0.5 text-sm font-black text-[#101b35]">{item.title}</div>
                              <div className="mt-0.5 text-xs leading-5 text-[#68758f]">{item.body}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-2xl bg-[#10182f] p-4 text-white">
                        <strong className="block text-sm font-black">{activeAction.headline}</strong>
                        <span className="mt-1 block text-xs leading-5 text-white/65">{activeAction.response}</span>
                      </div>
                    </div>
                  ) : null}

                  {activeAction ? (
                    <div className="mt-5 flex justify-center">
                      <button
                        type="button"
                        onClick={() => moveTo(3)}
                        className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#1457ff] bg-[#1457ff] px-5 text-sm font-black text-white shadow-[0_12px_26px_rgba(20,87,255,.18)] transition hover:-translate-y-px hover:bg-[#0f49dc]"
                      >
                        Continuar
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {step === 3 ? (
                <div className="mx-auto max-w-[680px] py-3 text-center sm:py-7">
                  <div className="text-[11px] font-black uppercase tracking-[.12em] text-[#1457ff]">
                    Agora sim
                  </div>
                  <h2 className="mt-2 text-[34px] font-black leading-[1.01] tracking-[-0.055em] text-[#101b35] sm:text-[50px]">
                    O que está acontecendo nas suas contas em risco?
                  </h2>
                  <p className="mx-auto mt-4 max-w-[560px] text-sm leading-6 text-[#68758f] sm:text-base">
                    Veja se o Ohrly encontra histórias que seu processo atual não consegue explicar sozinho.
                  </p>

                  <LeadFormIntentTrigger
                    ctaId="commercial_demo_lead_intent"
                    location="commercial_demo_complete"
                    label="Quero ver isso na minha carteira"
                    demoId="two_accounts_cycle_demo_v1"
                    entrySourceCtaId={source?.ctaId ?? null}
                    entrySourceLocation={source?.location ?? null}
                    selectedAccount={selectedAccount}
                    selectedAction={selectedAction}
                    onBeforeOpen={() => {
                      void trackBehavior("commercial_demo_lead_intent", {
                        demoId: "two_accounts_cycle_demo_v1",
                        selectedAccount,
                        selectedAction,
                        sourceCtaId: source?.ctaId || null,
                        sourceLocation: source?.location || null,
                      });

                      closeDemo("lead_intent");
                    }}
                    className="..."
                  >
                    Quero ver isso na minha carteira
                    <ArrowRight size={16} />
                  </LeadFormIntentTrigger>

                  <p className="mt-3 text-[11px] leading-5 text-[#8995a8]">
                    Só agora pedimos algumas informações sobre sua operação.
                  </p>
                </div>
              ) : null}
            </div>

            {step > 0 && step < 3 ? (
              <div className="flex items-center justify-between border-t border-[#e5eaf4] bg-white px-4 py-3 sm:px-6">
                <button
                  type="button"
                  onClick={() => moveTo(step - 1)}
                  className="rounded-xl px-3 py-2 text-xs font-black text-[#748097] transition hover:bg-[#f2f5fa] hover:text-[#101b35]"
                >
                  ← Voltar
                </button>
                <span className="text-[10px] font-semibold text-[#9aa5b6]">
                  Demo ilustrativa da proposta do Ohrly
                </span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </DemoContext.Provider>
  );
}

type CommercialDemoTriggerProps = {
  ctaId: string;
  location: string;
  label: string;
  className?: string;
  children: ReactNode;
};

export function CommercialDemoTrigger({
  ctaId,
  location,
  label,
  className,
  children,
}: CommercialDemoTriggerProps) {
  const context = useContext(DemoContext);

  if (!context) {
    throw new Error("CommercialDemoTrigger must be used inside CommercialDemoProvider");
  }

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => context.openDemo({ ctaId, location, label })}
      data-analytics-cta={ctaId}
      data-analytics-location={location}
      data-analytics-label={label}
      className={className}
    >
      {children}
    </button>
  );
}
