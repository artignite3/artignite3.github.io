import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-card text-fg-2 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-[opacity,color] duration-200 hover:text-fg ${
        show ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <ArrowUp className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
    </button>
  )
}
