import { useState, useEffect, useRef } from 'react'
import ThemeToggle from './ThemeToggle'
import { Theme } from '../hooks/useTheme'
import { useLocation, useNavigate } from 'react-router-dom'

interface NavLink {
  id: string
  label: string
}

const NAV_LINKS: NavLink[] = [
  { id: 'accueil',     label: 'Accueil' },
  { id: 'a-propos',    label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'technos',     label: 'Technologies' },
  { id: 'projets',     label: 'Projets' },
  { id: 'experience',  label: 'Expérience' },
  { id: 'contact',     label: 'Contact' },
]

interface NavbarProps {
  activeId: string
  theme: Theme
  onThemeToggle: () => void
}


export default function Navbar({ activeId, theme, onThemeToggle }: NavbarProps) {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [menuTop,   setMenuTop]   = useState(0)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  
  useEffect(() => {
    const updateMenuTop = () => {
      if (headerRef.current) {
        setMenuTop(headerRef.current.getBoundingClientRect().height)
      }
    }
    updateMenuTop()
    window.addEventListener('resize', updateMenuTop)
    window.addEventListener('scroll', updateMenuTop, { passive: true })
    return () => {
      window.removeEventListener('resize', updateMenuTop)
      window.removeEventListener('scroll', updateMenuTop)
    }
  }, [scrolled])

  const navigate  = useNavigate()
  const location  = useLocation()

  const handleLink = (id: string) => {
    if (location.pathname === '/') {
      // On est sur la home — scroll direct
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // On est sur une page projet — naviguer vers la home avec l'ancre
      navigate(`/#${id}`)
    }
    setMenuOpen(false)
  }

  const bgColor = theme === 'light'
    ? 'rgba(245, 244, 255, 0.92)'
    : 'rgba(8, 8, 26, 0.92)'

  return (
    <>
      <header
        ref={headerRef}
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'py-3 px-8' : 'py-4 px-8',
        ].join(' ')}
        style={scrolled ? {
          backgroundColor: bgColor,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
        } : {}}
      >
        <nav
          className="max-w-[1100px] mx-auto flex items-center justify-between"
          aria-label="Navigation principale"
        >
          {/* Logo */}
          <button
            onClick={() => handleLink('accueil')}
            aria-label="Retour à l'accueil"
            className="font-display font-bold text-xl bg-transparent border-0 cursor-pointer tracking-tight hover:opacity-80 transition-opacity"
            style={{ color: 'var(--text-primary)' }}
          >
            <span className="text-gradient">&lt;</span>
            Hugoat
            <span className="text-gradient"> /&gt;</span>
          </button>

          {/* Links — desktop */}
          <ul className="hidden min-[900px]:flex items-center gap-1" role="menubar">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id} role="none">
                <button
                  role="menuitem"
                  onClick={() => handleLink(id)}
                  aria-current={activeId === id ? 'page' : undefined}
                  className="px-4 py-2 rounded-xl text-sm font-medium tracking-wide border transition-all duration-150 cursor-pointer font-body"
                  style={activeId === id ? {
                    color: '#a78bfa',
                    backgroundColor: 'rgba(139, 92, 246, 0.10)',
                    borderColor: 'var(--border-subtle)',
                  } : {
                    color: 'var(--text-secondary)',
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                  }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Burger + Toggle */}
          <div className="flex items-center gap-2">
            <button
              className="min-[900px]:hidden flex flex-col justify-center gap-1.5 w-9 h-9 rounded-lg px-2 cursor-pointer border"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <span
                className={`block w-full h-px rounded transition-all duration-200 origin-center ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
                style={{ backgroundColor: 'var(--text-secondary)' }}
              />
              <span
                className={`block w-full h-px rounded transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
                style={{ backgroundColor: 'var(--text-secondary)' }}
              />
              <span
                className={`block w-full h-px rounded transition-all duration-200 origin-center ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
                style={{ backgroundColor: 'var(--text-secondary)' }}
              />
            </button>
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          </div>
        </nav>
      </header>

      {/* Menu mobile */}
      {menuOpen && (
        <ul
          className="flex flex-col fixed left-0 right-0 px-4 py-3 gap-1 min-[900px]:hidden z-40"
          role="menubar"
          style={{
            top: `${menuTop}px`,
            backgroundColor: bgColor,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id} role="none">
              <button
                role="menuitem"
                onClick={() => handleLink(id)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-150 cursor-pointer font-body"
                style={activeId === id ? {
                  color: '#a78bfa',
                  backgroundColor: 'rgba(139, 92, 246, 0.10)',
                  borderColor: 'var(--border-subtle)',
                } : {
                  color: 'var(--text-secondary)',
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}