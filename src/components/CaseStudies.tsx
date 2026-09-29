import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  ExternalLink,
  Link,
  Smartphone,
  Sparkles,
  Video,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { caseStudies, corePillars } from '../caseStudies.ts'
import type { CaseStudyId, CaseTone } from '../caseStudies.ts'
import { cx } from '../lib/cx.ts'
import { easeOut } from '../lib/motion.ts'
import { ChannelSplit } from './ChannelSplit.tsx'
import { SignatureEntrance, SignatureItem } from './SignatureMotion.tsx'

type Selection = 'none' | CaseStudyId

const toneCard: Record<
  CaseTone,
  { border: string; gradient: string; badge: string; cta: string }
> = {
  purple: {
    border: 'border-purple-200 hover:border-purple-500',
    gradient: 'bg-gradient-to-br from-purple-900/10 via-purple-50/50 to-slate-100/80 hover:from-purple-950/15',
    badge: 'bg-purple-900 text-white',
    cta: 'bg-purple-900 group-hover:bg-purple-950',
  },
  green: {
    border: 'border-emerald-200 hover:border-emerald-500',
    gradient: 'bg-gradient-to-br from-emerald-900/10 via-emerald-50/50 to-slate-100/80 hover:from-emerald-950/15',
    badge: 'bg-emerald-900 text-white',
    cta: 'bg-emerald-900 group-hover:bg-emerald-950',
  },
  navy: {
    border: 'border-slate-300 hover:border-slate-600',
    gradient: 'bg-gradient-to-br from-slate-900/10 via-slate-50/50 to-slate-100/80 hover:from-slate-900/15',
    badge: 'bg-slate-900 text-white',
    cta: 'bg-slate-900 group-hover:bg-slate-950',
  },
  split: {
    border: 'border-purple-300 hover:border-purple-600',
    gradient: 'bg-gradient-to-br from-purple-900/10 via-emerald-50/30 to-slate-100/80 hover:from-purple-950/15',
    badge: 'bg-purple-900 text-white',
    cta: 'bg-purple-900 group-hover:bg-purple-950',
  },
}

