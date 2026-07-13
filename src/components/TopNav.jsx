import { useEffect, useState } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'

// Every section the nav can jump to. `num` gives the friend-site style
// "01 / 02 / ..." index without hardcoding it in the markup.
const SECTIONS = [
  { id: 'AboutUs', label: 'About' },
  { id: 'interests', label: 'Interests' },
  { id: 'atlas', label: 'Atlas' },
  { id: 'edge', label: 'Edge AI' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'coursework', label: 'Courses' },
  { id: 'contact', label: 'Contact' },
].map((s, i) => ({ ...s, num: String(i + 1).padStart(2, '0') }))

// Sticky, responsive site header. Replaces the old hard-to-find sidebar nav:
//  - always visible at the top on every screen size
//  - highlights the section currently in view (scrollspy)
//  - collapses to a slide-down menu on mobile
//  - carries the brand and the light/dark toggle
export default function TopNav({ name, isDark, onToggleTheme }) {
  const [active, setActive] = useState(SECTIONS[0].id)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // 'up' | 'down' — drives the brand's scroll-reactive styling.
  const [scrollDir, setScrollDir] = useState('up')
  // 0..1 — how far down the page we are, for the brand's progress underline.
  const [progress, setProgress] = useState(0)

  // Scrollspy: mark the section nearest the top of the viewport as active.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      // Fraction of the page scrolled (0 at top, 1 at the very bottom).
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, y / max) : 0)
      // Ignore tiny jitters so the direction only flips on real movement.
      if (Math.abs(y - lastY) > 4) {
        setScrollDir(y > lastY ? 'down' : 'up')
        lastY = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const brand = 'Riddhu'

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-slate-200/80 bg-[var(--wb-bg)]/85 backdrop-blur-md dark:border-slate-700/70'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3 sm:px-8"
      >
        {/* Brand — reacts to scroll direction: tilts + shrinks when scrolling
            down, springs back upright (and slightly larger) when scrolling up. */}
        <a
          href="#top"
          onClick={(e) => go(e, 'top')}
          className={`font-marker group relative shrink-0 origin-left font-bold tracking-tight text-slate-900 transition-all duration-500 ease-out dark:text-slate-100 ${
            scrolled && scrollDir === 'down'
              ? 'rotate-[-3deg] scale-90 text-xl opacity-90'
              : 'rotate-0 scale-100 text-2xl opacity-100'
          }`}
        >
          <span
            className={`inline-block text-blue-600 transition-transform duration-500 ease-out dark:text-blue-400 ${
              scrollDir === 'up' ? '-translate-x-0.5 -rotate-12' : 'translate-x-0 rotate-0'
            }`}
          >
            {'{'}
          </span>
          {brand}
          <span
            className={`inline-block text-blue-600 transition-transform duration-500 ease-out dark:text-blue-400 ${
              scrollDir === 'up' ? 'translate-x-0.5 rotate-12' : 'translate-x-0 rotate-0'
            }`}
          >
            {'}'}
          </span>
          {/* Hand-drawn underline that "draws itself in" as you scroll the page. */}
          <svg
            className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full text-blue-500 dark:text-blue-400"
            viewBox="0 0 100 8"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M1 5 C 25 1, 50 7, 75 3 S 96 4, 99 5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - progress}
              style={{ transition: 'stroke-dashoffset 150ms linear' }}
            />
          </svg>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {SECTIONS.map((s) => {
            const isActive = active === s.id
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => go(e, s.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`font-pen group relative flex items-center gap-1 px-2.5 py-1.5 text-[14px] font-bold transition-colors ${
                    isActive
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  <span
                    className={`font-marker text-xs ${
                      isActive ? 'text-blue-500 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {s.num}
                  </span>
                  {s.label}
                  {/* Hand-drawn active underline */}
                  {isActive && (
                    <svg
                      className="absolute -bottom-0.5 left-2 right-2 h-1.5 text-blue-500 dark:text-blue-400"
                      viewBox="0 0 100 8"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path d="M1 5 C 25 1, 50 7, 75 3 S 96 4, 99 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
            className="group relative flex h-9 w-9 items-center justify-center bg-white text-slate-600 transition-colors hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-amber-300"
          >
            <div 
              className="absolute inset-0 z-0 bg-white transition-colors dark:bg-slate-800" 
              style={{ 
                filter: 'url(#rough-sm)', 
                border: '1.4px solid currentColor',
              }} 
            />
            <div className="relative z-10">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </div>
          </button>
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-9 w-9 items-center justify-center bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-200 lg:hidden"
            style={{ filter: 'url(#rough-sm)', border: '1.6px solid var(--wb-ink)' }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-dashed border-slate-300 bg-[var(--wb-bg)]/95 backdrop-blur-md transition-[max-height,opacity] duration-300 dark:border-slate-700 lg:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="grid grid-cols-2 gap-1 px-5 py-4 sm:px-8">
          {SECTIONS.map((s) => {
            const isActive = active === s.id
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => go(e, s.id)}
                  className={`font-pen flex items-center gap-2 rounded-lg px-3 py-2.5 text-[15px] font-bold transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="font-marker text-sm text-slate-400 dark:text-slate-500">{s.num}</span>
                  {s.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}