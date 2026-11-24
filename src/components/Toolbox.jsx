import SectionHeading from './SectionHeading'

export default function Toolbox({ skills = {}, coursework = [] }) {
  const rows = [
    ['Languages', skills.languages],
    ['ML & AI', skills.machineLearning],
    ['Agents & LLMs', skills.agents],
    ['Web', [...(skills.frontend ?? []), ...(skills.backend ?? [])]],
    ['Mobile', skills.mobileDevelopment],
    ['Databases', skills.databases],
    ['Tools', skills.cloudAndTools],
    ['Coursework', coursework],
  ].filter(([, items]) => items?.length)

  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-24">
      <SectionHeading id="skills-title" title="Toolbox" />
      <dl className="divide-y divide-line border-y border-line">
        {rows.map(([label, items]) => (
          <div key={label} className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
            <dt className="text-sm font-medium text-fg">{label}</dt>
            <dd className="text-sm leading-6 text-fg-2">{items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
