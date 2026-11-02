import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Layers, MessageCircle, Sparkles, Target, TrendingUp, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { WorkId, WorkProject, WorkTone } from '../work.ts'
import { workProjects } from '../work.ts'
import { cx } from '../lib/cx.ts'
import { easeOut } from '../lib/motion.ts'
import {
  BusinessVisuals,
  HadiCreativeVisuals,
  HadiReachVisuals,
  InspiredVisuals,
  ReachVisuals,
} from './InspiredVisuals.tsx'

const pillarIcons: Record<WorkProject['pillars'][number]['id'], LucideIcon> = {
  creative: Layers,
  reach: TrendingUp,
  engagement: MessageCircle,
  usp: Sparkles,
}

const toneAccent: Record<WorkTone, string> = {
  purple: 'text-purple-300',
  emerald: 'text-emerald-300',
  lime: 'text-lime-300',
  violet: 'text-violet-300',
  crimson: 'text-red-300',
  sapphire: 'text-blue-300',
  amber: 'text-amber-300',
}

const toneChip: Record<WorkTone, string> = {
  purple: 'bg-purple-950 text-purple-100',
  emerald: 'bg-emerald-950 text-emerald-100',
  lime: 'bg-lime-400 text-black',
  violet: 'bg-violet-950 text-violet-100',
  crimson: 'bg-red-950 text-red-100',
  sapphire: 'bg-blue-950 text-blue-100',
  amber: 'bg-amber-950 text-amber-100',
}

function ProofGrid({ proofs }: { proofs: NonNullable<WorkProject['proofs']> }) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {proofs.map((proof) => (
        <figure
          key={proof.src}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
        >
          <img src={proof.src} alt={proof.alt} className="h-auto w-full rounded-xl object-cover" />
        </figure>
      ))}
    </div>
  )
}

function PillarVisual({ project, pillarId }: { project: WorkProject; pillarId: string }) {
  if (project.id === 'inspired-analyst' && pillarId === 'creative') return <InspiredVisuals />
  if (project.id === 'inspired-analyst' && pillarId === 'reach') return <ReachVisuals />
  if (project.id === 'inspired-analyst' && pillarId === 'engagement') return <BusinessVisuals />
  if (project.id === 'hadi-elearning' && pillarId === 'creative') return <HadiCreativeVisuals />
  if (project.id === 'hadi-elearning' && pillarId === 'reach') return <HadiReachVisuals />

  if (project.proofs?.length && (pillarId === 'creative' || pillarId === 'usp')) {
    return <ProofGrid proofs={project.proofs} />
  }

  if (project.proofs?.length && pillarId === 'reach') {
    return <ProofGrid proofs={project.proofs.slice(0, 2)} />
  }

  return (
    <div className="mt-10 grid min-h-[14rem] place-items-center rounded-2xl border border-dashed border-white/15 bg-white/[0.03] text-slate-500">
      <p className="flex items-center gap-2 text-sm font-medium tracking-[0.16em] uppercase">
        <Target className="h-4 w-4" aria-hidden="true" />
        Visual proof slot
      </p>
    </div>
  )
}

export function CaseStudyModal({
  projectId,
  onClose,
}: {
  projectId: WorkId | null
  onClose: () => void
}) {
  const project = workProjects.find((item) => item.id === projectId) ?? null
  const [pillarIndex, setPillarIndex] = useState(0)
  const reduce = useReducedMotion()
  const pillar = project?.pillars[pillarIndex]

  useEffect(() => {
    setPillarIndex(0)
  }, [projectId])

  useEffect(() => {
    if (!project) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && pillar && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-stretch justify-center bg-[#090d16]/90 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.28 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
            className="relative flex h-full w-full max-w-[1600px] flex-col overflow-hidden"
            initial={reduce ? false : { y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: 18, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: easeOut }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4 lg:px-10">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to vault
              </button>
              <p className={cx('text-xs font-semibold tracking-[0.18em] uppercase', toneAccent[project.tone])}>
                {project.badge}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
                aria-label="Close case study"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-8 lg:px-10 lg:py-10">
              <div className="flex flex-wrap items-center gap-4">
                {project.logo && (
                  <img
                    src={project.logo}
                    alt=""
                    className="h-14 w-14 rounded-2xl object-cover ring-1 ring-white/10 sm:h-16 sm:w-16"
                  />
                )}
                <div>
                  <h2 className="font-display text-3xl tracking-tight text-white sm:text-5xl">
                    {project.title}
                  </h2>
                  <p className="mt-2 max-w-3xl text-lg text-slate-400">{project.tagline}</p>
                </div>
              </div>

              <div
                className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
                role="tablist"
                aria-label="Strategic pillars"
              >
                {project.pillars.map((item, index) => {
                  const selected = index === pillarIndex
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setPillarIndex(index)}
                      className={cx(
                        'cursor-pointer border-b-2 pb-1.5 text-sm font-semibold tracking-tight transition-colors sm:text-base',
                        selected
                          ? 'border-white text-white'
                          : 'border-transparent text-slate-500 hover:text-slate-300',
                      )}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={pillar.id}
                  role="tabpanel"
                  className="mt-10 pb-16"
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: reduce ? 0 : 0.28, ease: easeOut }}
                >
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = pillarIcons[pillar.id]
                      return (
                        <span
                          className={cx(
                            'grid h-11 w-11 place-items-center rounded-xl',
                            toneChip[project.tone],
                          )}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )
                    })()}
                    <p className="text-sm font-medium tracking-[0.18em] text-slate-500 uppercase">
                      {pillar.label}
                    </p>
                  </div>
                  <h3 className="mt-5 max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300 sm:text-xl">
                    {pillar.copy}
                  </p>

                  <PillarVisual project={project} pillarId={pillar.id} />

                  <div className="mt-10 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPillarIndex((value) => Math.max(0, value - 1))}
                      disabled={pillarIndex === 0}
                      className="cursor-pointer rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white disabled:cursor-default disabled:opacity-35"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPillarIndex((value) => Math.min(project.pillars.length - 1, value + 1))
                      }
                      disabled={pillarIndex === project.pillars.length - 1}
                      className={cx(
                        'cursor-pointer rounded-full px-5 py-3 text-sm font-semibold disabled:cursor-default disabled:opacity-35',
                        toneChip[project.tone],
                      )}
                    >
                      Next
                    </button>
                    <p className="text-sm text-slate-500">
                      {pillarIndex + 1} of {project.pillars.length}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
