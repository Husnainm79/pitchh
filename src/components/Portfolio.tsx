import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  MessageCircle,
  Target,
  TrendingUp,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { brandNotes, brands, pillars } from '../portfolio.ts'
import type { BrandId } from '../portfolio.ts'
import { cx } from '../lib/cx.ts'
import { easeOut } from '../lib/motion.ts'
import {
  BusinessVisuals,
  HadiCreativeVisuals,
  HadiReachVisuals,
  InspiredVisuals,
  ReachVisuals,
} from './InspiredVisuals.tsx'
import { SignatureEntrance, SignatureItem } from './SignatureMotion.tsx'

type Selection = 'none' | BrandId

const pillarIcon: Record<(typeof pillars)[number]['id'], LucideIcon> = {
  creative: Layers,
  reach: TrendingUp,
  engagement: MessageCircle,
}

const pillarAccent: Record<(typeof pillars)[number]['id'], string> = {
  creative: 'bg-slate-800 text-slate-100',
  reach: 'bg-violet-950 text-violet-100',
  engagement: 'bg-emerald-950 text-emerald-100',
}

export function Portfolio() {
  const [selectedBrand, setSelectedBrand] = useState<Selection>('none')
  const [pillarIndex, setPillarIndex] = useState(0)
  const reduce = useReducedMotion()
  const active = brands.find((brand) => brand.id === selectedBrand)
  const visiblePillars =
    active?.id === 'hadi-elearning' ? pillars.filter((item) => item.id !== 'engagement') : pillars
  const pillar = visiblePillars[pillarIndex] ?? visiblePillars[0]

  function openBrand(id: BrandId) {
    setPillarIndex(0)
    setSelectedBrand(id)
  }

  useEffect(() => {
    if (selectedBrand === 'none') return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('work')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [selectedBrand])

  return (
    <section id="work" className="relative px-5 py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-[1400px]">
        <AnimatePresence mode="wait" initial={false}>
          {selectedBrand === 'none' || !active ? (
            <motion.div
              key="grid"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: easeOut }}
            >
              <SignatureEntrance className="flex flex-col gap-5 md:gap-6">
                {brands.map((brand) => {
                  const purple = brand.tone === 'purple'
                  const coverRight = brand.coverSide !== 'left'

                  return (
                    <SignatureItem key={brand.id}>
                      <button
                        type="button"
                        onClick={() => openBrand(brand.id)}
                        className={cx(
                          'group relative flex min-h-[22rem] w-full cursor-pointer overflow-hidden rounded-[1.75rem] border text-left transition-all duration-300 sm:min-h-[26rem]',
                          purple
                            ? 'border-violet-950/80 bg-gradient-to-br from-[#12101a] via-[#0d0b14] to-[#07080c] hover:border-violet-800'
                            : 'border-emerald-950/80 bg-gradient-to-br from-[#0c1412] via-[#0a100e] to-[#07080c] hover:border-emerald-800',
                        )}
                      >
                        {brand.coverImage && (
                          <span
                            aria-hidden="true"
                            className={cx(
                              'pointer-events-none absolute inset-y-0 w-[58%] sm:w-[52%]',
                              coverRight ? 'right-0' : 'left-0',
                            )}
                          >
                            <img
                              src={brand.coverImage}
                              alt=""
                              className={cx(
                                'h-full w-full object-cover opacity-[0.28] grayscale-[30%] transition-all duration-500 group-hover:opacity-[0.42] group-hover:grayscale-0',
                                coverRight ? 'scale-105' : 'scale-105',
                              )}
                              style={{ objectPosition: brand.coverPosition ?? 'center' }}
                            />
                            <span
                              className={cx(
                                'absolute inset-0',
                                coverRight
                                  ? purple
                                    ? 'bg-gradient-to-r from-[#0d0b14] via-[#0d0b14]/75 to-transparent'
                                    : 'bg-gradient-to-r from-[#0a100e] via-[#0a100e]/75 to-transparent'
                                  : purple
                                    ? 'bg-gradient-to-l from-[#0d0b14] via-[#0d0b14]/75 to-transparent'
                                    : 'bg-gradient-to-l from-[#0a100e] via-[#0a100e]/75 to-transparent',
                              )}
                            />
                            <span
                              className={cx(
                                'absolute inset-0 opacity-40',
                                purple
                                  ? 'bg-gradient-to-t from-violet-950/50 via-transparent to-transparent'
                                  : 'bg-gradient-to-t from-emerald-950/50 via-transparent to-transparent',
                              )}
                            />
                          </span>
                        )}

                        <span
                          className={cx(
                            'relative z-10 flex w-full flex-col justify-between p-7 sm:p-10 lg:max-w-[58%] lg:p-12',
                            !coverRight && 'lg:ml-auto lg:text-right',
                          )}
                        >
                          <span>
                            <span
                              className={cx(
                                'inline-flex rounded-full px-3 py-1 text-sm font-medium',
                                purple
                                  ? 'bg-violet-950 text-violet-200'
                                  : 'bg-emerald-950 text-emerald-200',
                              )}
                            >
                              {brand.badge}
                            </span>
                            <span className="mt-7 block font-display text-3xl tracking-tight text-slate-50 sm:text-5xl">
                              {brand.title}
                            </span>
                            <span
                              className={cx(
                                'mt-4 block max-w-xl text-lg font-medium leading-snug sm:text-xl',
                                purple ? 'text-violet-300/90' : 'text-emerald-300/90',
                                !coverRight && 'lg:ml-auto',
                              )}
                            >
                              {brand.tagline}
                            </span>
                            <span
                              className={cx(
                                'mt-8 grid gap-3 text-base text-slate-400 sm:text-lg',
                                !coverRight && 'lg:justify-items-end',
                              )}
                            >
                              <span
                                className={cx(
                                  'flex items-center gap-2',
                                  !coverRight && 'lg:flex-row-reverse',
                                )}
                              >
                                <Target
                                  className={cx(
                                    'h-5 w-5',
                                    purple ? 'text-violet-400' : 'text-emerald-400',
                                  )}
                                  aria-hidden="true"
                                />
                                <span>
                                  <span className="font-semibold text-slate-200">Target: </span>
                                  {brand.target}
                                </span>
                              </span>
                              <span>
                                <span className="font-semibold text-slate-200">Channels: </span>
                                {brand.channels}
                              </span>
                            </span>
                          </span>

                          <span
                            className={cx(
                              'mt-10 inline-flex w-fit items-center rounded-full px-6 py-3.5 text-base font-semibold text-white transition-colors duration-300',
                              purple
                                ? 'bg-violet-950 group-hover:bg-violet-900'
                                : 'bg-emerald-950 group-hover:bg-emerald-900',
                              !coverRight && 'lg:ml-auto',
                            )}
                          >
                            Explore the work →
                          </span>
                        </span>
                      </button>
                    </SignatureItem>
                  )
                })}
              </SignatureEntrance>
            </motion.div>
          ) : (
            <motion.div
              key={active.id}
              className="relative"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: easeOut }}
            >
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedBrand('none')}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-base font-semibold text-slate-100 transition-all duration-300 hover:bg-white/10"
                  >
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                    Back to work
                  </button>
                  <p
                    className={cx(
                      'text-sm font-medium uppercase tracking-[0.18em]',
                      active.tone === 'purple' ? 'text-violet-400' : 'text-emerald-400',
                    )}
                  >
                    {active.badge}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-5">
                  {active.logo && (
                    <img
                      src={active.logo}
                      alt=""
                      className="h-16 w-16 rounded-2xl object-cover shadow-sm ring-1 ring-white/10 sm:h-20 sm:w-20"
                    />
                  )}
                  <h2 className="max-w-5xl font-display text-4xl tracking-tight text-slate-50 sm:text-6xl">
                    {active.showcaseTitle}
                  </h2>
                </div>

                <div
                  className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
                  role="tablist"
                  aria-label="Pillars, one at a time"
                >
                  {visiblePillars.map((item, index) => {
                    const selected = index === pillarIndex
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setPillarIndex(index)}
                        className={cx(
                          'cursor-pointer border-b-2 pb-1 text-base font-semibold tracking-tight transition-colors duration-300',
                          selected
                            ? 'border-slate-100 text-slate-50'
                            : 'border-transparent text-slate-500 hover:text-slate-300',
                        )}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>

                {pillar && (
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={pillar.id}
                      role="tabpanel"
                      className="mt-12 min-h-[62vh]"
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: reduce ? 0 : 0.28, ease: easeOut }}
                    >
                      <div className="flex items-center gap-3">
                        {(() => {
                          const Icon = pillarIcon[pillar.id]
                          const accent = pillarAccent[pillar.id]
                          return (
                            <span className={cx('grid h-12 w-12 place-items-center rounded-xl', accent)}>
                              <Icon className="h-6 w-6" aria-hidden="true" />
                            </span>
                          )
                        })()}
                        <p
                          className={cx(
                            'text-base font-medium uppercase tracking-[0.18em] text-slate-500',
                            pillar.label === pillar.title && 'sr-only',
                          )}
                        >
                          {pillar.label}
                        </p>
                      </div>
                      <h3 className="mt-6 max-w-4xl text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                        {pillar.title}
                      </h3>
                      {active.id === 'hadi-elearning' && pillar.id === 'reach' ? null : active.id ===
                          'inspired-analyst' &&
                        (pillar.id === 'engagement' || pillar.id === 'reach') ? (
                        <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-300 sm:text-2xl">
                          {brandNotes[active.id][pillar.id]}
                        </p>
                      ) : (
                        <>
                          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-400">
                            {pillar.copy}
                          </p>
                          <p className="mt-4 max-w-3xl text-xl font-medium leading-relaxed text-slate-200">
                            {brandNotes[active.id][pillar.id]}
                          </p>
                        </>
                      )}
                      {active.id === 'inspired-analyst' && pillar.id === 'creative' ? (
                        <InspiredVisuals />
                      ) : active.id === 'inspired-analyst' && pillar.id === 'engagement' ? (
                        <BusinessVisuals />
                      ) : active.id === 'inspired-analyst' && pillar.id === 'reach' ? (
                        <ReachVisuals />
                      ) : active.id === 'hadi-elearning' && pillar.id === 'reach' ? (
                        <HadiReachVisuals />
                      ) : active.id === 'hadi-elearning' && pillar.id === 'creative' ? (
                        <HadiCreativeVisuals />
                      ) : (
                        <div className="relative mt-12 min-h-[28rem] overflow-hidden">
                          {active.logo ? (
                            <img
                              src={active.logo}
                              alt=""
                              className="pointer-events-none absolute top-0 right-0 h-full max-h-[28rem] w-auto max-w-full rounded-[2rem] object-cover opacity-90"
                            />
                          ) : (
                            <p className="flex items-center gap-2 text-base font-medium uppercase tracking-[0.16em] text-slate-500">
                              <ExternalLink className="h-4 w-4" aria-hidden="true" />
                              {pillar.slot}
                            </p>
                          )}
                        </div>
                      )}
                      <div className="mt-8 flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setPillarIndex((index) => Math.max(0, index - 1))}
                          disabled={pillarIndex === 0}
                          className="cursor-pointer rounded-full border border-white/10 px-5 py-3 text-base font-semibold text-slate-100 disabled:cursor-default disabled:opacity-40"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setPillarIndex((index) => Math.min(visiblePillars.length - 1, index + 1))
                          }
                          disabled={pillarIndex === visiblePillars.length - 1}
                          className="cursor-pointer rounded-full bg-violet-950 px-5 py-3 text-base font-semibold text-violet-100 disabled:cursor-default disabled:opacity-40"
                        >
                          Next
                        </button>
                        <p className="text-base text-slate-500">
                          {pillarIndex + 1} of {visiblePillars.length}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
