import { useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Globe,
  Linkedin,
  Building2,
  Instagram,
  Github,
  File,
  FileUser
} from "lucide-react";
import RoughBox from './RoughBox'

import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineWorkOutline } from "react-icons/md";
import { MdOutlineWorkHistory } from "react-icons/md";

const LINK_ICONS = {
  twitter: FaXTwitter,
  X: FaXTwitter,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  globe: Globe,
  resume: FileUser,
};

// Real profile photo in a slightly-tilted, hand-drawn frame. Falls back to
// the name's initials on a gradient if the image is missing or fails to load.
function Avatar({ identity }) {
  const [failed, setFailed] = useState(false)
  const showPhoto = identity.photo && !failed

  return (
    <div
      className="relative h-20 w-20 shrink-0 -rotate-2 bg-[var(--wb-paper)] p-1 shadow-md"
      style={{ filter: 'url(#rough-sm)' }}
    >
      {showPhoto ? (
        <img
          src={identity.photo}
          alt={`Portrait of ${identity.name}`}
          loading="eager"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-violet-600 font-marker text-3xl font-bold text-white"
          aria-hidden="true"
        >
          {identity.avatarInitials}
        </div>
      )}
    </div>
  )
}

export default function IdentityPanel({ identity, metrics = [] }) {
  return (
    <aside
      className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[35%] lg:flex-col lg:self-start lg:overflow-y-auto lg:overscroll-contain lg:px-10 lg:py-12 [contain:paint]"
      aria-label="Profile identity"
    >
      <div className="relative mx-auto w-full max-w-md px-5 py-8 sm:px-8 lg:mx-0 lg:my-auto lg:px-0">
        {/* The ID badge, drawn & hand-pinned to the canvas */}
        <div className="relative" style={{ transform: 'rotate(-1deg)' }}>
          {/* Pushpin */}
          <span
            className="absolute left-1/2 top-1 z-20 hidden h-4 w-4 -translate-x-1/2 rounded-full bg-rose-500 shadow ring-4 ring-rose-200/70 lg:block"
            aria-hidden="true"
          />

          <RoughBox filter="sm" color="#334155" className="p-6 sm:p-8">
            {/* Avatar + tag */}
            <div className="flex items-center gap-4">
              <Avatar identity={identity} />
              <span
                className="inline-flex items-center gap-1.5 bg-green-50 px-3 py-1 font-marker text-base font-bold text-green-700"
                style={{ filter: 'url(#rough-md)' }}
              >
                <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
                CSE · IIT Patna
              </span>
            </div>

            <h1 className="font-marker mt-5 text-4xl font-bold leading-none tracking-tight text-slate-900 dark:text-slate-100">
              {identity.name}
            </h1>
            <p className="font-pen mt-2 text-[15px] font-bold text-blue-700">
              {identity.designation}
            </p>
            <p className="font-pen text-[15px] text-slate-500 dark:text-slate-400">{identity.department}</p>

            {identity.tagline ? (
              <p className="font-pen mt-4 border-l-[3px] border-amber-300 pl-3 text-[15px] italic leading-relaxed text-slate-500">
                {identity.tagline}
              </p>
            ) : null}

            {/* Contact */}
            <ul className="mt-5 space-y-2.5">
              <li>
                <a
                  href={`mailto:${identity.email}`}
                  className="font-pen group flex items-center gap-2.5 text-[15px] text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400"
                >
                  <Mail className="h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" aria-hidden="true" />
                  <span className="truncate">{identity.email}</span>
                </a>
              </li>
              {identity.phone ? (
                <li>
                  <a
                    href={`tel:${identity.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-pen group flex items-center gap-2.5 text-[15px] text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400"
                  >
                    <Phone className="h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" aria-hidden="true" />
                    <span>{identity.phone}</span>
                  </a>
                </li>
              ) : null}
              {identity.location ? (
                <li className="font-pen flex items-center gap-2.5 text-[15px] text-slate-600 dark:text-slate-400">
                  <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                  <span>{identity.location}</span>
                </li>
              ) : null}
            </ul>

            {/* Metrics */}
            {metrics.length ? (
              <dl className="mt-6 grid grid-cols-3 gap-2 border-t-2 border-dashed border-slate-200 pt-5">
                {metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="font-marker text-2xl font-bold text-slate-900 dark:text-slate-100">{m.value}</dd>
                    <p className="font-pen mt-0.5 text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                      {m.label}
                    </p>
                  </div>
                ))}
              </dl>
            ) : null}

            {/* External links */}
            {identity.links?.length ? (
              <div className="mt-6 flex flex-wrap gap-2.5">
                {identity.links.map((link) => {
                  const Icon = LINK_ICONS[link.icon] ?? Globe
                  return (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-pen inline-flex items-center gap-1.5 bg-[var(--wb-paper)] px-3 py-1.5 text-sm font-bold text-slate-600 dark:text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-slate-800 dark:hover:text-blue-300"
                      style={{ filter: 'url(#rough-md)', border: '1.4px solid var(--wb-ink)' }}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {link.label}
                    </a>
                  )
                })}
              </div>
            ) : null}
          </RoughBox>
        </div>
      </div>
    </aside>
  )
}
