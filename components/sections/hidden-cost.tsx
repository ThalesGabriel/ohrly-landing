'use client';

import { useTranslations } from 'next-intl';
import { Container } from '../container';
import { Clock, Users, CircleDollarSign } from 'lucide-react';

const icons = [Clock, Users, CircleDollarSign];

export function HiddenCost() {
  const t = useTranslations('hiddenCost');

  return (
    <section className="bg-white pb-20 text-black">
      <Container>
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#7c4dff]">
          {t('badge')}
        </p>

        <h2 className="max-w-5xl text-3xl font-semibold leading-tight lg:text-5xl">
          {t('title1')}{' '}
          <span className="text-[#6d5cff]">{t('title2')}</span>
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[0, 1, 2].map((index) => {
            const Icon = icons[index];

            return (
              <div
                key={index}
                className="rounded-3xl border border-black/5 bg-[#fafafa] p-8"
              >
                <Icon className="h-10 w-10 text-[#7c4dff]" />

                <h3 className="mt-6 text-xl font-semibold">
                  {t(`cards.${index}.title`)}
                </h3>

                <p className="mt-3 text-black/60">
                  {t(`cards.${index}.description`)}
                </p>

                <div className="mt-8 h-10 rounded-xl bg-gradient-to-r from-[#7c4dff]/20 via-[#7c4dff]/5 to-[#7c4dff]/20" />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}