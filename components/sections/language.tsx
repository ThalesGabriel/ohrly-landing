import { useTranslations } from 'next-intl';
import { Container } from '../container';
import { Code2, BarChart3, Users, CircleDollarSign, ArrowRight } from 'lucide-react';

const icons = [Code2, BarChart3, Users, CircleDollarSign];

export function OperationalLanguage() {
  const t = useTranslations('language');

  return (
    <section className="bg-white pb-20 text-black">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr_1fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#7c4dff]">
              {t('badge')}
            </p>

            <h2 className="text-3xl font-semibold">
              {t('title')}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-black/5 bg-[#fafafa] p-6 md:grid-cols-4">
            {[0, 1, 2, 3].map((index) => {
              const Icon = icons[index];

              return (
                <div key={index} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                    <Icon className="h-7 w-7 text-[#6d5cff]" />
                  </div>

                  <h3 className="mt-4 font-semibold">
                    {t(`teams.${index}.name`)}
                  </h3>

                  <p className="mt-1 text-sm text-black/50">
                    {t(`teams.${index}.description`)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="rounded-3xl bg-[#050816] p-8 text-white">
            <p className="text-sm text-white/50">
              {t('resultLabel')}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-semibold text-[#8c52ff]">
                {t('result')}
              </span>

              <ArrowRight className="h-5 w-5 text-[#45f882]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}