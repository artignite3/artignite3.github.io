import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Copy, CornerDownLeft, FileText, Hash, Mail, Moon, Search } from 'lucide-react'
import { SECTIONS } from './MainNav'

// ⌘K / Ctrl+K menu: jump to a section, open a link, copy the email.
export default function CommandPalette({ open, onClose, identity, onToggleTheme }) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const [note, setNote] = useState('')
  const inputRef = useRef(null)

  const items = useMemo(() => {
    const resume = identity.links?.find((l) => l.icon === 'resume')
    const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    const open = (url) => () => window.open(url, '_blank', 'noopener')
    return [
      ...SECTIONS.map((s) => ({ group: 'Go to', label: s.label, icon: Hash, run: go(s.id) })),
      { group: 'Go to', label: 'Recently on GitHub', icon: Hash, run: go('github') },
      resume && { group: 'Actions', label: 'Open resume', icon: FileText, run: open(resume.url) },
      { group: 'Actions', label: 'Email Riddhesh', icon: Mail, run: () => (window.location.href = `mailto:${identity.email}`) },
      {
        group: 'Actions',
        label: 'Copy email address',
        icon: Copy,
        keep: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(identity.email)
            setNote(`Copied ${identity.email}`)
          } catch {}
        },
      },
      { group: 'Actions', label: 'Toggle dark mode', icon: Moon, run: onToggleTheme },
      ...(identity.links ?? [])
        .filter((l) => l.icon !== 'resume')
        .map((l) => ({ group: 'Links', label: l.label, icon: ArrowUpRight, run: open(l.url) })),
    ].filter(Boolean)
  }, [identity, onToggleTheme])

  const results = items.filter((i) => i.label.toLowerCase().includes(query.trim().toLowerCase()))

  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
      setNote('')
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => setIndex(0), [query])

  if (!open) return null

  const run = (item) => {
    if (!item) return
    item.run()
    if (!item.keep) onClose()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (i + 1) % Math.max(results.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(results[index])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  let lastGroup = null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]" role="presentation">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        className="rise relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-card shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
        style={{ animationDuration: '200ms' }}
      >
        <div className="flex h-12 items-center gap-3 border-b border-line px-4">
          <Search className="h-4 w-4 text-fg-3" strokeWidth={1.5} aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search"
            aria-label="Search commands"
            className="h-full flex-1 bg-transparent text-sm text-fg placeholder:text-fg-3 focus:outline-none"
          />
          <kbd className="keycap">esc</kbd>
        </div>

        <ul className="max-h-80 overflow-y-auto p-2" role="listbox">
          {results.length === 0 ? <li className="px-3 py-6 text-center text-sm text-fg-3">No matches</li> : null}
          {results.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null
            lastGroup = item.group
            const Icon = item.icon
            return (
              <li key={item.group + item.label}>
                {header ? <p className="px-3 pb-1 pt-3 text-xs text-fg-3 first:pt-1">{header}</p> : null}
                <button
                  type="button"
                  role="option"
                  aria-selected={i === index}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => run(item)}
                  className={`flex h-9 w-full items-center gap-2.5 rounded-lg px-3 text-left text-sm ${
                    i === index ? 'bg-raised text-fg' : 'text-fg-2'
                  }`}
                >
                  <Icon className="h-4 w-4 text-fg-3" strokeWidth={1.5} aria-hidden="true" />
                  <span className="flex-1">{item.label}</span>
                  {i === index ? <CornerDownLeft className="h-3.5 w-3.5 text-fg-3" strokeWidth={1.5} aria-hidden="true" /> : null}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-xs text-fg-3">
          <span aria-live="polite">{note}</span>
          <span className="flex items-center gap-1.5">
            <kbd className="keycap">↑</kbd>
            <kbd className="keycap">↓</kbd> to move
            <kbd className="keycap ml-2">↵</kbd> to open
          </span>
        </div>
      </div>
    </div>
  )
}
