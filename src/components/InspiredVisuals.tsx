import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cx } from '../lib/cx.ts'
import { easeOut } from '../lib/motion.ts'

type VisualKind =
  | 'Personal brand'
  | 'Business brand'
  | 'Inbound'
  | 'Company brand'
  | 'Impressions'
  | 'Engagements'
  | 'Outcomes'
  | 'Search'
  | 'Visual graphics'
  | 'Video'

type VisualPiece = {
  id: string
  src: string
  kind: VisualKind
  note: string
  left: string
  top: string
  width: string
  rotate: number
  z: number
}

function chipFor(kind: string): { label: string; className: string } {
  if (kind === 'Personal brand') return { label: 'Personal', className: 'bg-purple-900' }
  if (kind === 'Inbound') return { label: 'Inbound', className: 'bg-purple-900' }
  if (kind === 'Company brand') return { label: 'Company', className: 'bg-slate-900' }
  if (kind === 'Impressions') return { label: 'Impressions', className: 'bg-slate-900' }
  if (kind === 'Engagements') return { label: 'Engagements', className: 'bg-purple-900' }
  if (kind === 'Outcomes' || kind === 'Search') return { label: kind, className: 'bg-emerald-900' }
  if (kind === 'Visual graphics') return { label: 'Graphic', className: 'bg-emerald-900' }
  if (kind === 'Video') return { label: 'Video', className: 'bg-emerald-900' }
  return { label: 'Business', className: 'bg-slate-900' }
}

const creativePieces: VisualPiece[] = [
  {
    id: 'poster',
    src: '/inspired/poster.png',
    kind: 'Personal brand',
    note: 'A line built to stop the scroll.',
    left: '1%',
    top: '2%',
    width: '22%',
    rotate: -6,
    z: 3,
  },
  {
    id: 'sign',
    src: '/inspired/sign.jpg',
    kind: 'Personal brand',
    note: 'A belief, held up in the open.',
    left: '14%',
    top: '18%',
    width: '19%',
    rotate: 4,
    z: 5,
  },
  {
    id: 'voice',
    src: '/inspired/voice.jpg',
    kind: 'Personal brand',
    note: 'A point of view, said in public.',
    left: '34%',
    top: '2%',
    width: '16%',
    rotate: 6,
    z: 6,
  },
  {
    id: 'timeline',
    src: '/inspired/timeline.jpg',
    kind: 'Personal brand',
    note: 'Four ages. One idea, carried forward.',
    left: '0%',
    top: '52%',
    width: '27%',
    rotate: -2,
    z: 2,
  },
  {
    id: 'banner',
    src: '/inspired/digital-brands.png',
    kind: 'Business brand',
    note: 'The promise across the profile.',
    left: '52%',
    top: '1.5%',
    width: '45%',
    rotate: -1.5,
    z: 1,
  },
  {
    id: 'website',
    src: '/inspired/website.jpg',
    kind: 'Business brand',
    note: 'The front door of the company.',
    left: '54%',
    top: '20%',
    width: '26%',
    rotate: 2,
    z: 3,
  },
  {
    id: 'partnership',
    src: '/inspired/partnership.jpg',
    kind: 'Business brand',
    note: 'The founder, in the room with the work.',
    left: '42%',
    top: '44%',
    width: '22%',
    rotate: 3,
    z: 4,
  },
  {
    id: 'profile',
    src: '/inspired/linkedin-profile.png',
    kind: 'Business brand',
    note: 'The profile the market checks first.',
    left: '66%',
    top: '50%',
    width: '31%',
    rotate: -2,
    z: 5,
  },
  {
    id: 'mark',
    src: '/inspired-analyst-logo.jpg',
    kind: 'Business brand',
    note: 'The mark that ties the founder to the company.',
    left: '29%',
    top: '60%',
    width: '11%',
    rotate: -10,
    z: 8,
  },
]

const businessPieces: VisualPiece[] = [
  {
    id: 'inquiry',
    src: '/inspired/inquiry.png',
    kind: 'Inbound',
    note: 'A project inquiry, sent after finding the service page.',
    left: '0%',
    top: '6%',
    width: '34%',
    rotate: -3,
    z: 2,
  },
  {
    id: 'partner-note',
    src: '/inspired/partner-note.jpg',
    kind: 'Inbound',
    note: 'A partnership conversation, opened from the content.',
    left: '30%',
    top: '26%',
    width: '26%',
    rotate: 2.5,
    z: 4,
  },
  {
    id: 'delta',
    src: '/inspired/delta-inbound.jpg',
    kind: 'Inbound',
    note: 'A collaboration offer from Delta Exchange, sent in through the profile.',
    left: '1%',
    top: '46%',
    width: '40%',
    rotate: -2,
    z: 5,
  },
  {
    id: 'company',
    src: '/inspired/company-page.png',
    kind: 'Company brand',
    note: 'The company page, standing as its own channel.',
    left: '56%',
    top: '2%',
    width: '42%',
    rotate: -1.5,
    z: 1,
  },
  {
    id: 'partners',
    src: '/inspired/partners.png',
    kind: 'Company brand',
    note: 'The brands already attached to the work.',
    left: '58%',
    top: '46%',
    width: '34%',
    rotate: 2,
    z: 3,
  },
]

