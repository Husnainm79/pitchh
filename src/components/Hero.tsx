import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { approachList, approaches } from '../content.ts'
import { cx } from '../lib/cx.ts'
import { easeOut } from '../lib/motion.ts'
import type { ApproachMode } from '../types.ts'

export function Hero() {
  const [mode, setMode] = useState<ApproachMode>('inbound')
  const reduce = useReducedMotion()
  const active = mode === 'trap' ? approaches.trap : approaches.inbound
  const inbound = mode === 'inbound'

  return (
    <section id="hero" className="relative px-5 pb-8 pt-14 sm:pt-20 lg:px-8 lg:pb-16 lg:pt-24">
      <motion.div
        className="mx-auto max-w-7xl"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.6, ease: easeOut }}
      >
        <p className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium tracking-wide text-purple-900">
          [ Content Marketing Re-Engineered ]
        </p>

        <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-tight text-slate-900 text-balance sm:text-6xl lg:text-7xl lg:leading-[1.05]">
          Turning Technical Expertise Into Inbound Client Pipeline.
        </h1>

        <p className="mt-6 max-w-4xl text-xl leading-relaxed text-slate-700 sm:text-2xl">
          How a Software & Digital Agency moves from chasing leads to attracting decision-makers
          through high-authority content on LinkedIn and Instagram.
        </p>

        <div
          id="interactive-view"
          className={cx(
            'relative mt-12 rounded-3xl border bg-slate-50 p-5 shadow-sm transition-all duration-300 sm:p-8 lg:p-10',
            inbound ? 'border-purple-200' : 'border-rose-200',
          )}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500">
                Live comparison
              </p>
              <p className="mt-2 text-lg text-slate-600">Switch the model while you present.</p>
            </div>
            <div
              className="grid grid-cols-1 gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm md:grid-cols-2"
              role="group"
              aria-label="Agency operating model"
            >
              {approachList.map((approach) => {
                const selected = approach.id === mode
                const isInbound = approach.id === 'inbound'

                return (
                  <button
                    key={approach.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setMode(approach.id)}
                    className={cx(
                      'relative cursor-pointer rounded-xl px-5 py-4 text-left transition-colors duration-300',
                      selected
                        ? isInbound
                          ? 'text-white'
                          : 'text-slate-800'
                        : 'text-slate-500 hover:text-slate-800',
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="approach-highlight"
                        className={cx(
                          'absolute inset-0 rounded-xl',
                          isInbound
                            ? 'bg-purple-900 shadow-sm'
                            : 'bg-slate-100 ring-1 ring-inset ring-rose-300',
                        )}
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10 flex items-start gap-2.5">
                      {isInbound ? (
                        <CheckCircle2
                          className={cx(
                            'mt-0.5 h-4 w-4 shrink-0',
                            selected ? 'text-emerald-300' : 'text-slate-400',
                          )}
                          aria-hidden="true"
                        />
                      ) : (
                        <span
                          className={cx(
                            'mt-1 h-2.5 w-2.5 shrink-0 rounded-full',
                            selected ? 'bg-rose-600' : 'bg-slate-300',
                          )}
                          aria-hidden="true"
                        />
                      )}
                      <span className="text-base font-semibold tracking-tight sm:text-lg">{approach.label}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              className="mt-6"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: easeOut }}
              aria-live="polite"
            >
              <p
                className={cx(
                  'text-lg font-semibold sm:text-xl',
                  inbound ? 'text-emerald-900' : 'text-rose-700',
                )}
              >
                {active.diagnosis}
              </p>
              <div
                className={cx(
                  'mt-6 grid gap-4 sm:grid-cols-2',
                )}
              >
                {active.points.map((point, index) => {
                  const Icon = point.icon
                  return (
                    <motion.article
                      key={point.title}
                      className={cx(
                        'rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md lg:p-7',
                        inbound ? 'border-emerald-900/20' : 'border-rose-200',
                      )}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduce ? 0 : 0.3,
                        delay: reduce ? 0 : index * 0.04,
                      }}
                    >
                      <Icon
                        className={cx('h-7 w-7', inbound ? 'text-emerald-900' : 'text-rose-700')}
                        aria-hidden="true"
                      />
                      <p className="mt-4 text-xl font-semibold tracking-tight text-slate-900">
                        {point.title}
                      </p>
                      <p className="mt-2 text-base leading-relaxed text-slate-600 sm:text-lg">{point.detail}</p>
                    </motion.article>
                  )
                })}
              </div>
              <p className="mt-6 max-w-4xl text-lg leading-relaxed text-slate-700">{active.summary}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
