import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import RoughBox from './RoughBox'
import Pipeline from './Pipeline'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'ml', label: 'ML & AI', match: ['Machine Learning', 'Research', 'AI'] },
  { id: 'web', label: 'Web & backend', match: ['Full Stack', 'Web Development', 'Backend'] },
  { id: 'mobile', label: 'Mobile', match: ['Mobile Development'] },
]

const inFilter = (project, id) => {
  const f = FILTERS.find((x) => x.id === id)
  return !f?.match || f.match.some((m) => project.category?.includes(m))
}

function Links({ project }) {
  const items = [
    project.github && [project.githubLabel ?? 'Code', project.github],
    project.demo && ['Live demo', project.demo],
    project.video && ['Launch film', project.video],
  ].filter(Boolean)
  if (!items.length) return null
  return (
    <p className="mt-4 flex gap-5 text-sm">
      {items.map(([label, url]) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 font-medium text-accent transition-colors duration-150 hover:text-fg"
        >
          {label}
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
        </a>
      ))}
    </p>
  )
}

const meta = (p) => [p.category, p.duration, p.context].filter(Boolean).join(' · ')

const isLive = (status = '') => /live|deployed/i.test(status)

function Status({ status }) {
  if (!status) return null
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-fg-2">
      <span
        className={`h-1.5 w-1.5 rounded-full ${isLive(status) ? 'bg-positive' : 'bg-fg-3'}`}
        aria-hidden="true"
      />
      {status.toLowerCase()}
    </span>
  )
}

function FeaturedProject({ project }) {
  return (
    <RoughBox as="article" filter="sm" className="p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-xs leading-5 text-fg-3">{meta(project)}</p>
        <Status status={project.status} />
      </div>
      <h3 className="mt-1 text-xl font-medium text-fg">{project.title}</h3>
      <p className="mt-2 max-w-2xl text-base leading-7 text-fg-2">{project.description}</p>

      {project.film ? (
        <figure className="mt-6 overflow-hidden rounded-xl border border-line bg-[#111113]">
          <video
            src={`${project.film}#t=4`}
            controls
            playsInline
            preload="metadata"
            className="aspect-video w-full bg-[#111113]"
            aria-label={`${project.title} launch film`}
          />
          <figcaption className="border-t border-line px-4 py-2.5 text-xs text-fg-3">
            {project.filmCaption ?? "Launch film"}
          </figcaption>
        </figure>
      ) : null}

      {project.metrics?.length ? (
        <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dd className="font-marker text-[36px] font-semibold leading-none text-fg">{m.value}</dd>
              <dt className="mt-1 text-sm text-fg-3">{m.label}</dt>
            </div>
          ))}
        </dl>
      ) : null}

      {project.pipeline?.length ? (
        <div className="mt-6">
          <Pipeline stages={project.pipeline} size="sm" label={`How ${project.title} works`} />
        </div>
      ) : null}

      {project.highlights?.length ? (
        <ul className="mt-6 space-y-1.5 text-sm leading-6 text-fg-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span className="select-none text-fg-3" aria-hidden="true">–</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {project.technologies?.length ? (
        <p className="mt-5 border-t border-line pt-4 font-mono text-xs leading-5 text-fg-3">
          {project.technologies.join(' · ')}
        </p>
      ) : null}
      <Links project={project} />
    </RoughBox>
  )
}

function SmallProject({ project }) {
  return (
    <li className="grid gap-2 py-6 first:pt-0 sm:grid-cols-[160px_1fr] sm:gap-6">
      <p className="font-mono text-xs leading-6 text-fg-3">{project.duration ?? 'Ongoing'}</p>
      <div>
        <h4 className="text-base font-medium text-fg">{project.title}</h4>
        <p className="mt-1 text-sm leading-6 text-fg-2">{project.description}</p>
        {project.technologies?.length ? (
          <p className="mt-2 font-mono text-xs leading-5 text-fg-3">{project.technologies.join(' · ')}</p>
        ) : null}
        <Links project={project} />
      </div>
    </li>
  )
}

export default function Projects({ projects = [] }) {
  const [filter, setFilter] = useState('all')
  const visible = projects.filter((p) => inFilter(p, filter))
  const featured = visible.filter((p) => p.featured)
  const rest = visible.filter((p) => !p.featured)

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-24">
      <SectionHeading id="projects-title" title="Projects" />

      <div role="tablist" aria-label="Filter projects" className="mb-8 inline-flex gap-1 rounded-[10px] border border-line bg-card p-1">
        {FILTERS.map((f) => {
          const count = projects.filter((p) => inFilter(p, f.id)).length
          const active = filter === f.id
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.id)}
              className={`h-8 rounded-md px-3 text-sm transition-colors duration-150 ${
                active ? 'bg-raised font-medium text-fg' : 'text-fg-2 hover:text-fg'
              }`}
            >
              {f.label}
              <span className="ml-1.5 font-mono text-xs tabular-nums text-fg-3">{count}</span>
            </button>
          )
        })}
      </div>

      <div className="space-y-8">
        {featured.map((p) => (
          <FeaturedProject key={p.id} project={p} />
        ))}
      </div>

      {rest.length ? (
        <>
          <h3 className="mb-2 mt-12 text-sm font-medium text-fg">More projects</h3>
          <ul className="divide-y divide-line">
            {rest.map((p) => (
              <SmallProject key={p.id} project={p} />
            ))}
          </ul>
        </>
      ) : null}
    </section>
  )
}
