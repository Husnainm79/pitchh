import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { easeOut } from '../lib/motion.ts'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-14 pt-14 sm:pb-16 sm:pt-20 lg:px-10 lg:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,78,59,0.28),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.55, ease: easeOut }}
          className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-emerald-500/40 bg-emerald-950/40 px-4 py-2 font-poppins text-[0.68rem] font-semibold tracking-[0.12em] text-yellow-400 uppercase backdrop-blur-md sm:text-xs sm:tracking-[0.14em]"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400/70 opacity-70" />
            <span className="relative inline-flex h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
          </span>
          <Sparkles className="hidden h-3.5 w-3.5 text-yellow-400 sm:block" aria-hidden="true" />
          Accepting Select Q4 Branding & Growth Clients
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : 0.05, ease: easeOut }}
          className="mt-8 font-poppins text-5xl leading-tight font-bold tracking-tight text-white md:text-7xl"
        >
          <span className="block">We Don&apos;t Post Content.</span>
          <span className="mt-1 block text-yellow-400">We Engineer Demand.</span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.12, ease: easeOut }}
          className="mx-auto mt-6 max-w-2xl font-poppins text-lg font-medium leading-relaxed text-slate-200 md:text-xl"
        >
          Transforming technical domain expertise into high-retention visual assets and inbound lead
          engines on LinkedIn & Instagram.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : 0.18, ease: easeOut }}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <a
            href="#work"
            className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-8 py-4 font-poppins text-base font-bold text-black shadow-lg shadow-yellow-500/20 transition-colors hover:bg-yellow-300"
          >
            Explore Interactive Portfolio ↓
          </a>
          <a
            href="#work"
            className="inline-flex flex-col items-center gap-2 text-slate-500 transition-colors hover:text-yellow-400"
            aria-label="Scroll to case studies"
          >
            <motion.span
              animate={reduce ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="h-5 w-5" aria-hidden="true" />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
