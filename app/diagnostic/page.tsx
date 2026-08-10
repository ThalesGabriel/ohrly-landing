"use client";

import { ChangeEvent, DragEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import SiteHeader from "../components/SiteHeader";

type UploadState = "idle" | "checking" | "valid" | "invalid";
type CommitmentStep = "commitment" | "contact" | "success";

type ValidationResult = {
    months: number;
    appointments: number;
    clients: number;
    services: number;
    professionals: number;
};

const MOCK_RESULT: ValidationResult = {
    months: 14,
    appointments: 1842,
    clients: 436,
    services: 21,
    professionals: 8,
};

const Arrow = () => (
    <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
    >
        <path
            d="M5 12h14M14 7l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const UploadIcon = () => (
    <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="none"
    >
        <path
            d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14.5V18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const Check = ({ className = "h-4 w-4" }: { className?: string }) => (
    <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={className}
        fill="none"
    >
        <path
            d="m5 12.5 4.1 4.1L19 6.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const Lock = () => (
    <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
    >
        <rect
            x="5"
            y="10"
            width="14"
            height="10"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
        />
        <path
            d="M8 10V7a4 4 0 0 1 8 0v3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
        />
    </svg>
);

const FileIcon = () => (
    <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
    >
        <path
            d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
        />
        <path
            d="M14 3v5h4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
        />
    </svg>
);


const CloseIcon = () => (
    <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
    >
        <path
            d="M6 6l12 12M18 6 6 18"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
        />
    </svg>
);

const Spinner = () => (
    <svg
        className="h-5 w-5 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
    >
        <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="2"
            className="opacity-20"
        />
        <path
            d="M21 12a9 9 0 0 0-9-9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

const requirements = [
    {
        title: "Datas dos atendimentos",
        body: "Para entender quando os clientes retornam e como esse ritmo muda.",
    },
    {
        title: "Clientes",
        body: "Um identificador é suficiente. Não precisamos do nome real da pessoa.",
    },
    {
        title: "Serviços e valores",
        body: "Para relacionar comportamento, recorrência e relevância econômica.",
    },
    {
        title: "Profissionais, quando disponíveis",
        body: "Ajuda a entender contextos diferentes dentro da mesma operação.",
    },
];

export default function DiagnosticUploadPage() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [state, setState] = useState<UploadState>("idle");
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [result, setResult] = useState<ValidationResult | null>(null);

    const [isCommitmentOpen, setIsCommitmentOpen] = useState(false);
    const [commitmentStep, setCommitmentStep] = useState<CommitmentStep>("commitment");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const fileSize = useMemo(() => {
        if (!file) return null;

        if (file.size < 1024 * 1024) {
            return `${Math.max(1, Math.round(file.size / 1024))} KB`;
        }

        return `${(file.size / 1024 / 1024).toFixed(1)} MB`;
    }, [file]);

    const isAcceptedFile = (candidate: File) => {
        const name = candidate.name.toLowerCase();
        return name.endsWith(".csv") || name.endsWith(".xlsx");
    };

    const validateFile = async (candidate: File) => {
        setFile(candidate);
        setResult(null);

        if (!isAcceptedFile(candidate)) {
            setState("invalid");
            return;
        }

        setState("checking");

        // TODO: substituir por chamada real ao endpoint de preflight.
        // Exemplo:
        // const formData = new FormData();
        // formData.append("file", candidate);
        // const response = await fetch("/api/diagnostico/preflight", {
        //   method: "POST",
        //   body: formData,
        // });
        // const data = await response.json();

        await new Promise((resolve) => setTimeout(resolve, 1200));

        setResult(MOCK_RESULT);
        setState("valid");
    };

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const candidate = event.target.files?.[0];
        if (candidate) validateFile(candidate);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const candidate = event.dataTransfer.files?.[0];
        if (candidate) validateFile(candidate);
    };

    const resetUpload = () => {
        setFile(null);
        setResult(null);
        setState("idle");

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const openCommitmentModal = () => {
        setCommitmentStep("commitment");
        setEmail("");
        setEmailError("");
        setIsCommitmentOpen(true);
    };

    const closeCommitmentModal = () => {
        setIsCommitmentOpen(false);
    };

    const confirmPriceCommitment = () => {
        // Aqui você pode registrar o evento `pilot_price_commitment`
        // no seu analytics antes de avançar para o contato.
        setCommitmentStep("contact");
    };

    const submitPilotContact = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const normalizedEmail = email.trim();
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

        if (!isValidEmail) {
            setEmailError("Digite um e-mail válido.");
            return;
        }

        setEmailError("");

        // TODO: Persistir o compromisso + e-mail.
        // Exemplo:
        // await fetch("/api/piloto/commitment", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     email: normalizedEmail,
        //     price: 297,
        //     fileName: file?.name,
        //   }),
        // });

        setCommitmentStep("success");
    };

    useEffect(() => {
        if (!isCommitmentOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeCommitmentModal();
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isCommitmentOpen]);

    return (
        <main className="min-h-screen bg-[#f7f6f2] text-[#0d2f31] antialiased">
            <SiteHeader />

            {/* HERO */}
            <section className="mx-auto max-w-7xl px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:px-10 lg:pb-16 lg:pt-30">
                <div className="grid grid-cols-[2fr_1fr] gap-5">
                    <div className="max-w-3xl flex flex-col justify-center">
                        <div>
                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#edb3a7] bg-[#fff7f3] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-[#d55f49]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#e7775f]" />
                                Agora olhamos para a sua operação
                            </div>
                        </div>
                        <h1 className="max-w-4xl font-serif text-[44px] leading-[1.02] tracking-[-0.045em]">
                            Vamos descobrir quanto do seu próximo mês já pode ser explicado.
                        </h1>

                        <p className="mt-7 max-w-3xl text-lg leading-8 text-[#294849] sm:text-xl">
                            Envie o histórico da sua operação. Antes de qualquer análise,
                            verificamos se existe informação suficiente para produzir uma
                            leitura confiável.
                        </p>

                        <p className="mt-4 max-w-3xl text-sm leading-6 text-[#6c8382]">
                            Você não precisa configurar métricas, definir frequência de retorno
                            ou ensinar quais combinações “fazem sentido”. É justamente isso que
                            o Ohrly tenta aprender a partir do histórico.
                        </p>
                    </div>

                    <div className="rounded-[26px] border border-[#d8e2dd] bg-white p-6 mt-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#78908e]">
                            O que precisamos encontrar
                        </p>

                        <div className="mt-5 space-y-5">
                            {requirements.map((item) => (
                                <div key={item.title}>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-1 text-[#0d7773]">
                                            <Check />
                                        </span>

                                        <div>
                                            <p className="text-sm font-semibold text-[#294849]">
                                                {item.title}
                                            </p>
                                            <p className="mt-1 text-xs leading-5 text-[#78908e]">
                                                {item.body}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </section>

            {/* UPLOAD */}
            <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
                    <div>
                        <div
                            onDragEnter={(event) => {
                                event.preventDefault();
                                setIsDragging(true);
                            }}
                            onDragOver={(event) => {
                                event.preventDefault();
                                setIsDragging(true);
                            }}
                            onDragLeave={(event) => {
                                event.preventDefault();
                                setIsDragging(false);
                            }}
                            onDrop={handleDrop}
                            className={[
                                "relative rounded-[30px] border-2 border-dashed bg-white p-7 transition sm:p-10",
                                isDragging
                                    ? "border-[#0d7773] bg-[#f3f8f6]"
                                    : state === "invalid"
                                        ? "border-[#df8d7d]"
                                        : state === "valid"
                                            ? "border-[#8ab7ae]"
                                            : "border-[#cbd9d4]",
                            ].join(" ")}
                        >
                            <input
                                ref={inputRef}
                                type="file"
                                accept=".csv,.xlsx"
                                className="hidden"
                                onChange={handleInput}
                            />

                            {state === "idle" && (
                                <div className="flex min-h-[310px] flex-col items-center justify-center text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f0ed] text-[#0d6867]">
                                        <UploadIcon />
                                    </div>

                                    <h2 className="mt-6 font-serif text-3xl tracking-[-0.035em]">
                                        Envie seu histórico do Trinks
                                    </h2>

                                    <p className="mt-3 max-w-md text-sm leading-6 text-[#607978]">
                                        Arraste o arquivo até aqui ou selecione no seu computador.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => inputRef.current?.click()}
                                        className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#0d6867] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0a5c5b]"
                                    >
                                        Selecionar arquivo
                                    </button>

                                    <p className="mt-4 text-xs text-[#8a9c9a]">
                                        CSV ou XLSX
                                    </p>
                                </div>
                            )}

                            {state === "checking" && file && (
                                <div className="flex min-h-[310px] flex-col items-center justify-center text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f0ed] text-[#0d6867]">
                                        <Spinner />
                                    </div>

                                    <h2 className="mt-6 font-serif text-3xl tracking-[-0.035em]">
                                        Primeiro, estamos verificando o histórico.
                                    </h2>

                                    <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#dfe8e4] bg-[#f7f9f7] px-4 py-3 text-left">
                                        <span className="text-[#557270]">
                                            <FileIcon />
                                        </span>
                                        <div>
                                            <p className="max-w-[260px] truncate text-sm font-medium text-[#294849]">
                                                {file.name}
                                            </p>
                                            <p className="mt-0.5 text-xs text-[#8a9c9a]">
                                                {fileSize}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="mt-5 max-w-md text-sm leading-6 text-[#607978]">
                                        Procurando histórico, clientes, serviços, valores e
                                        consistência suficiente para a análise.
                                    </p>
                                </div>
                            )}

                            {state === "invalid" && file && (
                                <div className="flex min-h-[310px] flex-col items-center justify-center text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0eb] text-[#c95e49]">
                                        <FileIcon />
                                    </div>

                                    <h2 className="mt-6 font-serif text-3xl tracking-[-0.035em]">
                                        Não conseguimos usar este arquivo.
                                    </h2>

                                    <p className="mt-3 max-w-md text-sm leading-6 text-[#607978]">
                                        Neste primeiro piloto, aceitamos arquivos CSV ou XLSX
                                        exportados com o histórico da operação.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={resetUpload}
                                        className="mt-6 inline-flex items-center justify-center rounded-2xl border border-[#cbd9d4] bg-white px-6 py-3.5 text-sm font-semibold text-[#294849] transition hover:bg-[#f3f6f4]"
                                    >
                                        Escolher outro arquivo
                                    </button>
                                </div>
                            )}

                            {state === "valid" && result && file && (
                                <div>
                                    <div className="flex flex-col gap-5 border-b border-[#e2eae6] pb-3   sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <div className="inline-flex items-center gap-2 rounded-full bg-[#e8f2ee] px-3 py-1.5 text-xs font-semibold text-[#0d6867]">
                                                <Check />
                                                Histórico compatível
                                            </div>

                                            <h2 className="mt-4 font-serif text-3xl tracking-[-0.035em]">
                                                Seu histórico parece suficiente para uma análise.
                                            </h2>

                                            <p className="mt-3 max-w-xl text-sm leading-6 text-[#607978]">
                                                Antes de cobrar qualquer coisa, queríamos saber se
                                                conseguimos realmente trabalhar com estes dados.
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={resetUpload}
                                            className="text-left text-xs font-medium text-[#607978] underline decoration-[#bccdc7] underline-offset-4 transition hover:text-[#294849]"
                                        >
                                            Trocar arquivo
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-[#dfe8e4] bg-[#dfe8e4] mt-7 sm:grid-cols-5">
                                        {[
                                            [String(result.months), "meses"],
                                            [result.appointments.toLocaleString("pt-BR"), "atendimentos"],
                                            [result.clients.toLocaleString("pt-BR"), "clientes"],
                                            [String(result.services), "serviços"],
                                            [String(result.professionals), "profissionais"],
                                        ].map(([value, label]) => (
                                            <div
                                                key={label}
                                                className="bg-[#f8faf8] px-4 py-5 text-center"
                                            >
                                                <p className="text-2xl font-semibold tracking-[-0.04em] text-[#0d2f31]">
                                                    {value}
                                                </p>
                                                <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[#78908e]">
                                                    {label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-7 space-y-3">
                                        {[
                                            "Há histórico suficiente para observar retornos ao longo do tempo.",
                                            "Há volume suficiente para comparar comportamentos em diferentes períodos.",
                                            "Conseguimos relacionar atendimentos, serviços e valores.",
                                        ].map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-start gap-3 text-sm leading-6 text-[#456364]"
                                            >
                                                <span className="mt-1 text-[#0d7773]">
                                                    <Check />
                                                </span>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {state !== "valid" && (
                            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#dfe8e4] bg-[#f1f5f2] px-4 py-4">
                                <span className="mt-0.5 text-[#557270]">
                                    <Lock />
                                </span>

                                <div>
                                    <p className="text-sm font-medium text-[#294849]">
                                        Nenhuma cobrança acontece nesta etapa.
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-[#718886]">
                                        Primeiro verificamos se o histórico é suficiente. Só depois
                                        mostramos a opção de continuar com a análise de R$297.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* LATERAL */}
                    <aside className="space-y-5">


                        <div className="rounded-[26px] border border-[#d8e2dd] bg-[#0d3435] p-6 text-[#f7f6f2]">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#96c8c0]">
                                <Lock />
                            </div>

                            <h3 className="mt-5 font-serif text-2xl tracking-[-0.025em]">
                                O Ohrly precisa do comportamento, não da identidade.
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-[#c8d6d3]">
                                Não precisamos saber quem é Maria ou João para entender quando
                                eles costumam voltar.
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[#c8d6d3]">
                                Um identificador consistente do cliente já é suficiente para
                                aprender recorrência, compras e mudanças de comportamento.
                            </p>
                        </div>

                        <div className="rounded-[26px] border border-[#d8e2dd] bg-[#fff8f5] p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c96c59]">
                                Sem configuração do negócio
                            </p>

                            <p className="mt-3 font-serif text-2xl leading-snug tracking-[-0.025em] text-[#5c3f39]">
                                Você não precisa dizer com quantos dias um cliente “deveria”
                                voltar.
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[#775f59]">
                                O histórico serve justamente para que o Ohrly aprenda como
                                retorno, compra e recorrência acontecem na sua própria operação.
                            </p>
                        </div>
                    </aside>
                </div>

                {state === "valid" && (
                    <div className="mt-8 rounded-[22px] border border-[#d8e2dd] bg-[#f3f7f5] p-5 sm:p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#78908e]">
                            Podemos analisar esta operação
                        </p>

                        <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="font-serif text-2xl tracking-[-0.03em]">
                                    Próxima etapa: análise completa
                                </p>
                                <p className="mt-2 max-w-lg text-sm leading-6 text-[#607978]">
                                    Vamos estimar quanto do próximo mês já está coberto,
                                    o que ainda deveria vir da sua base e onde existem
                                    situações que merecem uma decisão.
                                </p>
                            </div>

                            <div className="shrink-0 sm:text-right">
                                <p className="text-xs uppercase tracking-[0.09em] text-[#78908e]">
                                    Piloto
                                </p>
                                <p className="mt-1 text-3xl font-semibold tracking-[-0.04em]">
                                    R$297
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={openCommitmentModal}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0d6867] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0a5c5b]"
                        >
                            Continuar com a análise
                            <Arrow />
                        </button>
                    </div>
                )}
            </section>


            {isCommitmentOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#092728]/45 px-4 py-8 backdrop-blur-[2px]"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeCommitmentModal();
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="commitment-modal-title"
                        className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-[#d8e2dd] bg-[#f7f6f2] shadow-[0_28px_90px_rgba(13,47,49,0.25)]"
                    >
                        <button
                            type="button"
                            onClick={closeCommitmentModal}
                            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#d8e2dd] bg-white text-[#607978] transition hover:text-[#0d2f31]"
                            aria-label="Fechar"
                        >
                            <CloseIcon />
                        </button>

                        {commitmentStep === "commitment" && (
                            <div className="p-7 sm:p-9">
                                <div className="inline-flex items-center gap-2 rounded-full bg-[#e8f2ee] px-3 py-1.5 text-xs font-semibold text-[#0d6867]">
                                    <Check />
                                    Seu histórico pode ser analisado
                                </div>

                                <h2
                                    id="commitment-modal-title"
                                    className="mt-5 max-w-md font-serif text-3xl leading-tight tracking-[-0.035em] text-[#0d2f31]"
                                >
                                    A análise do Ohrly custa R$297.
                                </h2>

                                <p className="mt-4 text-sm leading-6 text-[#607978]">
                                    Neste piloto inicial, ainda não estamos realizando a cobrança
                                    automaticamente.
                                </p>

                                <p className="mt-3 text-sm leading-6 text-[#607978]">
                                    Se você faria essa análise por esse valor, registre sua intenção.
                                    Isso nos ajuda a validar o produto enquanto preparamos as
                                    primeiras análises reais.
                                </p>

                                <div className="mt-7 rounded-[22px] border border-[#d8e2dd] bg-white p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#78908e]">
                                        Piloto Ohrly
                                    </p>

                                    <div className="mt-2 flex items-end justify-between gap-4">
                                        <p className="text-4xl font-semibold tracking-[-0.045em] text-[#0d2f31]">
                                            R$297
                                        </p>
                                        <span className="pb-1 text-xs text-[#78908e]">
                                            nenhuma cobrança agora
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={confirmPriceCommitment}
                                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0d6867] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0a5c5b]"
                                >
                                    Quero fazer minha análise por esse valor
                                    <Arrow />
                                </button>

                                <p className="mt-4 text-center text-xs leading-5 text-[#78908e]">
                                    Nenhuma cobrança será feita agora.
                                </p>
                            </div>
                        )}

                        {commitmentStep === "contact" && (
                            <form onSubmit={submitPilotContact} className="p-7 sm:p-9">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f2ee] text-[#0d6867]">
                                    <Check className="h-5 w-5" />
                                </div>

                                <h2
                                    id="commitment-modal-title"
                                    className="mt-5 max-w-md font-serif text-3xl leading-tight tracking-[-0.035em] text-[#0d2f31]"
                                >
                                    Intenção registrada.
                                </h2>

                                <p className="mt-4 text-sm leading-6 text-[#607978]">
                                    Nenhuma cobrança foi realizada. Para associarmos este histórico
                                    à sua intenção de participar do piloto, precisamos apenas de um
                                    e-mail.
                                </p>

                                <label
                                    htmlFor="pilot-email"
                                    className="mt-7 block text-xs font-semibold uppercase tracking-[0.1em] text-[#607978]"
                                >
                                    E-mail
                                </label>

                                <input
                                    id="pilot-email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                        if (emailError) setEmailError("");
                                    }}
                                    placeholder="voce@empresa.com"
                                    autoFocus
                                    className={[
                                        "mt-2 w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-[#0d2f31] outline-none transition placeholder:text-[#9aabaa]",
                                        emailError
                                            ? "border-[#d77a67] focus:border-[#c95e49]"
                                            : "border-[#cbd9d4] focus:border-[#0d7773]",
                                    ].join(" ")}
                                />

                                {emailError && (
                                    <p className="mt-2 text-xs text-[#c95e49]">
                                        {emailError}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0d6867] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0a5c5b]"
                                >
                                    Registrar minha análise
                                    <Arrow />
                                </button>

                                <p className="mt-4 text-center text-xs leading-5 text-[#78908e]">
                                    Usaremos este e-mail apenas para identificar sua análise e avisar
                                    quando o piloto estiver disponível. Nenhuma cobrança será feita
                                    sem sua confirmação.
                                </p>
                            </form>
                        )}

                        {commitmentStep === "success" && (
                            <div className="p-7 text-center sm:p-9">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f2ee] text-[#0d6867]">
                                    <Check className="h-6 w-6" />
                                </div>

                                <h2
                                    id="commitment-modal-title"
                                    className="mt-5 font-serif text-3xl leading-tight tracking-[-0.035em] text-[#0d2f31]"
                                >
                                    Sua análise foi registrada.
                                </h2>

                                <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#607978]">
                                    Guardamos sua intenção de participar do piloto por R$297.
                                    Nenhuma cobrança foi realizada.
                                </p>

                                <button
                                    type="button"
                                    onClick={closeCommitmentModal}
                                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-[#cbd9d4] bg-white px-6 py-4 text-sm font-semibold text-[#294849] transition hover:bg-[#f3f6f4]"
                                >
                                    Fechar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <footer className="border-t border-[#dfe8e4]">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-[#78908e] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
                    <span className="font-serif text-lg text-[#294849]">Ohrly</span>
                    <span>Se os dados não sustentarem a análise, paramos antes da cobrança.</span>
                </div>
            </footer>
        </main>
    );
}