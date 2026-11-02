import { motion, useReducedMotion } from 'framer-motion'
import { BriefcaseBusiness, Zap } from 'lucide-react'
import { useMemo, useState } from 'react'
import { studio } from '../studio.ts'
import { easeOut } from '../lib/motion.ts'
import { cx } from '../lib/cx.ts'

type Platform = 'linkedin' | 'instagram'

function formatReach(n: number) {
  return `${Math.round(n).toLocaleString()}+`
}

function simulate(posts: number, platform: Platform) {
  const baseReach = platform === 'linkedin' ? 2200 : 3100
  const reach = posts * baseReach * (platform === 'linkedin' ? 1.15 : 1)
  const low = Math.max(3, Math.round(posts * (platform === 'linkedin' ? 1.1 : 0.85)))
  const high = Math.max(low + 2, Math.round(posts * (platform === 'linkedin' ? 2.1 : 1.7)))
  return { reach, low, high }
}

export function InboundSimulator() {
  const reduce = useReducedMotion()
  const [posts, setPosts] = useState(4)
  const [platform, setPlatform] = useState<Platform>('linkedin')
  const result = useMemo(() => simulate(posts, platform), [posts, platform])

  return (
    <section
      id="simulator"
      className="relative overflow-hidden px-5 py-20 lg:px-10 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,78,59,0.22),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: reduce ? 0 : 0.65, ease: easeOut }}
          className="rounded-2xl border border-emerald-500/30 bg-slate-900/90 p-6 shadow-2xl shadow-emerald-900/30 backdrop-blur-md md:p-8"
        >
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-yellow-400/15 text-yellow-400">
              <Zap className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-poppins text-lg font-bold tracking-tight text-white sm:text-xl">
                Estimate Your Growth: Inbound Lead Pipeline Simulator
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Tune the cadence. See projected reach and inbound conversations.
              </p>
            </div>
          </div>

          <label className="mt-8 block">
            <div className="mb-3 flex items-center justify-between gap-3 text-sm">
              <span className="font-poppins font-medium text-slate-200">Weekly Content Assets</span>
              <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-2.5 py-1 font-poppins text-sm font-bold text-yellow-400">
                {posts} / week
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={7}
              step={1}
              value={posts}
              onChange={(event) => setPosts(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-emerald-950 accent-yellow-400"
              aria-label="Weekly content assets from 1 to 7"
            />
            <div className="mt-2 flex justify-between font-poppins text-[0.65rem] tracking-wide text-slate-500 uppercase">
              <span>1 post</span>
              <span>Carousels / Reels</span>
              <span>7 posts</span>
            </div>
          </label>

          <div className="mt-7">
            <p className="mb-3 font-poppins text-sm font-medium text-slate-200">Target Platform</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPlatform('linkedin')}
                className={cx(
                  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2.5 font-poppins text-sm font-bold transition-all',
                  platform === 'linkedin'
                    ? 'bg-yellow-400 text-black'
                    : 'border border-emerald-500/25 bg-emerald-950/50 text-slate-300 hover:border-emerald-400/40 hover:text-white',
                )}
              >
                <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                LinkedIn B2B
              </button>
              <button
                type="button"
                onClick={() => setPlatform('instagram')}
                className={cx(
                  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2.5 font-poppins text-sm font-bold transition-all',
                  platform === 'instagram'
                    ? 'bg-yellow-400 text-black'
                    : 'border border-emerald-500/25 bg-emerald-950/50 text-slate-300 hover:border-emerald-400/40 hover:text-white',
                )}
              >
                Instagram Visual
              </button>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-500/25 bg-black/40 px-4 py-4">
              <p className="font-poppins text-[0.65rem] font-semibold tracking-[0.16em] text-emerald-300/90 uppercase">
                Monthly ICP Reach
              </p>
              <p className="mt-2 font-poppins text-2xl font-bold text-yellow-400">
                {formatReach(result.reach)}
              </p>
              <p className="mt-1 text-sm text-slate-300">Verified Decision Makers</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/25 bg-black/40 px-4 py-4">
              <p className="font-poppins text-[0.65rem] font-semibold tracking-[0.16em] text-emerald-300/90 uppercase">
                Projected Inbound DMs
              </p>
              <p className="mt-2 font-poppins text-2xl font-bold text-emerald-400">
                {result.low} – {result.high}
              </p>
              <p className="mt-1 text-sm text-slate-300">Qualified Project Calls</p>
            </div>
          </div>

          <a
            href={studio.contact.href}
            className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-yellow-400 px-5 py-3.5 font-poppins text-sm font-bold text-black transition-colors hover:bg-yellow-300"
          >
            Book a Growth Strategy Call →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
