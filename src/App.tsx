import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate, useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useScrollSpy } from './hooks/useScrollSpy'
import { useTheme } from './hooks/useTheme'
import { NAVIGATION } from './data/profile'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import APropos from './components/APropos/APropos'
import Competences from './components/Competences/Competences'
import Projets from './components/Projets/Projets'
import Technologies from './components/Technologies/Technologies'
import Experience from './components/Experience/Experience'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import ProjectPage from './pages/ProjectPage/ProjectPage'
import ContourBackground from './components/ContourBackground/ContourBackground'
import './App.css'
const Constellation3D = lazy(() => import('./pages/Constellation3D/Constellation3D'))
/** Home sections each have their own address, like /projets, without a #. */
const isSection = (segment: string | undefined) =>
  (NAVIGATION as readonly string[]).includes(segment ?? '')
const sectionOf = (pathname: string) => {
  const segment = pathname.split('/')[1]
  return isSection(segment) ? segment : undefined
}
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    // Old links such as /#projets now point to /projets.
    const legacy = hash.slice(1)
    if (isSection(legacy)) {
      navigate(`/${legacy}`, { replace: true })
      return
    }
    const frame = requestAnimationFrame(() => {
      const section = sectionOf(pathname)
      if (section) document.getElementById(section)?.scrollIntoView({ behavior: 'instant' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key, navigate])
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
/** One route for / and every section, so moving between sections keeps the page mounted. */
function HomeRoute() {
  const { section } = useParams()
  return section === undefined || isSection(section) ? <HomePage /> : <NotFound />
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
  const is3D = location.pathname === '/3d'
  return (
    <>
      {!is3D && (
        <ContourBackground className="contour-background--app" duration={18} intensity={0.05} />
      )}
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          // Move keyboard focus to the content without adding #main to the address.
          event.preventDefault()
          document.getElementById('main')?.focus()
        }}
      >
        {t('common.skip')}
      </a>
      <ScrollManager />
      <Navbar
        activeId={location.pathname === '/' || sectionOf(location.pathname) ? activeId : ''}
        theme={theme}
        onThemeToggle={toggle}
      />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/:section?" element={<HomeRoute />} />
          <Route path="/projet/:slug" element={<ProjectPage />} />
          <Route
            path="/3d"
            element={
              <Suspense fallback={<p className="space-loading">{t('space.loading')}</p>}>
                <Constellation3D />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!is3D && <Footer />}
    </>
  )
}