export function CaseStudies() {
  const [selected, setSelected] = useState<Selection>('none')
  const reduce = useReducedMotion()
  const active = caseStudies.find((item) => item.id === selected)

  useEffect(() => {
    if (selected === 'none') return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('case-studies')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [selected])

  return (
    <section id="case-studies" className="relative border-t border-slate-200 bg-white px-5 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto w-full max-w-[1600px]">
        <AnimatePresence mode="wait" initial={false}>
          {selected === 'none' || !active ? (
            <motion.div
              key="overview"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: easeOut }}
            >
              <p className="inline-flex rounded-full border border-purple-300 bg-white px-4 py-2 text-sm font-medium text-purple-950 shadow-sm">
                [ PROOF OF CONCEPT: BRAND &amp; FOUNDER AUTHORITY ]
              </p>
              <h2 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Brands &amp; Founders Who Scale Through Content Authority.
              </h2>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-slate-50 px-4 py-2 text-base font-medium text-purple-950">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Real-World Case Studies &amp; Execution Models
              </p>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
                Select a case study below to inspect their visual strategy, engagement mechanics, and audience
                impact.
              </p>

              <SignatureEntrance className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {caseStudies.map((study) => {
                  const tone = toneCard[study.tone]
                  return (
                    <SignatureItem key={study.id}>
                      <button
                        type="button"
                        onClick={() => setSelected(study.id)}
                        className={cx(
                          'group relative flex min-h-[22rem] w-full cursor-pointer flex-col overflow-hidden rounded-3xl border p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md sm:p-7',
                          tone.border,
                          tone.gradient,
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25 transition-opacity duration-300 group-hover:opacity-40"
                        />
                        <span className="relative flex h-full flex-col">
                          <span className={cx('inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold', tone.badge)}>
                            {study.badge}
                          </span>
                          <span className="mt-6 block text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                            {study.title}
                          </span>
                          <span className="mt-3 block text-base font-medium leading-snug text-slate-700 sm:text-lg">
                            {study.subtext}
                          </span>
                          <span
                            className={cx(
                              'mt-auto inline-flex w-fit items-center rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-300',
                              tone.cta,
                            )}
                          >
                            Inspect Strategy →
                          </span>
                        </span>
                      </button>
                    </SignatureItem>
                  )
                })}
              </SignatureEntrance>

              <div className="mt-12 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  The 4 Core Content Pillars
                </p>
                <SignatureEntrance className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {corePillars.map((pillar) => (
                    <SignatureItem key={pillar.id}>
                      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-900" aria-hidden="true" />
                          <div>
                            <p className="text-base font-semibold text-slate-900">{pillar.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">{pillar.copy}</p>
                          </div>
                        </div>
                      </div>
                    </SignatureItem>
                  ))}
                </SignatureEntrance>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: easeOut }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSelected('none')}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-base font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                  Back to Case Studies
                </button>
                <p className={cx('rounded-full px-3 py-1 text-xs font-semibold text-white', toneCard[active.tone].badge)}>
                  {active.badge}
                </p>
              </div>

              <h2 className="mt-8 max-w-5xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {active.showcaseTitle}
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-slate-700 sm:text-xl">{active.subtext}</p>

              {active.id === 'hamza-bhatti' ? (
                <div className="mt-10">
                  <ChannelSplit />
                  {active.story && (
                    <p className="mt-8 max-w-4xl text-lg leading-relaxed text-slate-800 sm:text-xl">{active.story}</p>
                  )}
                </div>
              ) : active.proofs && active.proofs.length > 0 ? (
                <div className="mt-10">
                  <div
                    className={cx(
                      'grid gap-5 sm:grid-cols-2',
                      active.proofs.length >= 3 && 'lg:grid-cols-3',
                    )}
                  >
                    {active.proofs.map((proof) => (
                      <figure
                        key={proof.src}
                        className={cx(
                          'overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-sm',
                          active.tone === 'green'
                            ? 'border border-emerald-200'
                            : active.tone === 'navy'
                              ? 'border border-slate-300'
                              : 'border border-purple-200',
                        )}
                      >
                        <img src={proof.src} alt={proof.alt} className="h-auto w-full rounded-[1.1rem] object-contain" />
                      </figure>
                    ))}
                  </div>
                  {active.story && (
                    <p className="mt-8 max-w-4xl text-lg leading-relaxed text-slate-800 sm:text-xl">{active.story}</p>
                  )}
                </div>
              ) : (
              <div className="mt-10 grid gap-5 lg:grid-cols-2">
                <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-900 text-white">
                      <Video className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Section 1</p>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                    {active.hook.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-slate-700">{active.hook.copy}</p>
                </article>

                <article className="rounded-3xl border border-purple-200 bg-purple-50/40 p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-purple-900 text-white">
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-purple-900">Section 2</p>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                    {active.visual.title}
                  </h3>
                  <div className="mt-5 flex min-h-[16rem] items-center justify-center rounded-2xl border border-dashed border-purple-300 bg-slate-200/80 p-6">
                    <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      {active.visual.caption}
                    </p>
                  </div>
                </article>

                <article className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-900 text-white">
                      <Smartphone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-900">Section 3</p>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                    Platform Execution
                  </h3>
                  <div className="mt-5 grid gap-4">
                    <div className="rounded-2xl border border-emerald-200 bg-white p-4">
                      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-purple-950">
                        <Smartphone className="h-4 w-4" aria-hidden="true" />
                        Instagram
                      </p>
                      <p className="mt-2 text-base leading-relaxed text-slate-700">{active.platforms.instagram}</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-200 bg-white p-4">
                      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-900">
                        <Link className="h-4 w-4" aria-hidden="true" />
                        LinkedIn
                      </p>
                      <p className="mt-2 text-base leading-relaxed text-slate-700">{active.platforms.linkedin}</p>
                    </div>
                  </div>
                </article>

                <article className="rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50/70 via-white to-emerald-50/50 p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-purple-900 text-white">
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-purple-950">Section 4</p>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                    Replicable Agency Takeaway
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-slate-800">{active.takeaway}</p>
                </article>
              </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
