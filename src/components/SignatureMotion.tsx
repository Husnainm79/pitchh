import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeOut } from '../lib/motion.ts'

export function SignatureEntrance({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={{
        hidden: {},
        show: {
          transition: reduce
            ? { duration: 0 }
            : { staggerChildren: stagger, delayChildren: 0.06 },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function SignatureItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0 : 0.55, ease: easeOut },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function SectionWipe({ label }: { label: string }) {
  const reduce = useReducedMotion()

  return (
    <div className="pointer-events-none relative h-10 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-purple-900/40 to-transparent"
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: reduce ? 0 : 0.9, ease: easeOut }}
      />
      <motion.p
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-purple-900"
        initial={reduce ? false : { opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.25, ease: easeOut }}
      >
        {label}
      </motion.p>
    </div>
  )
}
