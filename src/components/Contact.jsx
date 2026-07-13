import { useState } from 'react'
import { MapPin, Clock, Mail, Send, DoorOpen, CalendarCheck, Phone } from 'lucide-react'
import SectionHeading from './SectionHeading'
import RoughBox from './RoughBox'

// Builds a mailto: link from the form fields so "Send message" opens the
// visitor's own email client pre-addressed to the professor. No backend.
function buildMailto(email, { name, from, subject, message }) {
  const body = [
    message,
    '',
    '—',
    name ? `From: ${name}` : null,
    from ? `Email: ${from}` : null,
  ]
    .filter(Boolean)
    .join('\n')
  const subj = subject || `Portfolio enquiry from ${name || 'a visitor'}`
  // Encode manually with encodeURIComponent (not URLSearchParams, which turns
  // spaces into "+" that many mail clients render literally in the body).
  return `mailto:${email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`
}

function OfficeDetails({ office, email, phone }) {
  return (
    <RoughBox filter="sm" tilt="l" className="p-6">
      <h3 className="font-marker flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
        <DoorOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
        Office & Availability
      </h3>

      {/* Live availability chip */}
      {office?.status ? (
        <span
          className="mt-3 inline-flex items-center gap-2 bg-green-50 px-3 py-1 font-marker text-sm font-bold text-green-700 dark:bg-green-500/15 dark:text-green-300"
          style={{ filter: 'url(#rough-md)' }}
        >
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          {office.status}
        </span>
      ) : null}

      <dl className="mt-5 space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" aria-hidden="true" />
          <div>
            <dt className="font-pen text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">Location</dt>
            <dd className="font-pen text-[15px] font-bold text-slate-800 dark:text-slate-200">{office?.room}</dd>
            <dd className="font-pen text-[15px] text-slate-500 dark:text-slate-400">{office?.department}</dd>
            <dd className="font-pen text-[15px] text-slate-500 dark:text-slate-400">{office?.address}</dd>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
          <div>
            <dt className="font-pen text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">Availability</dt>
            {office?.hours?.map((h) => (
              <dd key={h.days} className="font-pen text-[15px] text-slate-700 dark:text-slate-300">
                <span className="font-bold">{h.days}</span> · {h.time}
              </dd>
            ))}
            {office?.note ? (
              <dd className="font-pen mt-1 flex items-center gap-1.5 text-[14px] italic text-slate-500 dark:text-slate-400">
                <CalendarCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                {office.note}
              </dd>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t-2 border-dashed border-slate-200 pt-4 dark:border-slate-700 sm:flex-row sm:flex-wrap sm:gap-x-5">
          <a
            href={`mailto:${email}`}
            className="font-pen group inline-flex items-center gap-2 text-[15px] font-bold text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300"
          >
            <Mail className="h-4 w-4 text-slate-400 group-hover:text-blue-600" aria-hidden="true" />
            {email}
          </a>
          {phone ? (
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="font-pen group inline-flex items-center gap-2 text-[15px] font-bold text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300"
            >
              <Phone className="h-4 w-4 text-slate-400 group-hover:text-blue-600" aria-hidden="true" />
              {phone}
            </a>
          ) : null}
        </div>
      </dl>
    </RoughBox>
  )
}

function MessageForm({ email }) {
  const [form, setForm] = useState({ name: '', from: '', subject: '', message: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    window.location.href = buildMailto(email, form)
  }

  const field =
    'font-pen w-full bg-white px-3 py-2.5 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500'
  const fieldStyle = { filter: 'url(#rough-sm)', border: '1.5px solid var(--wb-ink)' }

  return (
    <RoughBox filter="sm" tilt="r" className="p-6">
      <h3 className="font-marker flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
        <Send className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
        Send a Message
      </h3>
      <p className="font-pen mt-1 text-[14px] text-slate-500 dark:text-slate-400">
        This opens your email app with the message ready to send.
      </p>

      <form className="mt-4 space-y-3" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="sr-only">Your name</span>
            <input
              type="text"
              required
              value={form.name}
              onChange={set('name')}
              placeholder="Your name"
              className={field}
              style={fieldStyle}
            />
          </label>
          <label className="block">
            <span className="sr-only">Your email</span>
            <input
              type="email"
              required
              value={form.from}
              onChange={set('from')}
              placeholder="you@example.com"
              className={field}
              style={fieldStyle}
            />
          </label>
        </div>
        <label className="block">
          <span className="sr-only">Subject</span>
          <input
            type="text"
            value={form.subject}
            onChange={set('subject')}
            placeholder="Subject"
            className={field}
            style={fieldStyle}
          />
        </label>
        <label className="block">
          <span className="sr-only">Message</span>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={set('message')}
            placeholder="Write your message…"
            className={`${field} resize-y`}
            style={fieldStyle}
          />
        </label>
        <button
          type="submit"
          className="font-marker inline-flex items-center gap-2 bg-blue-600 px-5 py-2 text-lg font-bold text-white transition-transform hover:-translate-y-0.5 dark:bg-blue-500"
          style={{ filter: 'url(#rough-sm)' }}
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Send Message
        </button>
      </form>
    </RoughBox>
  )
}

export default function Contact({ contact }) {
  const { office, email, phone } = contact || {};
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24">
      <SectionHeading id="contact-title" label="// get in touch" title="Contact" hint="./reach-out" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <OfficeDetails office={office} email={email} phone={phone} />
        <MessageForm email={email} />
      </div>
    </section>
  )
}