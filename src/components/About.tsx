import { studio } from '../studio.ts'
import { SignatureEntrance, SignatureItem } from './SignatureMotion.tsx'

export function About() {
  return (
    <section id="about" className="relative border-t border-white/10 px-5 py-20 lg:px-10 lg:py-28">
      <SignatureEntrance className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <SignatureItem>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
            About
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
            Branding that creates inbound.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
            {studio.about}
          </p>
        </SignatureItem>
        <SignatureItem>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {studio.services.map((service) => (
              <li
                key={service}
                className="border-b border-white/10 py-4 text-lg font-medium text-slate-200 last:border-b-0"
              >
                {service}
              </li>
            ))}
          </ul>
        </SignatureItem>
      </SignatureEntrance>
    </section>
  )
}
