'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Container } from '../container';

export function Comparison() {
  const t = useTranslations('comparison');

  return (
    <section className="bg-white pb-24 text-black">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#7c4dff]">
              {t('badge')}
            </p>

            <h2 className="text-4xl font-semibold leading-tight">
              {t('title')}
            </h2>
          </div>

          <div className="overflow-hidden rounded-3xl border border-black/10">
            <div className="grid grid-cols-2 bg-[#fafafa] p-5 font-semibold">
              <span>{t('traditional')}</span>
              <span className="text-[#6d5cff]">ohrly</span>
            </div>

            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="grid grid-cols-2 border-t border-black/10 p-5"
              >
                <div className="flex items-center gap-3 text-black/60">
                  <XCircle className="h-5 w-5 text-black/30" />
                  {t(`rows.${index}.traditional`)}
                </div>

                <div className="flex items-center gap-3 font-medium text-[#6d5cff]">
                  <CheckCircle2 className="h-5 w-5" />
                  {t(`rows.${index}.ohrly`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}