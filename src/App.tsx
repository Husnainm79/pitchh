import { CaseStudies } from './components/CaseStudies.tsx'
import { Header } from './components/Header.tsx'
import { Portfolio } from './components/Portfolio.tsx'
import { Philosophy } from './components/Philosophy.tsx'
import { ProgressRail } from './components/ProgressRail.tsx'
import { SectionWipe } from './components/SignatureMotion.tsx'

export default function App() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="deck-grid absolute inset-0" />
      </div>

      <div className="relative">
        <a
          href="#case-studies"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to proposal
        </a>
        <Header />
        <ProgressRail />
        <main>
          <CaseStudies />
          <SectionWipe label="Into the model" />
          <Philosophy />
          <SectionWipe label="Into the proof of work" />
          <Portfolio />
        </main>
        <footer className="border-t border-slate-200 px-5 py-8 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-medium text-slate-900">Agency Growth Engine · Executive Pitch</p>
            <p>Demo interactive experience · LinkedIn and Instagram demand</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
