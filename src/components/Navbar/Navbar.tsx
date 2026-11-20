import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NAVIGATION, PROFILE } from '../data/profile'
import type { Theme } from '../hooks/useTheme'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import ViewSwitch from './ViewSwitch'
export default function Navbar({
  activeId,
  theme,
  onThemeToggle,
}: {
  activeId: string
  theme: Theme
  onThemeToggle: () => void
}) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const menuButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    setOpen(false)
  }, [location])
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])
  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link to="/#accueil" className="wordmark" aria-label={t('common.home')}>
          <span>{PROFILE.name}</span>
        </Link>
        <nav
          id="main-navigation"
          className={`main-navigation ${open ? 'is-open' : ''}`}
          aria-label={t('common.navigation')}
        >
          {NAVIGATION.map((id) => (
            <Link
              key={id}
              to={`/#${id}`}
              onClick={() => setOpen(false)}
              aria-current={activeId === id ? 'location' : undefined}
            >
              {t(`nav.${id}`)}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ViewSwitch />
          <LanguageSwitcher />
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          <button
            ref={menuButton}
            className="menu-button"
            aria-controls="main-navigation"
            aria-expanded={open}
            aria-label={t(open ? 'common.closeMenu' : 'common.openMenu')}
            onClick={() => setOpen(!open)}
          >
            {open ? '×' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}
