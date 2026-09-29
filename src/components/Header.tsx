import { Code2 } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-900 text-white shadow-sm">
            <Code2 className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="truncate text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
            AGENCY GROWTH ENGINE
            <span className="font-normal text-slate-300"> | </span>
            <span className="font-medium text-slate-700">Executive Pitch</span>
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-purple-900 px-4 py-2 text-sm font-medium text-white shadow-sm">
          [ B2B Demand Generation Model ]
        </span>
      </div>
    </header>
  )
}
