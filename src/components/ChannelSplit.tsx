import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { cx } from '../lib/cx.ts'
import { easeOut } from '../lib/motion.ts'

const channels = [
  {
    id: 'instagram',
    label: 'Work showcase',
    channel: 'Instagram',
    image: '/cases/hamza-instagram-grid.jpg',
    note: 'Short-form video. Pillars stay distinct. The feed is the portfolio.',
  },
  {
    id: 'linkedin',
    label: 'Professional',
    channel: 'LinkedIn',
    image: '/cases/hamza-linkedin-profile.jpg',
    note: 'Business and professional side. Visual posts that build trust without blurring the work feed.',
  },
] as const

export function ChannelSplit() {
  const [channel, setChannel] = useState<(typeof channels)[number]['id']>('instagram')
  const reduce = useReducedMotion()
  const active = channels.find((item) => item.id === channel) ?? channels[0]

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-purple-900">Channel split</p>
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
          {channels.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setChannel(item.id)}
              className={cx(
                'cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300',
                channel === item.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-5 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reduce ? false : { opacity: 0, x: active.id === 'linkedin' ? 36 : -36, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={reduce ? undefined : { opacity: 0, x: active.id === 'linkedin' ? -28 : 28, filter: 'blur(6px)' }}
            transition={{ duration: reduce ? 0 : 0.45, ease: easeOut }}
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-purple-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                {active.channel}
              </span>
              <span className="text-sm font-medium text-slate-600">{active.label}</span>
            </div>
            <img
              src={active.image}
              alt=""
              className="mx-auto max-h-[36rem] w-full rounded-[1.25rem] object-contain"
            />
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">{active.note}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
