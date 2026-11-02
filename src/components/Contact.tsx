import { ArrowUpRight } from 'lucide-react'
import { studio } from '../studio.ts'
import { SignatureEntrance, SignatureItem } from './SignatureMotion.tsx'

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-emerald-500/10 px-5 py-20 lg:px-10 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_100%,rgba(6,78,59,0.25),transparent_50%)]"
        aria-hidden="true"
      />
      <SignatureEntrance className="mx-auto max-w-[1400px]">
        <SignatureItem>
          <p className="font-poppins text-xs font-semibold tracking-[0.22em] text-emerald-400/80 uppercase">
            Contact
          </p>
          <h2 className="mt-4 max-w-3xl font-poppins text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Start a project with us.
          </h2>
          <p className="mt-6 max-w-xl font-poppins text-lg font-medium leading-relaxed text-slate-300 sm:text-xl">
            {studio.blurb}
          </p>
        </SignatureItem>
        <SignatureItem>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href={studio.contact.href}
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-7 py-4 font-poppins text-base font-bold text-black shadow-lg shadow-yellow-500/20 transition-colors hover:bg-yellow-300"
            >
              {studio.contact.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${studio.contact.email}`}
              className="font-poppins text-base font-medium text-slate-400 underline-offset-4 transition-colors hover:text-yellow-400 hover:underline"
            >
              {studio.contact.email}
            </a>
          </div>
        </SignatureItem>
      </SignatureEntrance>
    </section>
  )
}
