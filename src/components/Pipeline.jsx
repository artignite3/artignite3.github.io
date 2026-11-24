import { useEffect, useRef, useState } from 'react'

// A system sketched on the whiteboard: stages in marker boxes joined by
// hand-drawn arrows. The arrows are the site's signature, used only here.
function Arrow() {
  return (
    <svg
      className="my-2 ml-2 h-4 w-8 shrink-0 rotate-90 text-accent sm:my-0 sm:ml-0 sm:rotate-0"
      viewBox="0 0 40 20"
      fill="none"
      aria-hidden="true"
      style={{ filter: 'url(#rough-line)' }}
    >
      <path d="M2 10 C 12 7, 24 13, 36 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M29 4 L37 10 L29 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Pipeline({ stages = [], size = 'lg', label }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  // Draw the stages in once, when the diagram scrolls into view.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const text = size === 'lg' ? 'text-[22px] px-4 py-1.5' : 'text-lg px-3 py-1'
  const last = stages.length - 1

  return (
    <figure ref={ref} aria-label={label ?? `Pipeline: ${stages.join(', then ')}`}>
      <ol className="flex flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-1 sm:gap-y-3">
        {stages.map((stage, i) => (
          <li
            key={stage}
            className={`flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-1 ${seen ? 'rise' : 'opacity-0'}`}
            style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}
          >
            <span
              className={`font-marker relative font-semibold leading-tight ${text} ${
                i === last ? 'text-accent' : i === 0 ? 'text-fg-2' : 'text-fg'
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-[10px]"
                style={{
                  filter: 'url(#rough-sm)',
                  border: `1.6px ${i === 0 ? 'dashed' : 'solid'} ${i === last ? 'var(--accent)' : 'var(--wb-ink)'}`,
                  background: i === last ? 'var(--accent-soft)' : 'var(--card)',
                }}
              />
              <span className="relative">{stage}</span>
            </span>
            {i < last ? <Arrow /> : null}
          </li>
        ))}
      </ol>
    </figure>
  )
}
