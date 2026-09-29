import { useEffect, useState } from 'react'
import { cx } from '../lib/cx.ts'

const stops = [
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'pillars', label: 'Pillars' },
  { id: 'portfolio', label: 'Portfolio' },
] as const

export function ProgressRail() {
  const [active, setActive] = useState<(typeof stops)[number]['id']>('case-studies')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const sections = stops
      .map((stop) => document.getElementById(stop.id))
      .filter((node): node is HTMLElement => Boolean(node))

    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.35
      let current: (typeof stops)[number]['id'] = stops[0].id
      for (const section of sections) {
        if (section.offsetTop <= mid) {
          const match = stops.find((stop) => stop.id === section.id)
          if (match) current = match.id
        }
      }
      setActive(current)

      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="sticky top-[4.25rem] z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md sm:top-[4.5rem]">
      <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-5 py-2.5 lg:px-10">
        <nav aria-label="Deck progress" className="flex flex-1 flex-wrap items-center gap-x-1 gap-y-1">
          {stops.map((stop, index) => {
            const selected = stop.id === active
            return (
              <span key={stop.id} className="flex items-center gap-1">
                {index > 0 && <span className="mx-1 hidden text-slate-300 sm:inline" aria-hidden="true">→</span>}
                <a
                  href={`#${stop.id}`}
                  className={cx(
                    'rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors duration-300 sm:text-sm',
                    selected
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
                  )}
                >
                  {stop.label}
                </a>
              </span>
            )
          })}
        </nav>
        <p className="hidden text-[0.65rem] font-medium uppercase tracking-[0.16em] text-slate-400 sm:block">
          Demo experience
        </p>
      </div>
      <div className="h-0.5 w-full bg-slate-100" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-slate-900 via-purple-900 to-emerald-900 transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  )
}
