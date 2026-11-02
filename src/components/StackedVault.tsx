import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { WorkProject, WorkTone } from '../work.ts'
import { glowFor, workProjects } from '../work.ts'
import { cx } from '../lib/cx.ts'
import { easeOut } from '../lib/motion.ts'

const toneStyles: Record<
  WorkTone,
  {
    card: string
    badge: string
    tag: string
    button: string
    glowBorder: string
  }
> = {
  purple: {
    card: 'from-purple-950/90 via-slate-950/85 to-slate-900/90',
    badge: 'bg-purple-950 text-purple-200 ring-purple-800/40',
    tag: 'border-purple-800/40 bg-purple-950/50 text-purple-200',
    button: 'bg-purple-950 text-purple-100 shadow-[0_0_28px_rgba(88,28,135,0.35)] hover:bg-purple-900',
    glowBorder: 'group-hover:border-purple-700/60 group-hover:shadow-[0_0_40px_rgba(88,28,135,0.25)]',
  },
  emerald: {
    card: 'from-emerald-950/90 via-slate-950/85 to-slate-900/90',
    badge: 'bg-emerald-950 text-emerald-200 ring-emerald-800/40',
    tag: 'border-emerald-800/40 bg-emerald-950/50 text-emerald-200',
    button: 'bg-emerald-950 text-emerald-100 shadow-[0_0_28px_rgba(6,78,59,0.4)] hover:bg-emerald-900',
    glowBorder: 'group-hover:border-emerald-700/60 group-hover:shadow-[0_0_40px_rgba(6,78,59,0.28)]',
  },
  lime: {
    card: 'from-lime-950/80 via-slate-950/90 to-black/90',
    badge: 'bg-black text-lime-300 ring-lime-400/30',
    tag: 'border-lime-400/25 bg-lime-950/40 text-lime-200',
    button:
      'bg-lime-400 text-black shadow-[0_0_28px_rgba(163,230,53,0.28)] hover:bg-lime-300',
    glowBorder: 'group-hover:border-lime-400/50 group-hover:shadow-[0_0_40px_rgba(163,230,53,0.2)]',
  },
  violet: {
    card: 'from-violet-950/90 via-slate-950/85 to-slate-900/90',
    badge: 'bg-violet-950 text-violet-200 ring-violet-800/40',
    tag: 'border-violet-800/40 bg-violet-950/50 text-violet-200',
    button: 'bg-violet-950 text-violet-100 shadow-[0_0_28px_rgba(76,29,149,0.35)] hover:bg-violet-900',
    glowBorder: 'group-hover:border-violet-700/60 group-hover:shadow-[0_0_40px_rgba(76,29,149,0.25)]',
  },
  crimson: {
    card: 'from-red-950/90 via-slate-950/85 to-slate-900/90',
    badge: 'bg-red-950 text-red-200 ring-red-800/40',
    tag: 'border-red-800/40 bg-red-950/50 text-red-200',
    button: 'bg-red-950 text-red-100 shadow-[0_0_28px_rgba(127,29,29,0.4)] hover:bg-red-900',
    glowBorder: 'group-hover:border-red-700/60 group-hover:shadow-[0_0_40px_rgba(127,29,29,0.28)]',
  },
  sapphire: {
    card: 'from-blue-950/90 via-slate-950/85 to-slate-900/90',
    badge: 'bg-blue-950 text-blue-200 ring-blue-800/40',
    tag: 'border-blue-800/40 bg-blue-950/50 text-blue-200',
    button: 'bg-blue-950 text-blue-100 shadow-[0_0_28px_rgba(30,58,138,0.4)] hover:bg-blue-900',
    glowBorder: 'group-hover:border-blue-700/60 group-hover:shadow-[0_0_40px_rgba(30,58,138,0.28)]',
  },
  amber: {
    card: 'from-amber-950/90 via-slate-950/85 to-slate-900/90',
    badge: 'bg-amber-950 text-amber-200 ring-amber-800/40',
    tag: 'border-amber-800/40 bg-amber-950/50 text-amber-200',
    button: 'bg-amber-950 text-amber-100 shadow-[0_0_28px_rgba(120,53,15,0.4)] hover:bg-amber-900',
    glowBorder: 'group-hover:border-amber-700/60 group-hover:shadow-[0_0_40px_rgba(120,53,15,0.28)]',
  },
}

