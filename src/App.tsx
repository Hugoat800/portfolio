import { useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useScrollSpy } from './hooks/useScrollSpy'
import { useTheme } from './hooks/useTheme'
import { NAVIGATION } from './data/profile'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import APropos from './components/APropos'
import Competences from './components/Competences'
import Projets from './components/Projets'
import Technologies from './components/Technologies'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectPage from './pages/ProjectPage'
import ContourBackground from './components/backgrounds/ContourBackground'
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        let id = hash.slice(1)
        try {
          id = decodeURIComponent(id)
        } catch {
          /* Ignore malformed URL encoding. */
        }
        document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
      } else window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])
  return null
}
function HomePage() {
  return (
    <>
      <Hero />
      <APropos />
      <Competences />
      <Technologies />
      <Projets />
      <Experience />
      <Contact />
    </>
  )
}
function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="not-found container">
      <h1>{t('common.notFound')}</h1>
      <Link to="/">{t('common.home')}</Link>
    </div>
  )
}
export default function App() {
  const { theme, toggle } = useTheme()
  const { t } = useTranslation()
  const location = useLocation()
  const activeId = useScrollSpy(NAVIGATION)
  return (
    <>
      <ContourBackground className="contour-background--app" duration={18} intensity={0.05} />
      <a className="skip-link" href="#main">
        {t('common.skip')}
      </a>
      <ScrollManager />
      <Navbar
        activeId={location.pathname === '/' ? activeId : ''}
        theme={theme}
        onThemeToggle={toggle}
      />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projet/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
