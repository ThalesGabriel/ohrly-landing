import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Ohrly",
  description:
    "Política de Privacidade do Ohrly para coleta e uso de dados em formulários, diagnósticos e comunicações comerciais.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <div className="mb-10">
          <a
            href="/pt/for-online-store"
            className="text-sm font-medium text-violet-700 hover:text-violet-900"
          >
            ← Voltar para o Ohrly
          </a>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-violet-700">
              Ohrly
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Política de Privacidade
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Esta Política de Privacidade explica como o Ohrly coleta, utiliza
              e protege informações fornecidas por pessoas interessadas em
              receber diagnósticos, conteúdos, contatos comerciais ou
              informações sobre nossos serviços.
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Última atualização: 07 de junho de 2026.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <PrivacySection title="1. Quem somos">
            <p>
              O Ohrly é uma solução que ajuda lojistas e empresas digitais a
              transformar dados simples da operação em leituras sobre possíveis
              atritos, perdas de continuidade, mensurabilidade, conversão,
              ticket, volume e outros comportamentos relevantes para decisão.
            </p>

            <p>
              Para fins desta política, “Ohrly”, “nós” ou “nosso” se referem ao
              projeto, site, formulários, comunicações e serviços associados à
              marca Ohrly.
            </p>
          </PrivacySection>

          <PrivacySection title="2. Quais dados podemos coletar">
            <p>
              Podemos coletar informações fornecidas diretamente por você em
              formulários, páginas, anúncios, mensagens ou contatos comerciais,
              incluindo:
            </p>

            <ul>
              <li>nome;</li>
              <li>e-mail;</li>
              <li>telefone ou WhatsApp;</li>
              <li>nome da loja ou empresa;</li>
              <li>segmento de atuação;</li>
              <li>plataforma utilizada pela loja;</li>
              <li>faixa aproximada de faturamento;</li>
              <li>respostas sobre desafios, objetivos ou dores da operação;</li>
              <li>arquivos, relatórios ou dados que você decida enviar voluntariamente.</li>
            </ul>

            <p>
              Também podemos coletar dados técnicos básicos de navegação, como
              páginas acessadas, origem do acesso, dispositivo, navegador,
              eventos de conversão e interações com campanhas, quando essas
              informações estiverem disponíveis por ferramentas de analytics,
              pixels ou plataformas de anúncios.
            </p>
          </PrivacySection>

          <PrivacySection title="3. Como usamos seus dados">
            <p>Usamos os dados coletados para:</p>

            <ul>
              <li>entrar em contato com você sobre o diagnóstico solicitado;</li>
              <li>avaliar se o Ohrly pode ajudar no contexto informado;</li>
              <li>orientar quais dados ou arquivos podem ser enviados para análise;</li>
              <li>preparar uma leitura inicial ou diagnóstico gratuito, quando aplicável;</li>
              <li>responder dúvidas, solicitações ou mensagens;</li>
              <li>melhorar nossos anúncios, páginas, formulários e comunicações;</li>
              <li>enviar informações sobre o Ohrly, conteúdos, ofertas ou próximos passos relacionados ao serviço.</li>
            </ul>

            <p>
              O envio de um formulário não obriga você a contratar qualquer
              serviço. O diagnóstico gratuito, quando oferecido, pode depender
              da disponibilidade, qualidade dos dados enviados e aderência do
              caso ao escopo do Ohrly.
            </p>
          </PrivacySection>

          <PrivacySection title="4. Dados enviados para diagnóstico">
            <p>
              Caso você envie arquivos, relatórios, planilhas, CSVs ou
              informações operacionais da sua loja, esses dados serão usados
              para realizar a análise solicitada e entender quais leituras podem
              ser geradas a partir deles.
            </p>

            <p>
              Recomendamos que você não envie dados sensíveis ou informações
              desnecessárias para a análise. Quando possível, remova ou oculte
              dados excessivos antes do envio.
            </p>

            <p>
              O Ohrly não promete recuperação garantida de receita, aumento
              garantido de vendas ou identificação definitiva de causa raiz. As
              análises têm caráter diagnóstico, interpretativo e orientado à
              decisão.
            </p>
          </PrivacySection>

          <PrivacySection title="5. Compartilhamento de dados">
            <p>
              Não vendemos seus dados pessoais. Podemos compartilhar informações
              apenas quando necessário para operar nossos serviços, responder
              solicitações ou cumprir obrigações legais.
            </p>

            <p>Isso pode incluir ferramentas de:</p>

            <ul>
              <li>hospedagem do site;</li>
              <li>formulários e automação de contato;</li>
              <li>e-mail e comunicação;</li>
              <li>analytics e mensuração de campanhas;</li>
              <li>plataformas de anúncios, como Meta Ads ou Google Ads.</li>
            </ul>

            <p>
              Esses fornecedores podem tratar dados conforme suas próprias
              políticas e termos, sempre dentro dos limites necessários para a
              execução das finalidades descritas nesta política.
            </p>
          </PrivacySection>

          <PrivacySection title="6. Cookies, pixels e tecnologias semelhantes">
            <p>
              Podemos usar cookies, pixels, tags e tecnologias semelhantes para
              entender como as pessoas interagem com nosso site, medir campanhas,
              melhorar páginas e acompanhar conversões.
            </p>

            <p>
              Essas tecnologias podem coletar dados como origem da visita,
              páginas acessadas, cliques, dispositivo, navegador e eventos de
              formulário. Você pode ajustar permissões de cookies diretamente no
              seu navegador ou nas configurações das plataformas utilizadas.
            </p>
          </PrivacySection>

          <PrivacySection title="7. Base legal para tratamento">
            <p>
              Tratamos dados pessoais com base em fundamentos previstos na Lei
              Geral de Proteção de Dados Pessoais (LGPD), incluindo consentimento
              quando você envia voluntariamente um formulário, execução de
              procedimentos preliminares relacionados a uma possível contratação,
              legítimo interesse para comunicação e melhoria dos serviços, e
              cumprimento de obrigações legais quando aplicável.
            </p>
          </PrivacySection>

          <PrivacySection title="8. Armazenamento e segurança">
            <p>
              Mantemos os dados pelo tempo necessário para cumprir as finalidades
              descritas nesta política, prestar atendimento, realizar análises,
              manter histórico comercial razoável ou cumprir obrigações legais.
            </p>

            <p>
              Adotamos medidas razoáveis para proteger as informações contra
              acesso não autorizado, perda, uso indevido, alteração ou divulgação
              indevida. Ainda assim, nenhum sistema é completamente imune a
              riscos.
            </p>
          </PrivacySection>

          <PrivacySection title="9. Seus direitos">
            <p>
              Você pode solicitar, conforme aplicável pela LGPD:
            </p>

            <ul>
              <li>confirmação sobre o tratamento dos seus dados;</li>
              <li>acesso aos dados pessoais tratados;</li>
              <li>correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>eliminação de dados pessoais, quando cabível;</li>
              <li>revogação de consentimento;</li>
              <li>informações sobre compartilhamento;</li>
              <li>oposição ao tratamento em determinadas situações.</li>
            </ul>
          </PrivacySection>

          <PrivacySection title="10. Contato">
            <p>
              Para dúvidas, solicitações ou pedidos relacionados a esta Política
              de Privacidade, entre em contato pelo e-mail:
            </p>

            <p>
              <a
                href="mailto:contato@ohrly.com.br"
                className="font-semibold text-violet-700 hover:text-violet-900"
              >
                contato@ohrly.com.br
              </a>
            </p>

            <p>
              Caso você utilize outro e-mail oficial para o Ohrly, substitua este
              endereço antes de publicar a página.
            </p>
          </PrivacySection>

          <PrivacySection title="11. Alterações nesta política">
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente para
              refletir mudanças no produto, nas ferramentas utilizadas, nas
              práticas de tratamento de dados ou em exigências legais.
            </p>

            <p>
              A versão mais recente estará sempre disponível nesta página.
            </p>
          </PrivacySection>
        </div>
      </section>
    </main>
  );
}

function PrivacySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-semibold tracking-tight text-slate-950">
        {title}
      </h2>

      <div className="prose prose-slate mt-4 max-w-none prose-p:leading-7 prose-li:my-1 prose-a:no-underline">
        {children}
      </div>
    </section>
  );
}