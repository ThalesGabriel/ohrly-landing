"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

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

const Check = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4 shrink-0"
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

const fieldClass =
  "mt-2 w-full rounded-xl border border-[#d7e1dd] bg-[#fbfcfa] px-3.5 py-3 text-sm text-[#153d3e] outline-none transition placeholder:text-[#9aabaa] focus:border-[#7ca7a2] focus:ring-4 focus:ring-[#0d6867]/[0.06]";

type Compatibility = {
  checked: boolean;
  compatible: boolean;
  missing: string[];
  detected: string[];
};

const aliases: Record<string, string[]> = {
  customer: [
    "customer_id",
    "customerid",
    "cliente",
    "cliente_id",
    "id_cliente",
    "client_id",
  ],
  service: [
    "service",
    "service_name",
    "servico",
    "serviço",
    "procedimento",
    "produto_servico",
  ],
  date: [
    "appointment_date",
    "date",
    "data",
    "data_atendimento",
    "data_do_atendimento",
    "created_at",
  ],
  status: [
    "status",
    "appointment_status",
    "situacao",
    "situação",
    "status_atendimento",
  ],
  value: [
    "value",
    "valor",
    "amount",
    "total",
    "preco",
    "preço",
    "valor_total",
  ],
};

const humanName: Record<string, string> = {
  customer: "cliente",
  service: "serviço",
  date: "data",
  status: "status",
  value: "valor",
};

function normalizeHeader(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^\w]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

function splitHeader(line: string) {
  const candidates = [",", ";", "\t", "|"];
  const separator = candidates
    .map((sep) => ({ sep, count: line.split(sep).length }))
    .sort((a, b) => b.count - a.count)[0].sep;

  return line.split(separator).map(normalizeHeader).filter(Boolean);
}

