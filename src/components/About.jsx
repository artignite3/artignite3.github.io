import { useState } from 'react'
import SectionHeading from './SectionHeading'

function PinnedPhoto({ identity }) {
  const [failed, setFailed] = useState(false)
  if (!identity?.photo || failed) return null

  return (
    <figure className="relative w-36 shrink-0 rotate-2 sm:w-44">
      <span
        className="absolute -top-2 left-1/2 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-accent ring-4 ring-accent-soft"
        aria-hidden="true"
      />
      <div className="rounded-md border border-line bg-card p-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
        <img
          src={identity.photo}
          alt={`Portrait of ${identity.name}`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="aspect-square w-full rounded object-cover"
        />
        <figcaption className="font-marker pt-1.5 text-center text-lg leading-none text-fg-3">IIT Patna</figcaption>
      </div>
    </figure>
  )
}

export default function About({ identity, biography, focus = [], learning = [] }) {
  const rows = [
    ['Focus', focus],
    ['Learning now', learning],
  ].filter(([, items]) => items.length)

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24">
      <SectionHeading id="about-title" title="About" />

      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
        <p className="max-w-2xl text-base leading-7 text-fg-2">{biography}</p>
        <PinnedPhoto identity={identity} />
      </div>

      <dl className="mt-10 space-y-3">
        {rows.map(([label, items]) => (
          <div key={label} className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-6">
            <dt className="text-sm font-medium text-fg">{label}</dt>
            <dd className="text-sm leading-6 text-fg-2">{items.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
