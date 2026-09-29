import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'
import { pillars } from '../content.ts'
import { cx } from '../lib/cx.ts'
import { easeOut } from '../lib/motion.ts'
import type { Pillar, PillarAccent } from '../types.ts'

const accents: Record<
  PillarAccent,
  { icon: string; label: string; rule: string; selected: string }
> = {
  navy: {
    icon: 'bg-slate-900 text-white',
    label: 'text-slate-900',
    rule: 'border-slate-900',
    selected: 'border-slate-900 shadow-md',
  },
  purple: {
    icon: 'bg-purple-900 text-white',
    label: 'text-purple-900',
    rule: 'border-purple-900',
    selected: 'border-purple-900 shadow-md',
  },
  green: {
    icon: 'bg-emerald-900 text-white',
    label: 'text-emerald-900',
    rule: 'border-emerald-900',
    selected: 'border-emerald-900 shadow-md',
  },
}

function PillarDetail({ pillar }: { pillar: Pillar }) {
  const accent = accents[pillar.accent]
  const Icon = pillar.icon

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
      <div>
        <div className="flex items-center gap-3">
          <span className={cx('grid h-12 w-12 place-items-center rounded-xl shadow-sm', accent.icon)}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className={cx('font-mono text-[11px] uppercase tracking-[0.2em]', accent.label)}>
            Pillar {pillar.index}
          </p>
        </div>
        <h4 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">{pillar.title}</h4>
        <p className="mt-2 text-xl font-medium text-slate-800">{pillar.headline}</p>

        <div className="mt-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
            Agency application
          </p>
          <p className="mt-2 text-lg leading-relaxed text-slate-700">
            {pillar.application}
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-emerald-900/20 bg-emerald-50 p-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-900">
            Business outcome
          </p>
          <p className="mt-2 text-lg font-medium leading-relaxed text-emerald-900">{pillar.outcome}</p>
        </div>
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
          Agency examples
        </p>
        <ol className="mt-3 space-y-3">
          {pillar.examples.map((example, index) => (
            <li key={example} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className={cx('mt-2 border-l-2 pl-3 text-lg leading-relaxed text-slate-800', accent.rule)}>
                {example}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function Pillars() {
  const [activeId, setActiveId] = useState(pillars[0]?.id ?? 'problem')
  const reduce = useReducedMotion()
  const active = pillars.find((pillar) => pillar.id === activeId) ?? pillars[0]

  function canHover() {
    return window.matchMedia('(hover: hover)').matches
  }

  function selectPillar(id: string) {
    setActiveId(id)
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const nextIndex =
      event.key === 'ArrowRight' ? (index + 1) % pillars.length : (index - 1 + pillars.length) % pillars.length
    const next = pillars[nextIndex]
    if (!next) return
    selectPillar(next.id)
    document.getElementById(`pillar-tab-${next.id}`)?.focus()
  }

  if (!active) return null

  return (
    <div>
      <div className="max-w-2xl">
        <h3 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          The 4 Pillars of B2B Agency Content
        </h3>
        <p className="mt-3 text-lg leading-relaxed text-slate-700 sm:text-xl">
          Hover or click a pillar to see how the agency uses it, what it produces, and examples a
          buyer would actually read.
        </p>
      </div>

      <div className="mt-6">
        <div
          className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2"
          role="tablist"
          aria-label="Four pillars of B2B agency content"
        >
          {pillars.map((pillar, index) => {
            const selected = pillar.id === activeId
            const accent = accents[pillar.accent]
            const Icon = pillar.icon

            return (
              <button
                key={pillar.id}
                id={`pillar-tab-${pillar.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="pillar-detail"
                tabIndex={selected ? 0 : -1}
                onMouseEnter={() => {
                  if (canHover()) selectPillar(pillar.id)
                }}
                onFocus={() => selectPillar(pillar.id)}
                onClick={() => selectPillar(pillar.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={cx(
                  'flex h-full cursor-pointer flex-col rounded-2xl border bg-slate-50 p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md lg:p-7',
                  selected ? accent.selected : 'border-slate-200 hover:border-slate-300',
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className={cx('grid h-12 w-12 place-items-center rounded-xl', accent.icon)}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className={cx('font-mono text-[11px]', accent.label)}>{pillar.index}</span>
                </span>
                <span className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
                  {pillar.title}
                </span>
                <span className="mt-2 text-lg leading-relaxed text-slate-600">{pillar.headline}</span>
                <span
                  className={cx(
                    'mt-auto inline-flex items-center gap-1.5 pt-5 text-base font-medium',
                    selected ? accent.label : 'text-slate-500',
                  )}
                >
                  {selected ? 'Selected' : 'Open pillar'}
                  <ArrowRight
                    className={cx('h-3.5 w-3.5 transition-transform duration-300', selected && 'translate-x-0.5')}
                    aria-hidden="true"
                  />
                </span>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            id="pillar-detail"
            role="tabpanel"
            aria-labelledby={`pillar-tab-${active.id}`}
            className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8 lg:p-10"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: easeOut }}
          >
            <PillarDetail pillar={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
