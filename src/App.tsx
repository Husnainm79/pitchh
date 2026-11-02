import { useState } from 'react'
import { AmbientGlow } from './components/AmbientGlow.tsx'
import { CaseStudyModal } from './components/CaseStudyModal.tsx'
import { Contact } from './components/Contact.tsx'
import { Header } from './components/Header.tsx'
import { Hero } from './components/Hero.tsx'
import { InboundSimulator } from './components/InboundSimulator.tsx'
import { StackedVault } from './components/StackedVault.tsx'
import type { WorkId } from './work.ts'

export default function App() {
  const [activeProject, setActiveProject] = useState<WorkId | null>(null)

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="deck-grid absolute inset-0" />
      </div>
      <AmbientGlow />

      <div className="relative z-10 bg-gradient-to-b from-emerald-950 via-slate-950 to-black">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-yellow-400 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-black"
        >
          Skip to work
        </a>
        <Header />
        <main>
          <Hero />
          <StackedVault onOpen={setActiveProject} />
          <InboundSimulator />
          <Contact />
        </main>
        <footer className="border-t border-white/5 px-5 py-8 lg:px-10">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-medium text-slate-300">Branding · Selected work</p>
            <p>Executive brands · Content engines · Inbound systems</p>
          </div>
        </footer>
      </div>

      <CaseStudyModal projectId={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  )
}
