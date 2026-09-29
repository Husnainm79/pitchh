import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  MessageCircle,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { brandNotes, brands, pillars } from '../portfolio.ts'
import type { BrandId } from '../portfolio.ts'
import { cx } from '../lib/cx.ts'
import { easeOut } from '../lib/motion.ts'
import { BusinessVisuals, HadiCreativeVisuals, HadiReachVisuals, InspiredVisuals, ReachVisuals } from './InspiredVisuals.tsx'
import { SignatureEntrance, SignatureItem } from './SignatureMotion.tsx'

type Selection = 'none' | BrandId

const pillarIcon: Record<(typeof pillars)[number]['id'], LucideIcon> = {
  creative: Layers,
  reach: TrendingUp,
  engagement: MessageCircle,
}

const pillarAccent: Record<(typeof pillars)[number]['id'], string> = {
  creative: 'bg-slate-900 text-white',
  reach: 'bg-purple-900 text-white',
  engagement: 'bg-emerald-900 text-white',
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
    document.getElementById('portfolio')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [selectedBrand])

  return (
    <section id="portfolio" className="relative border-t border-slate-200 bg-white px-5 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto w-full max-w-[1600px]">
        <AnimatePresence mode="wait" initial={false}>
          {selectedBrand === 'none' || !active ? (
            <motion.div
              key="grid"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: easeOut }}
            >
              <h2 className="text-5xl font-semibold tracking-wider text-slate-900 uppercase sm:text-7xl lg:text-8xl">
                Portfolio
              </h2>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-purple-300 bg-white px-5 py-2.5 text-base font-medium text-purple-900 shadow-sm">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                Our Proof of Work!
              </p>
              <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-700">
                Select a brand below to inspect our content architecture, reach metrics, and inbound
                engagement strategy.
              </p>

              <SignatureEntrance className="mt-10 grid min-h-[72vh] grid-cols-1 gap-6 md:grid-cols-2">
                {brands.map((brand) => {
                  const purple = brand.tone === 'purple'
                  return (
                    <SignatureItem key={brand.id}>
                    <button
                      type="button"
                      onClick={() => openBrand(brand.id)}
                      className={cx(
                        'group relative flex h-full min-h-[32rem] w-full cursor-pointer flex-col overflow-hidden rounded-3xl border p-8 text-left shadow-md transition-all duration-300 hover:shadow-lg sm:p-12',
                        purple
                          ? 'border-purple-200 bg-gradient-to-br from-purple-900/10 via-purple-50/50 to-slate-100/80 hover:border-purple-500 hover:from-purple-950/15'
                          : 'border-emerald-200 bg-gradient-to-br from-emerald-900/10 via-emerald-50/50 to-slate-100/80 hover:border-emerald-500 hover:from-emerald-950/15',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cx(
                          'pointer-events-none absolute inset-0 bg-cover bg-center transition-opacity duration-300',
                          brand.logo ? 'opacity-80 group-hover:opacity-100' : 'opacity-20 group-hover:opacity-30',
                        )}
                        style={brand.logo ? { backgroundImage: `url(${brand.logo})` } : undefined}
                      />
                      {brand.logo && (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/15"
                        />
                      )}
                      <span className="relative flex h-full flex-col">
                        <span
                          className={cx(
                            'inline-flex rounded-full px-3 py-1 text-sm font-medium text-white',
                            purple ? 'bg-purple-900' : 'bg-emerald-900',
                          )}
                        >
                          {brand.badge}
                        </span>
                        <span className="mt-8 block text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                          {brand.title}
                        </span>
                        <span
                          className={cx(
                            'mt-4 block max-w-xl text-xl font-medium leading-snug',
                            purple ? 'text-purple-900' : 'text-emerald-900',
                          )}
                        >
                          {brand.tagline}
                        </span>
                        <span className="mt-10 grid gap-4 text-lg text-slate-800">
                          <span className="flex items-center gap-2">
                            <Target className={cx('h-5 w-5', purple ? 'text-purple-900' : 'text-emerald-900')} aria-hidden="true" />
                            <span>
                              <span className="font-semibold text-slate-900">Target: </span>
                              {brand.target}
                            </span>
                          </span>
                          <span>
                            <span className="font-semibold text-slate-900">Channels: </span>
                            {brand.channels}
                          </span>
                        </span>
                        <span
                          className={cx(
                            'mt-auto inline-flex w-fit items-center rounded-full px-6 py-4 text-base font-semibold text-white transition-colors duration-300',
                            purple ? 'bg-purple-900 group-hover:bg-purple-950' : 'bg-emerald-900 group-hover:bg-emerald-950',
                          )}
                        >
                          Explore Work & Strategy →
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
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-base font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                  Back to All Brands
                </button>
                <p
                  className={cx(
                    'text-sm font-medium uppercase tracking-[0.18em]',
                    active.tone === 'purple' ? 'text-purple-900' : 'text-emerald-900',
                  )}
                >
                  {active.badge}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-5">
                {active.logo && (
                  <img src={active.logo} alt="" className="h-16 w-16 rounded-2xl object-cover shadow-sm sm:h-20 sm:w-20" />
                )}
                <h2 className="max-w-5xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
                  {active.showcaseTitle}
                </h2>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3" role="tablist" aria-label="Pillars, one at a time">
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
                        selected ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-700',
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
                    <h3 className="mt-6 max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                      {pillar.title}
                    </h3>
                    {active.id === 'hadi-elearning' && pillar.id === 'reach' ? null : active.id === 'inspired-analyst' &&
                    (pillar.id === 'engagement' || pillar.id === 'reach') ? (
                      <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-800 sm:text-2xl">
                        {brandNotes[active.id][pillar.id]}
                      </p>
                    ) : (
                      <>
                        <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-700">{pillar.copy}</p>
                        <p className="mt-4 max-w-3xl text-xl font-medium leading-relaxed text-slate-900">
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
                          <p className="flex items-center gap-2 text-base font-medium uppercase tracking-[0.16em] text-slate-400">
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
                        className="cursor-pointer rounded-full border border-slate-200 px-5 py-3 text-base font-semibold text-slate-900 disabled:cursor-default disabled:opacity-40"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={() => setPillarIndex((index) => Math.min(visiblePillars.length - 1, index + 1))}
                        disabled={pillarIndex === visiblePillars.length - 1}
                        className="cursor-pointer rounded-full bg-slate-900 px-5 py-3 text-base font-semibold text-white disabled:cursor-default disabled:opacity-40"
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