function StackCard({
  project,
  index,
  total,
  onOpen,
}: {
  project: WorkProject
  index: number
  total: number
  onOpen: (id: WorkProject['id']) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.55, 1, 1])
  const styles = toneStyles[project.tone]
  const coverRight = project.coverSide === 'right'
  const contentRight = project.coverSide === 'left'

  return (
    <motion.div
      ref={ref}
      className="sticky top-24"
      style={
        reduce
          ? { zIndex: index + 1 }
          : { zIndex: index + 1, scale, opacity }
      }
    >
      <motion.button
        type="button"
        onClick={() => onOpen(project.id)}
        style={{ ['--glow' as string]: glowFor(project.tone) }}
        whileHover={reduce ? undefined : { y: -8, scale: 1.01 }}
        transition={{ duration: 0.35, ease: easeOut }}
        className={cx(
          'group relative flex min-h-[22rem] w-full cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/80 text-left shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[border-color,box-shadow] duration-500 sm:min-h-[26rem]',
          styles.glowBorder,
        )}
      >
        <span
          aria-hidden="true"
          className={cx('pointer-events-none absolute inset-0 bg-gradient-to-br', styles.card)}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background: `radial-gradient(ellipse at ${coverRight ? '85% 40%' : '15% 40%'}, var(--glow, rgba(88,28,135,0.35)), transparent 55%)`,
          }}
        />

        <span
          aria-hidden="true"
          className={cx(
            'pointer-events-none absolute inset-y-0 w-[62%] sm:w-[54%]',
            coverRight ? 'right-0' : 'left-0',
          )}
        >
          <img
            src={project.coverImage}
            alt=""
            className="h-full w-full object-cover opacity-20 grayscale-[25%] transition-opacity duration-500 group-hover:opacity-35"
            style={{ objectPosition: project.coverPosition ?? 'center' }}
          />
          <span
            className={cx(
              'absolute inset-0',
              coverRight
                ? 'bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent'
                : 'bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent',
            )}
          />
        </span>

        <span
          className={cx(
            'relative z-10 flex w-full flex-col justify-between p-7 sm:p-10 lg:max-w-[58%] lg:p-12',
            contentRight && 'lg:ml-auto lg:items-end lg:text-right',
          )}
        >
          <span className={cx('flex flex-col', contentRight && 'lg:items-end')}>
            <span
              className={cx(
                'inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold tracking-wide ring-1 sm:text-sm',
                styles.badge,
              )}
            >
              {project.badge}
            </span>
            <span className="mt-6 block font-display text-3xl tracking-tight text-white sm:text-5xl">
              {project.title}
            </span>
            <span className="mt-4 block max-w-xl text-lg font-medium leading-snug text-slate-200 sm:text-xl">
              {project.tagline}
            </span>
            <span
              className={cx(
                'mt-7 flex flex-wrap gap-2',
                contentRight && 'lg:justify-end',
              )}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={cx(
                    'rounded-full border px-3 py-1.5 text-xs font-medium sm:text-sm',
                    styles.tag,
                  )}
                >
                  {tag}
                </span>
              ))}
            </span>
          </span>

          <span
            className={cx(
              'mt-10 inline-flex w-fit items-center rounded-full px-6 py-3.5 text-base font-semibold transition-colors duration-300',
              styles.button,
            )}
          >
            Explore Full Case Study →
          </span>
        </span>

        <span className="pointer-events-none absolute right-5 bottom-5 font-mono text-[0.65rem] tracking-[0.2em] text-white/20 sm:right-8 sm:bottom-8">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </motion.button>
      <div className="h-10 sm:h-12" aria-hidden="true" />
    </motion.div>
  )
}

export function StackedVault({ onOpen }: { onOpen: (id: WorkProject['id']) => void }) {
  return (
    <section id="work" className="relative bg-transparent px-5 pb-8 pt-2 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-poppins text-xs font-semibold tracking-[0.22em] text-emerald-400/80 uppercase">
              Portfolio vault
            </p>
            <h2 className="mt-3 font-poppins text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Selected work
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-slate-500 sm:block">
            Scroll to stack. Click any card for the full case study.
          </p>
        </div>

        <div className="relative flex flex-col pb-[30vh]">
          {workProjects.map((project, index) => (
            <StackCard
              key={project.id}
              project={project}
              index={index}
              total={workProjects.length}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