function VisualWall({
  pieces,
  leftLabel,
  rightLabel,
  boardClass,
  closing,
}: {
  pieces: VisualPiece[]
  leftLabel: string
  rightLabel: string
  boardClass: string
  closing?: string
}) {
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const activeIndex = pieces.findIndex((piece) => piece.id === activeId)
  const active = activeIndex >= 0 ? pieces[activeIndex] : null

  useEffect(() => {
    if (!activeId) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveId(null)
        return
      }
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
      event.preventDefault()
      const index = pieces.findIndex((piece) => piece.id === activeId)
      const next = event.key === 'ArrowRight' ? index + 1 : index - 1
      const piece = pieces[next]
      if (piece) setActiveId(piece.id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeId])

  const step = (direction: -1 | 1) => {
    if (activeIndex < 0) return
    const piece = pieces[activeIndex + direction]
    if (piece) setActiveId(piece.id)
  }

  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-900">{leftLabel}</p>
        <p className="text-lg text-slate-500">Hover for spotlight. Click to open the frame.</p>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">{rightLabel}</p>
      </div>

      <div className={cx('relative mt-5 hidden md:block', boardClass)}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-6 bottom-0 rounded-[2rem] bg-gradient-to-r from-purple-50 via-white to-slate-50"
        />
        {pieces.map((piece) => {
          const selected = piece.id === activeId
          const hovered = piece.id === hoveredId
          return (
            <motion.button
              key={piece.id}
              type="button"
              aria-pressed={selected}
              aria-label={`${piece.kind}. ${piece.note}`}
              onClick={() => setActiveId(piece.id)}
              onMouseEnter={() => setHoveredId(piece.id)}
              onMouseLeave={() => setHoveredId((current) => (current === piece.id ? null : current))}
              className={cx(
                'absolute cursor-pointer rounded-[1.35rem] bg-white p-2 text-left shadow-[0_18px_44px_rgba(15,23,42,0.16)] ring-1 ring-slate-900/10 focus-visible:ring-2 focus-visible:ring-purple-900',
                selected && 'ring-2 ring-purple-900',
              )}
              style={{
                left: piece.left,
                top: piece.top,
                width: piece.width,
                zIndex: selected ? 30 : hovered ? 24 : piece.z,
              }}
              initial={false}
              animate={{
                rotate: reduce ? 0 : selected ? 0 : hovered ? piece.rotate * 0.2 : piece.rotate,
                y: reduce || !hovered ? 0 : -12,
                opacity:
                  (hoveredId && !hovered) || (activeId && !selected)
                    ? 0.3
                    : 1,
                filter:
                  (hoveredId && !hovered) || (activeId && !selected)
                    ? 'brightness(0.7) saturate(0.65)'
                    : 'brightness(1) saturate(1)',
                scale: selected || hovered ? 1.03 : 1,
              }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: easeOut }}
            >
              <img src={piece.src} alt="" className="h-auto w-full rounded-xl object-contain" />
              <span
                className={cx(
                  'absolute -right-1 -bottom-2 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white shadow-sm',
                  chipFor(piece.kind).className,
                )}
              >
                {chipFor(piece.kind).label}
              </span>
            </motion.button>
          )
        })}
        <Lightbox
          active={active}
          activeIndex={activeIndex}
          total={pieces.length}
          onClose={() => setActiveId(null)}
          onStep={step}
          fixed={false}
        />
      </div>

      <div className="relative mt-5 md:hidden">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {pieces.map((piece) => (
            <motion.button
              key={piece.id}
              type="button"
              aria-pressed={piece.id === activeId}
              aria-label={`${piece.kind}. ${piece.note}`}
              onClick={() => setActiveId(piece.id)}
              className="cursor-pointer rounded-[1.25rem] bg-white p-2 text-left shadow-[0_16px_36px_rgba(15,23,42,0.14)] ring-1 ring-slate-900/10"
              style={{ rotate: reduce ? 0 : piece.rotate / 2 }}
            >
              <img src={piece.src} alt="" className="h-auto w-full rounded-lg object-contain" />
            </motion.button>
          ))}
        </div>
        <Lightbox
          active={active}
          activeIndex={activeIndex}
          total={pieces.length}
          onClose={() => setActiveId(null)}
          onStep={step}
          fixed
        />
      </div>

      {closing && (
        <p className="mt-10 max-w-4xl text-xl leading-relaxed text-slate-800 sm:text-2xl">{closing}</p>
      )}
    </div>
  )
}

