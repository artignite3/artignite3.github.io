import SectionHeading from './SectionHeading'

const hasYear = (y) => /\d/.test(y ?? '')

export default function Education({ education = [], achievements = [] }) {
  return (
    <section id="education" aria-labelledby="education-title" className="scroll-mt-24">
      <SectionHeading id="education-title" title="Education & awards" />

      <ul className="divide-y divide-line">
        {education.map((e) => (
          <li key={e.degree} className="grid gap-1 py-4 first:pt-0 sm:grid-cols-[160px_1fr] sm:gap-6">
            <p className="font-mono text-xs leading-6 text-fg-3">{e.duration}</p>
            <div>
              <p className="text-base font-medium text-fg">{e.degree}</p>
              <p className="text-sm text-fg-2">{e.institution}</p>
              {e.score ? <p className="mt-1 text-sm tabular-nums text-fg">{e.score}</p> : null}
            </div>
          </li>
        ))}
      </ul>

      {achievements.length ? (
        <>
          <h3 className="mb-2 mt-12 text-sm font-medium text-fg">Awards</h3>
          <ul className="divide-y divide-line">
            {achievements.map((a) => (
              <li key={a.id} className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
                <p className="font-mono text-xs leading-6 text-fg-3">{hasYear(a.year) || a.year === 'School' ? a.year : ''}</p>
                <div>
                  <p className="text-sm font-medium text-fg">{a.title}</p>
                  <p className="text-sm leading-6 text-fg-2">{a.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  )
}
