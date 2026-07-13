import SectionHeading from './SectionHeading'

// Map accent -> warm sticky-note paper colors (Excalidraw highlight palette).
const NOTE_PAPER = {
  blue: { bg: '#dbeafe', fold: '#bfdbfe', ink: '#1e40af', pin: '#3b82f6' },
  teal: { bg: '#ccfbf1', fold: '#99f6e4', ink: '#0f766e', pin: '#14b8a6' },
  violet: { bg: '#ede9fe', fold: '#ddd6fe', ink: '#5b21b6', pin: '#8b5cf6' },
  amber: { bg: '#fef3c7', fold: '#fde68a', ink: '#92400e', pin: '#f59e0b' },
  green: { bg: '#dcfce7', fold: '#bbf7d0', ink: '#15803d', pin: '#22c55e' },
  rose: { bg: '#ffe4e6', fold: '#fecdd3', ink: '#9f1239', pin: '#f43f5e' },
  slate: { bg: '#f1f5f9', fold: '#e2e8f0', ink: '#334155', pin: '#94a3b8' },
}

const paperOf = (name) => NOTE_PAPER[name] ?? NOTE_PAPER.slate

// Research areas as square Post-it notes: folded corner, hand-pinned tilt,
// a pushpin, drawn with the rough ink border.
export default function Interests({ interests = [] }) {
  return (
    <section id="interests" aria-labelledby="research-title" className="scroll-mt-8">
      <SectionHeading
        id="research-title"
        label="// focus areas"
        title="Interests"
        hint={`${interests.length} notes pinned`}
      />
      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        {interests.map((item, i) => {
          const label = typeof item === 'string' ? item : item.label
          const accentName =
            typeof item === 'object' && item.accent
              ? item.accent
              : ['blue', 'teal', 'violet', 'amber', 'green', 'rose'][i % 6]
          const p = paperOf(accentName)
          const tilt = i % 2 === 0 ? '-2deg' : '1.5deg'

          return (
            <li
              key={label}
              className="group relative transition-transform duration-200 hover:!rotate-0 hover:-translate-y-1"
              style={{ transform: `rotate(${tilt})` }}
            >
              {/* Pushpin */}
              <span
                className="absolute left-1/2 top-1.5 z-10 h-3 w-3 -translate-x-1/2 rounded-full shadow-sm ring-2 ring-white"
                style={{ backgroundColor: p.pin }}
                aria-hidden="true"
              />
              {/* Note body */}
              <div
                className="relative flex aspect-square items-center justify-center overflow-hidden p-4 text-center shadow-md"
                style={{ backgroundColor: p.bg, filter: 'url(#rough-md)' }}
              >
                <span
                  className="font-marker text-xl font-bold leading-tight"
                  style={{ color: p.ink }}
                >
                  {label}
                </span>
              </div>
              {/* Folded corner */}
              <span
                className="absolute bottom-0 right-0 h-5 w-5"
                style={{
                  background: `linear-gradient(135deg, transparent 50%, ${p.fold} 50%)`,
                }}
                aria-hidden="true"
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
