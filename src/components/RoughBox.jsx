// A hand-drawn container. The wavy border is a separate absolutely-positioned
// layer that gets the SVG displacement filter, so the CHILDREN (text, icons)
// stay perfectly crisp while only the "ink" outline wobbles.
//
// Props:
//   as        - wrapper element/component (default 'div')
//   filter    - 'sm' | 'md'  (which rough filter to use)
//   tilt      - 'l' | 'r' | null  (slight hand-pinned rotation)
//   color     - border color (any CSS color, default slate-700-ish)
//   fill      - background color of the paper (default white-ish)
//   className - layout/padding classes for the content
export default function RoughBox({
  as: Tag = 'div',
  filter = 'sm',
  tilt = null,
  color = 'var(--wb-ink)',
  fill = 'var(--wb-paper)',
  strokeWidth = 1.6,
  radius = 14,
  className = '',
  children,
  ...rest
}) {
  const tiltClass = tilt === 'l' ? 'tilt-l' : tilt === 'r' ? 'tilt-r' : ''

  return (
    <Tag
      className={`group/rb relative ${tiltClass} ${tilt ? 'tilt-none-hover' : ''}`}
      {...rest}
    >
      {/* Ink border layer — the only thing that gets warped */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          filter: `url(#rough-${filter})`,
          border: `${strokeWidth}px solid ${color}`,
          borderRadius: radius,
          background: fill,
          // a touch of "hand-drawn" double-stroke feel via inset shadow
          boxShadow: 'inset 0 0 0 0.5px var(--wb-grid)',
        }}
      />
      {/* Soft drop shadow so notes lift off the canvas (separate, un-warped) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 translate-x-[3px] translate-y-[4px] rounded-2xl bg-[var(--wb-shadow)] blur-[1px] transition-transform duration-200 group-hover/rb:translate-x-[5px] group-hover/rb:translate-y-[6px]"
        style={{ borderRadius: radius }}
      />
      {/* Crisp content */}
      <div className={`relative ${className}`}>{children}</div>
    </Tag>
  )
}