export function InspiredVisuals() {
  return (
    <VisualWall
      pieces={creativePieces}
      leftLabel="Personal brand"
      rightLabel="Business brand"
      boardClass="h-[56rem]"
      closing="Highlights of the visual work for Inspired Analyst. Personal brand and business brand, in one system: the founder people recognize, and the company they trust."
    />
  )
}

export function BusinessVisuals() {
  return (
    <VisualWall
      pieces={businessPieces}
      leftLabel="Inbound"
      rightLabel="Company brand"
      boardClass="h-[46rem]"
    />
  )
}

const impressionPieces: VisualPiece[] = [
  {
    id: 'impressions-period',
    src: '/inspired/impressions-period.jpg',
    kind: 'Impressions',
    note: '1,787,678 impressions from 11 May to 28 September. The line climbs through the period. Against the prior 141 days, the comparison is down 24%.',
    left: '4%',
    top: '0%',
    width: '90%',
    rotate: -1.5,
    z: 1,
  },
  {
    id: 'impressions-june',
    src: '/inspired/impressions-june.jpg',
    kind: 'Impressions',
    note: '509,173 impressions in June, up 68% on the prior 30 days.',
    left: '8%',
    top: '42%',
    width: '82%',
    rotate: 2,
    z: 2,
  },
  {
    id: 'impressions-july6',
    src: '/inspired/impressions-july6.jpg',
    kind: 'Impressions',
    note: '180,645 impressions in six days, up 60% on the prior 6 days.',
    left: '2%',
    top: '68%',
    width: '78%',
    rotate: -2,
    z: 3,
  },
]

const engagementPieces: VisualPiece[] = [
  {
    id: 'engagements-period',
    src: '/inspired/engagements-period.jpg',
    kind: 'Engagements',
    note: '17,905 engagements from 11 May to 28 September, up 19% on the prior 141 days.',
    left: '4%',
    top: '0%',
    width: '88%',
    rotate: 1.5,
    z: 1,
  },
  {
    id: 'engagements-july',
    src: '/inspired/engagements-july.jpg',
    kind: 'Engagements',
    note: '4,615 engagements across July, up 77% on the prior 27 days.',
    left: '10%',
    top: '30%',
    width: '80%',
    rotate: -2,
    z: 2,
  },
  {
    id: 'engagements-june',
    src: '/inspired/engagements-june.jpg',
    kind: 'Engagements',
    note: '2,734 engagements in June, up 45% on the prior 30 days.',
    left: '2%',
    top: '52%',
    width: '78%',
    rotate: 2,
    z: 3,
  },
  {
    id: 'engagements-july6',
    src: '/inspired/engagements-july6.jpg',
    kind: 'Engagements',
    note: '2,437 engagements in six days, up 327% on the prior 6 days.',
    left: '12%',
    top: '72%',
    width: '76%',
    rotate: -1.5,
    z: 4,
  },
]

const reachPieces = [...impressionPieces, ...engagementPieces]

