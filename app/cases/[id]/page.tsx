import Emlurb from "./Emlurb";
import FraudCaseStudyPage from "./Fraud";

type CaseDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const cases = {
    "central-156-emlurb": {
        title: "Degradação operacional em RPAs",
        description:
            "Como sinais persistentes de degradação revelaram uma janela de decisão antes do impacto operacional se tornar estrutural.",
    },
    "fraud-case-study": {
        title: "Janela de decisão em pagamentos",
        description:
            "Como pequenas variações em tempo de aprovação podem antecipar degradações invisíveis para métricas tradicionais.",
    },
};

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
    const { id } = await params;
    const caseItem = cases[id as keyof typeof cases];

    if (!caseItem) {
        return (
            <main className="min-h-screen bg-[#040917] px-6 py-32 text-white">
                <div className="mx-auto max-w-4xl">
                    <h1 className="text-3xl font-bold">Caso não encontrado</h1>
                    <p className="mt-4 text-slate-400">
                        O estudo de caso que você está tentando acessar não existe.
                    </p>
                </div>
            </main>
        );
    }

    if(id === 'central-156-emlurb')
        return <Emlurb/>

    if(id === 'fraud-case-study')
        return <FraudCaseStudyPage/>

    return (
        <main className="min-h-screen bg-[#040917] px-6 py-32 text-white">
            <article className="mx-auto max-w-4xl">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
                    Caso de estudo
                </p>

                <h1 className="mt-4 text-4xl font-bold md:text-6xl">
                    {caseItem.title}
                </h1>

                <p className="mt-6 text-lg leading-8 text-slate-300">
                    {caseItem.description}
                </p>
            </article>
        </main>
    );
}