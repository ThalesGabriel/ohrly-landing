'use client';

import { useTranslations } from 'next-intl';
import { Container } from '../container';

export function Focus() {
  const t = useTranslations('focus');

  return (
    <section className="bg-white pb-20 text-white">
      <Container>
        <div className="rounded-[32px] bg-[#050816] p-8 shadow-2xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-[#45f882]">
            {t('badge')}
          </p>

          <div className="grid gap-5 lg:grid-cols-4">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="text-lg font-semibold">
                  {t(`cards.${index}.title`)}
                </h3>

                <p className="mt-2 text-sm text-white/50">
                  {t(`cards.${index}.description`)}
                </p>

                <div className="mt-8 h-12 rounded-xl bg-gradient-to-r from-[#45f882]/10 via-[#7c4dff]/20 to-[#ff7a59]/10" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}