export function ReachVisuals() {
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const activeIndex = reachPieces.findIndex((piece) => piece.id === activeId)
  const active = activeIndex >= 0 ? reachPieces[activeIndex] : null

  useEffect(() => {
    if (!activeId) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveId(null)
        return
      }
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
      event.preventDefault()
      const index = reachPieces.findIndex((piece) => piece.id === activeId)
      const next = event.key === 'ArrowRight' ? index + 1 : index - 1
      const piece = reachPieces[next]
      if (piece) setActiveId(piece.id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeId])

  const step = (direction: -1 | 1) => {
    if (activeIndex < 0) return
    const piece = reachPieces[activeIndex + direction]
    if (piece) setActiveId(piece.id)
  }

  const groups = [
    { id: 'impressions', label: 'Impressions', pieces: impressionPieces, panel: 'bg-slate-50' },
    { id: 'engagements', label: 'Engagements', pieces: engagementPieces, panel: 'bg-purple-50' },
  ]

  return (
    <div className="relative mt-12">
      <div className="grid items-start gap-6 lg:grid-cols-2">
        {groups.map((group) => (
          <section key={group.id} className={cx('rounded-[2rem] p-4 sm:p-6', group.panel)}>
            <h4 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{group.label}</h4>
            <div className="mt-4 hidden gap-4 md:grid">
              {group.pieces.map((piece) => {
                const hovered = hoveredId === piece.id
                return (
                  <motion.button
                    key={piece.id}
                    type="button"
                    aria-pressed={activeId === piece.id}
                    aria-label={`${piece.kind}. ${piece.note}`}
                    onClick={() => setActiveId(piece.id)}
                    onMouseEnter={() => setHoveredId(piece.id)}
                    onMouseLeave={() => setHoveredId((current) => (current === piece.id ? null : current))}
                    className="cursor-pointer rounded-[1.25rem] bg-white p-2 text-left shadow-[0_16px_40px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/10"
                    initial={false}
                    animate={{
                      rotate: reduce ? 0 : hovered ? 0 : piece.rotate,
                      y: reduce || !hovered ? 0 : -8,
                    }}
                    transition={{ duration: reduce ? 0 : 0.3, ease: easeOut }}
                  >
                    <img src={piece.src} alt="" className="h-auto w-full rounded-lg object-contain" />
                  </motion.button>
                )
              })}
            </div>
            <div className="mt-4 grid gap-4 md:hidden">
              {group.pieces.map((piece) => (
                <button
                  key={piece.id}
                  type="button"
                  aria-label={`${piece.kind}. ${piece.note}`}
                  onClick={() => setActiveId(piece.id)}
                  className="cursor-pointer rounded-2xl bg-white p-2 text-left shadow-md"
                >
                  <img src={piece.src} alt="" className="h-auto w-full rounded-lg object-contain" />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Lightbox
        active={active}
        activeIndex={activeIndex}
        total={reachPieces.length}
        onClose={() => setActiveId(null)}
        onStep={step}
        fixed
      />
    </div>
  )
}

const hadiCreativePieces: VisualPiece[] = [
  {
    id: 'eid',
    src: '/hadi/eid.jpg',
    kind: 'Visual graphics',
    note: 'An Eid ul Adha greeting, designed for the Hadi community.',
    left: '2%',
    top: '0%',
    width: '36%',
    rotate: -3,
    z: 2,
  },
  {
    id: 'hajj',
    src: '/hadi/hajj.jpg',
    kind: 'Visual graphics',
    note: 'A Hajj Mubarak poster, carrying the same brand into the season.',
    left: '40%',
    top: '2%',
    width: '36%',
    rotate: 2.5,
    z: 3,
  },
  {
    id: 'success',
    src: '/hadi/success.jpg',
    kind: 'Visual graphics',
    note: 'A student success story. Nimra Khan, now an SEO intern.',
    left: '0%',
    top: '48%',
    width: '32%',
    rotate: 2,
    z: 4,
  },
  {
    id: 'wordpress',
    src: '/hadi/wordpress.jpg',
    kind: 'Visual graphics',
    note: 'A free WordPress mastery course, taught with Taha Hassan.',
    left: '34%',
    top: '46%',
    width: '34%',
    rotate: -2,
    z: 5,
  },
]

const hadiVideoPieces: VisualPiece[] = [
  {
    id: 'video-hassan',
    src: '/hadi/video-hassan.jpg',
    kind: 'Video',
    note: 'A student testimonial. Muhammad Hassan, SEO with AI Mastery Course.',
    left: '1%',
    top: '2%',
    width: '22%',
    rotate: -4,
    z: 2,
  },
  {
    id: 'video-title',
    src: '/hadi/video-title.jpg',
    kind: 'Video',
    note: 'The open for a student testimonial.',
    left: '24%',
    top: '0%',
    width: '21%',
    rotate: 3,
    z: 3,
  },
  {
    id: 'video-sana',
    src: '/hadi/video-sana.jpg',
    kind: 'Video',
    note: 'A student testimonial. M Sana Ullah Khan, Python with AI Mastery Course.',
    left: '46%',
    top: '3%',
    width: '22%',
    rotate: -2,
    z: 2,
  },
  {
    id: 'video-winner',
    src: '/hadi/video-winner.jpg',
    kind: 'Video',
    note: 'A winner reel, opening on the result.',
    left: '69%',
    top: '1%',
    width: '22%',
    rotate: 3.5,
    z: 4,
  },
]

export function HadiCreativeVisuals() {
  return (
    <>
      <VisualWall
        pieces={hadiCreativePieces}
        leftLabel="Visual graphics"
        rightLabel="Campaigns and courses"
        boardClass="h-[58rem]"
      />
      <VisualWall
        pieces={hadiVideoPieces}
        leftLabel="Video content"
        rightLabel="Testimonials"
        boardClass="h-[42rem]"
      />
    </>
  )
}

const hadiChannels = ['LinkedIn', 'Facebook groups', 'Facebook creatives', 'Instagram reels', 'Instagram carousels']

const hadiReachPieces: VisualPiece[] = [
  {
    id: 'hadi-outcomes',
    src: '/hadi/outcomes.png',
    kind: 'Outcomes',
    note: '79,855 students enrolled, with certification, accommodation, internships, and success stories on the record.',
    left: '0%',
    top: '0%',
    width: '100%',
    rotate: -1,
    z: 1,
  },
  {
    id: 'hadi-search',
    src: '/hadi/search.png',
    kind: 'Search',
    note: '5.66K organic clicks and 65.4K impressions on Search across three months.',
    left: '0%',
    top: '0%',
    width: '100%',
    rotate: 1.2,
    z: 2,
  },
]

export function HadiReachVisuals() {
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeIndex = hadiReachPieces.findIndex((piece) => piece.id === activeId)
  const active = activeIndex >= 0 ? hadiReachPieces[activeIndex] : null

  useEffect(() => {
    if (!activeId) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeId])

  return (
    <div className="mt-8">
      <p className="max-w-4xl text-xl leading-relaxed text-slate-800 sm:text-2xl">
        These numbers were reached with a total ad spend of <span className="font-semibold text-emerald-900">Rs. 0</span>.
        Hadi is a funded NGO that was short on funds, and the growth was scaled organically through the channels below.
      </p>
      <ul className="mt-6 flex flex-wrap gap-3">
        {hadiChannels.map((channel) => (
          <li
            key={channel}
            className="rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-white sm:text-base"
          >
            {channel}
          </li>
        ))}
      </ul>
      <div className="mt-10 grid gap-6">
        {hadiReachPieces.map((piece) => (
          <motion.button
            key={piece.id}
            type="button"
            aria-label={`${piece.kind}. ${piece.note}`}
            onClick={() => setActiveId(piece.id)}
            className="cursor-pointer rounded-[1.5rem] bg-white p-3 text-left shadow-[0_18px_44px_rgba(6,78,59,0.12)] ring-1 ring-emerald-900/10"
            initial={false}
            whileHover={reduce ? undefined : { y: -6, rotate: 0 }}
            animate={{ rotate: reduce ? 0 : piece.rotate }}
            transition={{ duration: reduce ? 0 : 0.3, ease: easeOut }}
          >
            <img src={piece.src} alt="" className="h-auto w-full rounded-xl object-contain" />
          </motion.button>
        ))}
      </div>
      <Lightbox
        active={active}
        activeIndex={activeIndex}
        total={hadiReachPieces.length}
        onClose={() => setActiveId(null)}
        onStep={(direction) => {
          const piece = hadiReachPieces[activeIndex + direction]
          if (piece) setActiveId(piece.id)
        }}
        fixed
      />
    </div>
  )
}

function Lightbox({
  active,
  activeIndex,
  total,
  onClose,
  onStep,
  fixed,
}: {
  active: VisualPiece | null
  activeIndex: number
  total: number
  onClose: () => void
  onStep: (direction: -1 | 1) => void
  fixed: boolean
}) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className={cx(
            'z-40 flex items-center justify-center bg-white/82 p-4 backdrop-blur-sm sm:p-8',
            fixed ? 'fixed inset-0' : 'absolute inset-0 rounded-[2rem]',
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.figure
            key={active.id}
            className="relative w-full max-w-4xl"
            initial={{ y: 18, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: easeOut }}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={active.src}
              alt=""
              className="mx-auto max-h-[70vh] w-full rounded-[1.5rem] object-contain shadow-[0_24px_60px_rgba(15,23,42,0.2)]"
            />
            <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-3 text-center text-lg text-slate-700">
              <span
                className={cx(
                  'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white',
                  chipFor(active.kind).className,
                )}
              >
                {active.kind}
              </span>
              <span>{active.note}</span>
            </figcaption>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onStep(-1)}
                disabled={activeIndex <= 0}
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white text-slate-900 disabled:cursor-default disabled:opacity-40"
                aria-label="Previous frame"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-full px-4 py-2 text-base font-semibold text-purple-900"
              >
                Back to the wall
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                disabled={activeIndex >= total - 1}
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white text-slate-900 disabled:cursor-default disabled:opacity-40"
                aria-label="Next frame"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
