import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidade — Ohrly",
  description:
    "Saiba como o Ohrly coleta, utiliza, armazena e protege informações pessoais.",
};

const LAST_UPDATED = "1º de setembro de 2026";

/*
 * Antes de publicar:
 * confirme que este endereço existe e é monitorado.
 */
const PRIVACY_EMAIL = "privacidade@ohrly.com.br";

function Brand() {
  return (
    <div className="flex items-center gap-2.5 text-[22px] font-black tracking-[-0.04em] text-[#0b0d12]">
      <svg
        viewBox="0 0 44 44"
        aria-hidden="true"
        className="h-[34px] w-[34px]"
      >
        <circle
          cx="19"
          cy="22"
          r="12"
          fill="none"
          stroke="#3568f5"
          strokeWidth="7"
        />
        <path
          d="M18 23h7l3-9 4 17 4-11 3 7h5"
          fill="none"
          stroke="#e43b32"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Ohrly
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-[#e7e9ef] py-8 first:border-t-0 first:pt-0">
      <h2 className="text-[22px] font-black tracking-[-0.035em] text-[#0b0d12] sm:text-[26px]">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-[1.7] text-[#555e6b]">
        {children}
      </div>
    </section>
  );
}

function BulletList({ children }: { children: ReactNode }) {
  return (
    <ul className="space-y-2 pl-5 [list-style-type:disc] marker:text-[#3568f5]">
      {children}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-[#0b0d12]">
      <header className="sticky top-0 z-50 border-b border-[#e7e9ef]/80 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[70px] w-[min(1040px,calc(100%_-_32px))] items-center justify-between gap-4">
          <Link href="/" aria-label="Ohrly">
            <Brand />
          </Link>

          <Link
            href="/"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#e7e9ef] bg-white px-4 text-[13px] font-extrabold text-[#0b0d12] transition hover:-translate-y-px"
          >
            <ArrowLeft size={14} />
            Voltar ao site
          </Link>
        </div>
      </header>

      <main>
        <section className="border-b border-[#e7e9ef] bg-[#f6f8fc] py-12 sm:py-16">
          <div className="mx-auto w-[min(860px,calc(100%_-_32px))]">
            <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold uppercase tracking-[.08em] text-[#3568f5]">
              <span className="h-[3px] w-6 rounded-full bg-[#3568f5]" />
              Privacidade
            </div>

            <h1 className="mt-4 text-[40px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[54px]">
              Política de Privacidade
            </h1>

            <p className="mt-5 max-w-[720px] text-[16px] leading-[1.65] text-[#555e6b]">
              Esta política explica como o Ohrly coleta, utiliza, armazena e
              compartilha informações pessoais quando você acessa nosso site,
              responde pesquisas ou formulários e entra em contato conosco.
            </p>

            <p className="mt-4 text-[13px] font-semibold text-[#7a8390]">
              Última atualização: {LAST_UPDATED}
            </p>
          </div>
        </section>

        <div className="mx-auto w-[min(860px,calc(100%_-_32px))] py-10 sm:py-14">
          <div className="mb-10 rounded-[20px] border border-[#dfe7ff] bg-[#f4f7ff] p-5 text-[14px] leading-[1.6] text-[#31415f]">
            <strong className="text-[#0b0d12]">Resumo:</strong> usamos os dados
            fornecidos para operar o site, realizar pesquisas, entender problemas
            relacionados a Customer Success, renovação e churn, desenvolver o
            Ohrly e entrar em contato quando você autorizar ou solicitar. Não
            vendemos seus dados pessoais.
          </div>

          <Section title="1. Quem somos">
            <p>
              O Ohrly é um projeto de software em desenvolvimento voltado à
              compreensão de mudanças em relações B2B, especialmente em
              contextos de Customer Success, retenção e renovação.
            </p>
            <p>
              Para assuntos relacionados a privacidade e proteção de dados, você
              pode entrar em contato pelo e-mail{" "}
              <a
                href={`mailto:${PRIVACY_EMAIL}`}
                className="font-bold text-[#3568f5] underline underline-offset-4"
              >
                {PRIVACY_EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section title="2. Quais informações podemos coletar">
            <p>Dependendo da sua interação com o Ohrly, podemos coletar:</p>

            <BulletList>
              <li>nome, e-mail profissional e empresa;</li>
              <li>
                respostas fornecidas voluntariamente em pesquisas e formulários;
              </li>
              <li>
                informações relacionadas ao seu contexto profissional, quando
                você decidir fornecê-las;
              </li>
              <li>
                dados técnicos e de navegação, como páginas acessadas, eventos de
                interação, tipo de dispositivo, origem da visita e parâmetros de
                campanha;
              </li>
              <li>
                identificadores técnicos utilizados para analytics, segurança e
                mensuração de campanhas, quando aplicável.
              </li>
            </BulletList>

            <p>
              Evite incluir em campos abertos dados pessoais desnecessários,
              informações confidenciais de clientes ou qualquer informação que
              você não esteja autorizado a compartilhar.
            </p>
          </Section>

          <Section title="3. Como utilizamos as informações">
            <p>Podemos utilizar as informações coletadas para:</p>

            <BulletList>
              <li>operar, manter e melhorar o site e nossos formulários;</li>
              <li>
                entender como profissionais e times lidam com renovação, churn,
                risco e relacionamento com clientes;
              </li>
              <li>
                realizar pesquisa e validação de hipóteses para o desenvolvimento
                do Ohrly;
              </li>
              <li>
                analisar respostas de forma individual ou agregada para gerar
                aprendizados;
              </li>
              <li>
                entrar em contato quando você solicitar, autorizar ou demonstrar
                interesse em continuar a conversa;
              </li>
              <li>medir desempenho de campanhas e experiências do site;</li>
              <li>prevenir abuso, fraude e incidentes de segurança;</li>
              <li>cumprir obrigações legais e regulatórias aplicáveis.</li>
            </BulletList>
          </Section>

          <Section title="4. Pesquisas e formulários">
            <p>
              Algumas campanhas do Ohrly podem direcionar você para pesquisas ou
              formulários com perguntas sobre experiências profissionais, como
              renovação, churn, Health Score, relacionamento com stakeholders e
              processos de Customer Success.
            </p>

            <p>
              Essas respostas são usadas para pesquisa e desenvolvimento do
              produto. Podemos consolidar respostas e produzir análises
              agregadas, mas não publicaremos informações identificando você ou
              sua empresa sem autorização.
            </p>

            <p>
              Responder uma pesquisa não significa, por si só, que você concorda
              em receber contato comercial. Quando houver uma pergunta específica
              sobre contato posterior, respeitaremos a opção escolhida.
            </p>
          </Section>

          <Section title="5. Compartilhamento de informações">
            <p>
              Não vendemos seus dados pessoais. Podemos compartilhar informações
              com prestadores de serviço necessários para operar nossa
              infraestrutura, formulários, analytics, hospedagem e campanhas.
            </p>

            <p>
              Esses provedores podem incluir, conforme os serviços efetivamente
              utilizados pelo Ohrly, plataformas de publicidade, hospedagem,
              banco de dados, analytics, e-mail e outros fornecedores técnicos.
            </p>

            <p>
              Também poderemos compartilhar informações quando isso for
              necessário para cumprir obrigação legal, ordem de autoridade
              competente ou proteger direitos, segurança e integridade do Ohrly e
              de seus usuários.
            </p>
          </Section>

          <Section title="6. Dados de campanhas e analytics">
            <p>
              Podemos utilizar ferramentas de analytics e plataformas de
              publicidade para entender origem de visitas, engajamento com
              páginas, cliques, abertura de formulários e outros eventos de
              navegação.
            </p>

            <p>
              Quando exigido, tecnologias de medição e marketing serão utilizadas
              de acordo com as escolhas de consentimento apresentadas no site.
            </p>
          </Section>

          <Section title="7. Retenção e segurança">
            <p>
              Mantemos dados pessoais pelo período necessário para cumprir as
              finalidades descritas nesta política, atender obrigações legais,
              resolver disputas e preservar a segurança da operação.
            </p>

            <p>
              Adotamos medidas técnicas e organizacionais razoáveis para reduzir
              riscos de acesso não autorizado, perda, alteração ou divulgação
              indevida. Nenhum sistema, entretanto, pode garantir segurança
              absoluta.
            </p>
          </Section>

          <Section title="8. Seus direitos">
            <p>
              Nos termos da legislação aplicável, incluindo a Lei Geral de
              Proteção de Dados Pessoais (LGPD), você pode solicitar informações
              e exercer direitos relacionados aos seus dados pessoais.
            </p>

            <p>Dependendo do caso, isso pode incluir pedidos de:</p>

            <BulletList>
              <li>confirmação da existência de tratamento;</li>
              <li>acesso aos dados;</li>
              <li>correção de dados incompletos ou incorretos;</li>
              <li>informação sobre uso e compartilhamento;</li>
              <li>
                anonimização, bloqueio ou eliminação quando aplicável;
              </li>
              <li>revogação de consentimento, quando essa for a base utilizada;</li>
              <li>
                oposição ou outras solicitações previstas pela legislação
                aplicável.
              </li>
            </BulletList>

            <p>
              Para exercer esses direitos, escreva para{" "}
              <a
                href={`mailto:${PRIVACY_EMAIL}`}
                className="font-bold text-[#3568f5] underline underline-offset-4"
              >
                {PRIVACY_EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section title="9. Links e serviços de terceiros">
            <p>
              Nosso site e nossas campanhas podem utilizar ou direcionar para
              serviços de terceiros, como formulários hospedados em plataformas
              externas. Esses serviços possuem suas próprias políticas e práticas
              de privacidade.
            </p>
          </Section>

          <Section title="10. Transferências internacionais">
            <p>
              Alguns fornecedores de tecnologia utilizados pelo Ohrly podem
              armazenar ou processar informações fora do Brasil. Quando isso
              ocorrer, buscamos utilizar fornecedores e mecanismos compatíveis
              com a legislação aplicável de proteção de dados.
            </p>
          </Section>

          <Section title="11. Alterações nesta política">
            <p>
              Podemos atualizar esta Política de Privacidade para refletir
              mudanças no produto, nas ferramentas utilizadas ou em requisitos
              legais. A versão mais recente estará disponível nesta página com a
              respectiva data de atualização.
            </p>
          </Section>

          <Section title="12. Contato">
            <p>
              Se você tiver dúvidas sobre esta política ou sobre o tratamento de
              seus dados pessoais pelo Ohrly, entre em contato pelo e-mail{" "}
              <a
                href={`mailto:${PRIVACY_EMAIL}`}
                className="font-bold text-[#3568f5] underline underline-offset-4"
              >
                {PRIVACY_EMAIL}
              </a>
              .
            </p>
          </Section>

          <div className="mt-4 rounded-[20px] border border-[#e7e9ef] bg-[#fbfcfe] p-5 text-[12px] leading-[1.6] text-[#747d89]">
            Este texto foi preparado como uma política de privacidade operacional
            para o estágio atual do Ohrly. Antes de publicar, confirme se os
            fornecedores, canais de contato e práticas descritos correspondem ao
            que está efetivamente em uso.
          </div>
        </div>
      </main>

      <footer className="border-t border-[#e7e9ef] py-8">
        <div className="mx-auto flex w-[min(1040px,calc(100%_-_32px))] flex-col items-start justify-between gap-4 text-[12px] text-[#727a86] sm:flex-row sm:items-center">
          <Brand />
          <div>© 2026 Ohrly</div>
        </div>
      </footer>
    </div>
  );
}
