import { useEffect, useState } from 'react'
import { Menu, Moon, Search, Sun, X } from 'lucide-react'

export const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Toolbox' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const iconBtn =
  'inline-flex h-8 w-8 items-center justify-center rounded-md border border-line bg-card text-fg-2 transition-colors duration-150 hover:text-fg'

export default function MainNav({ name, isDark, onToggleTheme, onOpenPalette }) {
  const [active, setActive] = useState(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
        scrolled ? 'border-line backdrop-blur' : 'border-transparent'
      }`}
      style={scrolled ? { backgroundColor: 'color-mix(in srgb, var(--bg) 88%, transparent)' } : undefined}
    >
      <nav aria-label="Primary" className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" onClick={(e) => go(e, 'top')} className="text-base font-semibold text-fg">
          {name}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => go(e, s.id)}
                aria-current={active === s.id ? 'true' : undefined}
                className={`rounded-md px-2.5 py-1.5 text-sm transition-colors duration-150 ${
                  active === s.id ? 'font-medium text-fg' : 'text-fg-2 hover:text-fg'
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command menu"
            className="hidden h-8 items-center gap-2 rounded-md border border-line bg-card pl-2.5 pr-1.5 text-sm text-fg-2 transition-colors duration-150 hover:text-fg sm:inline-flex"
          >
            <Search className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            Jump to
            <span className="flex gap-0.5">
              <kbd className="keycap">{isMac ? '⌘' : 'Ctrl'}</kbd>
              <kbd className="keycap">K</kbd>
            </span>
          </button>
          <button type="button" onClick={onOpenPalette} aria-label="Open command menu" className={`${iconBtn} sm:hidden`}>
            <Search className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button type="button" onClick={onToggleTheme} aria-label="Toggle theme" className={iconBtn}>
            {isDark ? <Sun className="h-4 w-4" strokeWidth={1.5} /> : <Moon className="h-4 w-4" strokeWidth={1.5} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`${iconBtn} lg:hidden`}
          >
            {open ? <X className="h-4 w-4" strokeWidth={1.5} /> : <Menu className="h-4 w-4" strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-line bg-bg transition-[opacity] duration-200 lg:hidden ${
          open ? 'opacity-100' : 'hidden opacity-0'
        }`}
      >
        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-1 px-5 py-3 sm:px-8">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => go(e, s.id)}
                className={`block rounded-md px-3 py-2 text-sm ${
                  active === s.id ? 'bg-raised font-medium text-fg' : 'text-fg-2'
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
