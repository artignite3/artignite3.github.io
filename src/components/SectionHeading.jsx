// Marker heading with an optional quiet note beside it.
export default function SectionHeading({ id, title, note }) {
  return (
    <header className="mb-8 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h2 id={id} className="font-marker text-[40px] font-semibold leading-none text-fg">
        {title}
      </h2>
      {note ? <p className="text-sm text-fg-3">{note}</p> : null}
    </header>
  )
}
