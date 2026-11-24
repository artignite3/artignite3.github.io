import SectionHeading from './SectionHeading'

// A dated list: mono dates in one column, the work in the other.
function Row({ date, children }) {
  return (
    <li className="grid gap-2 py-6 first:pt-0 sm:grid-cols-[160px_1fr] sm:gap-6">
      <p className="font-mono text-xs leading-6 text-fg-3">{date}</p>
      <div>{children}</div>
    </li>
  )
}

export default function Experience({ experience = [], positions = [], leadership = [] }) {
  const describe = (title) => leadership.find((l) => l.position === title)?.description

  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-24">
      <SectionHeading id="experience-title" title="Experience" />

      <ul className="divide-y divide-line">
        {experience.map((job) => (
          <Row key={job.id} date={job.duration}>
            <h3 className="text-base font-medium text-fg">{job.role}</h3>
            <p className="text-sm text-fg-2">
              {job.institution}
              {job.advisor ? ` · with ${job.advisor}` : ''}
            </p>
            <ul className="mt-3 space-y-1.5 text-sm leading-6 text-fg-2">
              {job.description?.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="select-none text-fg-3" aria-hidden="true">–</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            {job.technologies?.length ? (
              <p className="mt-3 font-mono text-xs leading-5 text-fg-3">{job.technologies.join(' · ')}</p>
            ) : null}
          </Row>
        ))}
      </ul>

      {positions.length ? (
        <>
          <h3 className="mb-2 mt-12 text-sm font-medium text-fg">On campus</h3>
          <ul className="divide-y divide-line">
            {positions.map((p) => (
              <li key={p.title + p.organization} className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
                <p className="font-mono text-xs leading-6 text-fg-3">{p.duration}</p>
                <div>
                  <p className="text-sm text-fg">
                    <span className="font-medium">{p.title}</span>
                    <span className="text-fg-2"> · {p.organization}</span>
                  </p>
                  {describe(p.title) ? <p className="mt-0.5 text-sm leading-6 text-fg-2">{describe(p.title)}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  )
}
