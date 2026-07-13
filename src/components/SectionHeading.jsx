// Section heading drawn like a marker label, with a hand-scribbled underline.
export default function SectionHeading({ id, label, title, hint }) {
  return (
    <header className="mb-6">
      <p className="wb-section-label">
        <span className="h-2 w-2 rotate-45 bg-blue-500" aria-hidden="true" />
        {label}
      </p>
      <div className="mt-1.5 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <h2
          id={id}
          className="font-marker text-4xl font-bold leading-none tracking-tight text-slate-900 dark:text-slate-100"
        >
          {title}
        </h2>
        {hint ? (
          <span className="font-pen text-sm text-slate-400 dark:text-slate-500">{hint}</span>
        ) : null}
      </div>
      {/* Hand-drawn underline */}
      <svg
        className="mt-2 h-2.5 w-44 text-blue-500"
        viewBox="0 0 200 10"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M2 6 C 40 2, 70 9, 110 4 S 180 2, 198 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </header>
  )
}
