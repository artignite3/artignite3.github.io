import { ArrowUpRight, FileText, Mail } from 'lucide-react'
import RoughBox from './RoughBox'
import Pipeline from './Pipeline'
import TraceReplay from './TraceReplay'

export default function Intro({ identity, research }) {
  const resume = identity.links?.find((l) => l.icon === 'resume')
  const profiles = identity.links?.filter((l) => l.icon !== 'resume') ?? []

  return (
    <section id="intro" aria-label="Introduction" className="pt-12 sm:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div className="rise">
          {identity.status ? (
            <p className="mb-4 flex items-center gap-2 text-sm text-fg-2">
              <span className="h-1.5 w-1.5 rounded-full bg-positive" aria-hidden="true" />
              {identity.status}
            </p>
          ) : null}
          <h1 className="font-marker text-[52px] font-semibold leading-none text-fg sm:text-[72px]">
            {identity.name}
          </h1>
          <p className="mt-4 text-xl leading-8 text-fg">{identity.tagline}</p>
          <p className="mt-3 text-sm leading-6 text-fg-2">{identity.role}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {resume ? (
              <a
                href={resume.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-fg px-5 text-sm font-medium text-bg transition-[opacity,transform] duration-150 ease-out hover:opacity-90 active:scale-[0.98]"
              >
                <FileText className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                Resume
              </a>
            ) : null}
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-card px-5 text-sm font-medium text-fg transition-[background-color,transform] duration-150 ease-out hover:bg-raised active:scale-[0.98]"
            >
              <Mail className="h-4 w-4 text-fg-2" strokeWidth={1.5} aria-hidden="true" />
              Email me
            </a>
          </div>

          {profiles.length ? (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {profiles.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-fg-2 transition-colors duration-150 hover:text-fg"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5 text-fg-3" strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <TraceReplay />
      </div>

      {research?.pipeline ? (
        <RoughBox filter="sm" className="mt-16 p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="font-marker text-[28px] font-semibold leading-none text-fg">On the whiteboard right now</p>
            <p className="font-mono text-xs text-fg-3">{research.duration}</p>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-fg-2">{research.overview}</p>
          <div className="mt-6">
            <Pipeline stages={research.pipeline} />
          </div>
          <p className="mt-6 border-t border-line pt-4 font-mono text-xs leading-5 text-fg-3">
            {[research.lab && `${research.lab} · ${research.advisor}`, ...(research.datasets ?? []), research.paperStatus]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </RoughBox>
      ) : null}
    </section>
  )
}
