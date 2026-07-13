import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

// Floating "scroll to top" control that fades in once the page is scrolled.
export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center bg-blue-600 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-blue-500 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      style={{ filter: 'url(#rough-sm)' }}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  )
}