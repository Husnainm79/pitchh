import { Distribution } from './Distribution.tsx'
import { Pillars } from './Pillars.tsx'
import { SignatureEntrance, SignatureItem } from './SignatureMotion.tsx'

export function Philosophy() {
  return (
    <section id="pillars" className="relative border-t border-slate-200 bg-white px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SignatureEntrance>
          <SignatureItem>
            <Pillars />
          </SignatureItem>
        </SignatureEntrance>

        <SignatureEntrance className="mt-16 lg:mt-20" stagger={0.12}>
          <SignatureItem>
            <Distribution />
          </SignatureItem>
        </SignatureEntrance>
      </div>
    </section>
  )
}
