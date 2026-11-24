import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import SectionHeading from './SectionHeading'

export default function Contact({ contact = {}, links = [] }) {
  const { email, phone, description } = contact
  const [copied, setCopied] = useState(false)
  const profiles = links.filter((l) => l.icon !== 'resume')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {}
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24">
      <SectionHeading id="contact-title" title="Contact" />
      <p className="max-w-xl text-base leading-7 text-fg-2">{description}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${email}`}
          className="break-all text-2xl font-medium text-fg underline decoration-line decoration-2 underline-offset-[6px] transition-colors duration-150 hover:decoration-accent"
        >
          {email}
        </a>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy email address"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-line bg-card px-2.5 text-xs text-fg-2 transition-colors duration-150 hover:text-fg"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-positive" strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          )}
          <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <p className="mt-4 text-sm text-fg-2">
        {phone ? (
          <>
            <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="tabular-nums hover:text-fg">
              {phone}
            </a>
            {profiles.length ? ' · ' : ''}
          </>
        ) : null}
        {profiles.map((l, i) => (
          <span key={l.label}>
            <a href={l.url} target="_blank" rel="noreferrer noopener" className="hover:text-fg">
              {l.label}
            </a>
            {i < profiles.length - 1 ? ' · ' : ''}
          </span>
        ))}
      </p>
    </section>
  )
}
