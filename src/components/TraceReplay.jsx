import { useEffect, useState } from 'react'
import { RotateCcw } from 'lucide-react'

// Replays the real AgentForge trace from the Azure deployment (13 Oct 2026,
// run 0e9292f4): 4 model calls, 3 sandboxed tool calls, one-line fix.
const LINES = [
  { k: 'meta', t: 'run 0e9292f4 · fixture mean · gemini-3.5-flash-lite' },
  { k: 'meta', t: 'queued → claimed by worker, lease acquired' },
  { k: 'model', n: 1, t: 'run_tests' },
  { k: 'tool', t: 'run_tests', r: 'failed', bad: true },
  { k: 'model', n: 2, t: 'write_file stats.py' },
  { k: 'tool', t: 'write_file stats.py', r: 'ok' },
  { k: 'del', t: 'return sum(values) / (len(values) + 1)' },
  { k: 'add', t: 'return sum(values) / len(values)' },
  { k: 'model', n: 3, t: 'run_tests' },
  { k: 'tool', t: 'run_tests', r: 'passed · exit 0' },
  { k: 'model', n: 4, t: 'finish' },
  { k: 'done', t: 'completed · 8.29 s · 2,445 tokens · $0.005371 est.' },
]

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Line({ line }) {
  switch (line.k) {
    case 'meta':
      return <p className="text-[#85858b]">{line.t}</p>
    case 'model':
      return (
        <p>
          <span className="text-[#85858b]">{String(line.n).padStart(2, '0')} </span>
          <span className="text-[#7aa2ff]">model</span>
          <span className="text-[#a1a1a6]"> → </span>
          <span className="text-[#ededed]">{line.t}</span>
        </p>
      )
    case 'tool':
      return (
        <p>
          <span className="text-[#85858b]">{'   '}</span>
          <span className="text-[#e0b45c]">tool </span>
          <span className="text-[#ededed]">{line.t}</span>
          <span className={line.bad ? 'text-[#e5484d]' : 'text-[#4cc38a]'}>{`  ${line.r}`}</span>
        </p>
      )
    case 'del':
      return <p className="rounded-sm bg-[#e5484d]/10 text-[#f2a3a5]">{`   - ${line.t}`}</p>
    case 'add':
      return <p className="rounded-sm bg-[#4cc38a]/10 text-[#9fe0bf]">{`   + ${line.t}`}</p>
    case 'done':
      return <p className="mt-2 border-t border-white/[0.08] pt-2 text-[#4cc38a]">{line.t}</p>
    default:
      return null
  }
}

export default function TraceReplay() {
  const [shown, setShown] = useState(() => (reduced() ? LINES.length : 0))
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (reduced()) return
    setShown(0)
    let i = 0
    let timer
    const step = () => {
      i += 1
      setShown(i)
      if (i < LINES.length) timer = setTimeout(step, LINES[i]?.k === 'done' ? 520 : 300)
    }
    timer = setTimeout(step, 500)
    return () => clearTimeout(timer)
  }, [run])

  const running = shown < LINES.length

  return (
    <figure className="overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#111113] shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
      <div className="flex h-10 items-center justify-between border-b border-white/[0.08] px-4">
        <p className="font-mono text-xs text-[#a1a1a6]">agentforge · trace</p>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          disabled={running}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs text-[#a1a1a6] transition-colors duration-150 hover:text-[#ededed] disabled:opacity-40"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          Replay
        </button>
      </div>

      <div
        className="min-h-[316px] overflow-x-auto whitespace-pre px-4 py-4 font-mono text-[11px] leading-6 sm:text-[12.5px]"
        aria-label="Replay of a real AgentForge repair run"
      >
        {LINES.slice(0, shown).map((line, i) => (
          <div key={`${run}-${i}`} className="rise" style={{ animationDuration: '220ms' }}>
            <Line line={line} />
          </div>
        ))}
        {running ? <span className="inline-block h-4 w-2 translate-y-0.5 bg-[#a1a1a6]" aria-hidden="true" /> : null}
      </div>

      <figcaption className="border-t border-white/[0.08] px-4 py-2.5 text-xs text-[#85858b]">
        A real repair run on the Azure deployment, 13 Oct 2026. 4 model calls, 3 sandboxed tool calls.
      </figcaption>
    </figure>
  )
}
