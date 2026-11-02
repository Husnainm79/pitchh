import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export function AmbientGlow() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 50, damping: 20, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 50, damping: 20, mass: 0.4 })
  const background = useMotionTemplate`radial-gradient(560px circle at ${springX}px ${springY}px, rgba(88, 28, 135, 0.14), transparent 45%)`

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y])

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 mix-blend-screen"
      style={{ background }}
    />
  )
}
