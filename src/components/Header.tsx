const links = [
  { href: '#work', label: 'Work' },
  { href: '#simulator', label: 'Simulator' },
  { href: '#contact', label: 'Contact' },
] as const

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-500/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 lg:px-10">
        <a href="#top" className="font-poppins text-lg font-bold tracking-tight text-white sm:text-xl">
          Portfolio
        </a>
        <nav aria-label="Primary" className="flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white sm:px-4"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
