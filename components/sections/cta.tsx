'use client';

import { useTranslations } from 'next-intl';
import { Container } from '../container';
import { ArrowRight, Activity } from 'lucide-react';

export function CTA() {
  const t = useTranslations('cta');

  return (
    <section className="bg-white pb-8 text-white">
      <Container>
        <div className="rounded-[32px] bg-[#050816] p-10 shadow-2xl lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="flex gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#45f882] to-[#7c4dff]">
                <Activity className="h-8 w-8" />
              </div>

              <h2 className="text-4xl font-semibold leading-tight">
                {t('title1')}{' '}
                <span className="text-[#45f882]">
                  {t('title2')}
                </span>
              </h2>
            </div>

            <div>
              <p className="text-lg text-white/60">
                {t('description')}
              </p>

              <button className="mt-8 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7c4dff] to-[#45f882] px-7 py-4 font-medium">
                {t('button')}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}