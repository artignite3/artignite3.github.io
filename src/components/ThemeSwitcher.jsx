import { Moon, Sun, ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false)
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true)
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {/* Theme Switcher - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="group relative flex h-11 w-11 items-center justify-center bg-white text-slate-600 transition-colors hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-amber-300"
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          <div 
            className="absolute inset-0 z-0 bg-white transition-colors dark:bg-slate-800" 
            style={{ 
              filter: 'url(#rough-sm)', 
              border: '1.4px solid currentColor',
            }} 
          />
          <div className="relative z-10">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </div>
        </button>
      </div>

      {/* Back to Top - Bottom Right */}
      {showTopBtn && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={scrollToTop}
            className="group relative flex h-11 w-11 items-center justify-center bg-white text-slate-600 transition-colors hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-blue-400"
            aria-label="Back to top"
            title="Back to top"
          >
            <div 
              className="absolute inset-0 z-0 bg-white transition-colors dark:bg-slate-800" 
              style={{ 
                filter: 'url(#rough-sm)', 
                border: '1.4px solid currentColor',
              }} 
            />
            <div className="relative z-10">
              <ArrowUp className="h-5 w-5" />
            </div>
          </button>
        </div>
      )}
    </>
  )
}