export default function EarlyAccessPage() {
  const [file, setFile] = useState<File | null>(null);
  const [checking, setChecking] = useState(false);
  const [compatibility, setCompatibility] = useState<Compatibility>({
    checked: false,
    compatible: false,
    missing: [],
    detected: [],
  });

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [operation, setOperation] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const canContinue = useMemo(
    () =>
      compatibility.compatible &&
      name.trim().length > 1 &&
      whatsapp.trim().length >= 8 &&
      operation.trim().length > 1,
    [compatibility.compatible, name, whatsapp, operation],
  );

  async function checkFile() {
    if (!file) return;

    setChecking(true);
    setCompatibility({
      checked: false,
      compatible: false,
      missing: [],
      detected: [],
    });

    try {
      if (!file.name.toLowerCase().endsWith(".csv")) {
        setCompatibility({
          checked: true,
          compatible: false,
          missing: ["arquivo CSV"],
          detected: [],
        });
        return;
      }

      const text = await file.text();
      const firstLine = text.split(/\r?\n/)[0] ?? "";
      const headers = splitHeader(firstLine);

      const detected: string[] = [];
      const missing: string[] = [];

      Object.entries(aliases).forEach(([key, values]) => {
        const normalizedAliases = values.map(normalizeHeader);
        const found = headers.some((header) =>
          normalizedAliases.includes(header),
        );

        if (found) detected.push(humanName[key]);
        else missing.push(humanName[key]);
      });

      setCompatibility({
        checked: true,
        compatible: missing.length === 0,
        missing,
        detected,
      });
    } finally {
      setChecking(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canContinue || !file) return;

    setSending(true);

    try {
      /*
       * Integração esperada:
       * 1. Enviar o arquivo + dados do lead para o seu backend.
       * 2. O backend persiste o upload.
       * 3. O backend devolve a URL do checkout.
       *
       * Exemplo:
       *
       * const body = new FormData();
       * body.append("file", file);
       * body.append("name", name);
       * body.append("whatsapp", whatsapp);
       * body.append("operation", operation);
       *
       * const response = await fetch("/api/early-access", {
       *   method: "POST",
       *   body,
       * });
       *
       * const data = await response.json();
       * window.location.href = data.checkoutUrl;
       *
       * Enquanto a API/checkout não estiverem conectados, mantemos
       * uma confirmação local para testar a experiência da página.
       */

      await new Promise((resolve) => setTimeout(resolve, 500));
      setSent(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f6f2] text-[#0d2f31] antialiased">
      <header className="border-b border-[#dfe8e4]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="font-serif text-[28px] tracking-[-0.035em] text-[#0b3537]"
            aria-label="Ohrly"
          >
            Ohrly
          </Link>

          <Link
            href="/demo"
            className="text-sm font-medium text-[#557270] transition hover:text-[#0b3537]"
          >
            Ver exemplo primeiro
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 lg:px-10 lg:pb-24 lg:pt-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#edb3a7] bg-[#fff7f3] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-[#d55f49]">
            Primeiro ciclo Ohrly
          </div>

          <h1 className="mt-7 font-serif text-[44px] leading-[1.02] tracking-[-0.045em] sm:text-[56px]">
            Comece verificando se o seu histórico pode ser analisado.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#456364]">
            A checagem é gratuita. Se o arquivo tiver os dados mínimos, você
            pode seguir para a primeira leitura completa por{" "}
            <span className="font-semibold text-[#0d2f31]">R$ 297</span>.
          </p>

          <div className="mt-8 space-y-4">
            {[
              ["1", "Envie um CSV exportado do seu sistema"],
              ["2", "Nós verificamos os campos mínimos"],
              ["3", "Se estiver tudo certo, você decide se quer avançar"],
              ["4", "A primeira leitura inclui uma atualização posterior"],
            ].map(([number, text]) => (
              <div key={number} className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#c7d6d1] text-xs font-semibold text-[#557270]">
                  {number}
                </div>
                <p className="pt-0.5 text-sm leading-6 text-[#607978]">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[#d8e2dd] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#91a4a1]">
              O que procuramos no arquivo
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["cliente", "serviço", "data", "status", "valor"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#d8e2dd] bg-[#f7f8f5] px-3 py-1.5 text-xs text-[#355657]"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-4 text-xs leading-5 text-[#78908e]">
              Idealmente, o histórico possui pelo menos 12 meses e clientes
              identificados de forma consistente.
            </p>
          </div>
        </div>

        <div>
          <div className="rounded-[28px] border border-[#d9e2de] bg-white p-6 shadow-[0_18px_60px_rgba(13,47,49,0.07)] sm:p-8">
            {!sent ? (
              <>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#e16f58]">
                    Etapa 1
                  </p>
                  <h2 className="mt-2 font-serif text-3xl tracking-[-0.035em]">
                    Verifique seu arquivo
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#607978]">
                    O arquivo não é enviado ao servidor nesta checagem local.
                    Primeiro olhamos apenas os nomes das colunas do CSV.
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-dashed border-[#c8d5d1] bg-[#fafcfb] p-5">
                  <label className="block cursor-pointer">
                    <span className="text-sm font-medium text-[#153d3e]">
                      Selecione um arquivo CSV
                    </span>
                    <span className="mt-1 block text-xs text-[#78908e]">
                      Exportação do Trinks ou de outro sistema com histórico de
                      atendimentos.
                    </span>

                    <input
                      type="file"
                      accept=".csv,text/csv"
                      className="mt-4 block w-full text-xs text-[#607978] file:mr-4 file:rounded-lg file:border-0 file:bg-[#e9f3f1] file:px-4 file:py-2.5 file:text-xs file:font-semibold file:text-[#0d6867] hover:file:bg-[#dcece9]"
                      onChange={(event) => {
                        const next = event.target.files?.[0] ?? null;
                        setFile(next);
                        setCompatibility({
                          checked: false,
                          compatible: false,
                          missing: [],
                          detected: [],
                        });
                      }}
                    />
                  </label>

                  <button
                    type="button"
                    disabled={!file || checking}
                    onClick={checkFile}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d6867] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0a5c5b] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {checking ? "Verificando..." : "Verificar compatibilidade"}
                    {!checking && <Arrow />}
                  </button>
                </div>

                {compatibility.checked && compatibility.compatible && (
                  <div className="mt-5 rounded-2xl border border-[#b9d8c8] bg-[#f1f8f4] p-5">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-[#39755a]">
                        <Check />
                      </span>

                      <div>
                        <p className="font-medium text-[#285d47]">
                          Seu arquivo parece compatível.
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[#55756a]">
                          Encontramos os campos mínimos para avançar para a
                          validação completa do histórico.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {compatibility.checked && !compatibility.compatible && (
                  <div className="mt-5 rounded-2xl border border-[#f0c8be] bg-[#fff7f3] p-5">
                    <p className="font-medium text-[#9b4d3d]">
                      Ainda faltam alguns dados.
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#7a5f59]">
                      Não conseguimos identificar:{" "}
                      <span className="font-medium">
                        {compatibility.missing.join(", ")}
                      </span>
                      .
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#91746d]">
                      Se o seu arquivo usa nomes diferentes, isso não significa
                      necessariamente que ele seja inválido. Você pode falar com
                      a gente para verificarmos manualmente.
                    </p>
                  </div>
                )}

                {compatibility.compatible && (
                  <form onSubmit={handleSubmit} className="mt-8 border-t border-[#e3e9e6] pt-7">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#e16f58]">
                          Etapa 2
                        </p>
                        <h3 className="mt-2 font-serif text-2xl tracking-[-0.03em]">
                          Prepare o primeiro ciclo
                        </h3>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-[#78908e]">Primeiro ciclo</p>
                        <p className="text-2xl font-semibold tracking-[-0.035em]">
                          R$ 297
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <label className="block text-xs font-medium text-[#526d6c]">
                        Seu nome
                        <input
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          autoComplete="name"
                          placeholder="Como podemos chamar você?"
                          className={fieldClass}
                        />
                      </label>

                      <label className="block text-xs font-medium text-[#526d6c]">
                        WhatsApp
                        <input
                          value={whatsapp}
                          onChange={(event) => setWhatsapp(event.target.value)}
                          type="tel"
                          autoComplete="tel"
                          placeholder="(81) 99999-9999"
                          className={fieldClass}
                        />
                      </label>

                      <label className="block text-xs font-medium text-[#526d6c]">
                        Nome da operação
                        <input
                          value={operation}
                          onChange={(event) => setOperation(event.target.value)}
                          placeholder="Ex.: Studio Aurora"
                          className={fieldClass}
                        />
                      </label>
                    </div>

                    <div className="mt-6 rounded-2xl bg-[#f7f8f5] p-4">
                      <p className="text-xs font-medium text-[#526d6c]">
                        O primeiro ciclo inclui
                      </p>
                      <div className="mt-3 space-y-2">
                        {[
                          "Leitura do histórico",
                          "Principais oportunidades encontradas",
                          "Clientes e valor historicamente associado",
                          "Uma atualização posterior para acompanhar a evolução",
                        ].map((item) => (
                          <div key={item} className="flex items-center gap-2 text-xs text-[#607978]">
                            <span className="text-[#0d7773]">
                              <Check />
                            </span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!canContinue || sending}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0d6867] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0a5c5b] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {sending ? "Preparando..." : "Continuar para pagamento"}
                      {!sending && <Arrow />}
                    </button>

                    <p className="mt-4 text-center text-[11px] leading-5 text-[#8a9c9a]">
                      A cobrança só deve acontecer depois que o backend confirmar
                      o upload e gerar a URL do checkout.
                    </p>
                  </form>
                )}

                {!compatibility.compatible && (
                  <div className="mt-6 text-center">
                    <Link
                      href="/demo"
                      className="text-sm font-medium text-[#557270] underline decoration-[#bdcbc7] underline-offset-4"
                    >
                      Ver um exemplo antes
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="py-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f4ef] text-[#39755a]">
                  <Check />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#e16f58]">
                  Fluxo preparado
                </p>

                <h2 className="mt-2 font-serif text-3xl tracking-[-0.035em]">
                  Agora é só conectar o checkout.
                </h2>

                <p className="mt-4 text-sm leading-6 text-[#607978]">
                  Esta versão já valida o CSV no navegador e coleta os dados
                  necessários. Para produção, o próximo passo é conectar o POST
                  do formulário ao seu backend e redirecionar para o provedor de
                  pagamento.
                </p>

                <div className="mt-6 rounded-2xl border border-[#d8e2dd] bg-[#f7f8f5] p-5">
                  <p className="text-xs text-[#78908e]">Arquivo</p>
                  <p className="mt-1 text-sm font-medium text-[#153d3e]">
                    {file?.name}
                  </p>

                  <p className="mt-4 text-xs text-[#78908e]">Operação</p>
                  <p className="mt-1 text-sm font-medium text-[#153d3e]">
                    {operation}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-medium text-[#557270] underline decoration-[#bdcbc7] underline-offset-4"
                >
                  Voltar
                </button>
              </div>
            )}
          </div>

          <p className="mt-5 text-center text-xs leading-5 text-[#78908e]">
            Para o primeiro ciclo, não é necessário instalar nada nem trocar de
            sistema.
          </p>
        </div>
      </section>

      <section className="border-t border-[#dfe8e4]">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
            Antes de enviar
          </p>

          <h2 className="mt-4 text-center font-serif text-4xl tracking-[-0.04em]">
            Perguntas rápidas
          </h2>

          <div className="mt-10 divide-y divide-[#dfe8e4] border-y border-[#dfe8e4]">
            {[
              {
                q: "Meu arquivo precisa ter exatamente esses nomes de coluna?",
                a: "Não. A verificação automática reconhece alguns nomes comuns. Se seu relatório usa outros nomes, podemos revisar manualmente.",
              },
              {
                q: "O arquivo já é enviado quando eu clico em verificar?",
                a: "Não nesta implementação. A checagem dos nomes das colunas acontece localmente no navegador.",
              },
              {
                q: "Posso enviar Excel em vez de CSV?",
                a: "Esta primeira versão automática aceita CSV. Se o Trinks exportar XLSX, você pode converter para CSV ou usar a revisão manual até adicionarmos suporte direto.",
              },
              {
                q: "Quando pago os R$ 297?",
                a: "Somente depois de o arquivo passar pela validação completa e o backend gerar o checkout.",
              },
            ].map((item) => (
              <details key={item.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-medium text-[#153d3e]">
                  <span>{item.q}</span>
                  <span className="text-xl font-light text-[#78908e] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="max-w-3xl pt-4 text-sm leading-6 text-[#607978]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#dfe8e4]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-[#78908e] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <span className="font-serif text-lg text-[#294849]">Ohrly</span>
          <span>Seu histórico primeiro. Integração depois.</span>
        </div>
      </footer>
    </main>
  );
}

