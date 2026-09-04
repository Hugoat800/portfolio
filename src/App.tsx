import { Routes, Route } from 'react-router-dom'
import { useScrollSpy } from './hooks/useScrollSpy'
import { useTheme } from './hooks/useTheme'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import APropos      from './components/APropos'
import Competences  from './components/Competences'
import Projets      from './components/Projets'
import Technologies from './components/Technologies'
import Contact      from './components/Contact'
import Footer       from './components/Footer'

// Pages projet — une par projet
import TeamJardinPage from './pages/projets/TeamJardin.tsx'
import Experience from './components/Experience.tsx'
import MovieTorPage from './pages/projets/MovieTor.tsx'
import LumiereMobilitesPage from './pages/projets/LumiereMobilite.tsx'
import UltimateCoursePage from './pages/projets/UltimateCourse.tsx'
import StageNperfPage from './pages/projets/StageNperf.tsx'
import AnnuairePage from './pages/projets/Annuaire.tsx'

const SECTION_IDS = ['accueil', 'a-propos', 'competences', 'projets', 'technos','experience', 'contact'] as const

function HomePage() {
  const activeId          = useScrollSpy([...SECTION_IDS])
  const { theme, toggle } = useTheme()
  return (
    <>
      <Navbar activeId={activeId} theme={theme} onThemeToggle={toggle} />
      <main>
        <Hero />
        <APropos />
        <Competences />
        <Technologies />
        <Projets />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const { theme, toggle } = useTheme()
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projet/team-jardin" element={<TeamJardinPage theme={theme} onThemeToggle={toggle} />} />
      <Route path="/projet/movietor" element={<MovieTorPage theme={theme} onThemeToggle={toggle} />} />
      <Route path="/projet/lumiere-mobilites" element={<LumiereMobilitesPage theme={theme} onThemeToggle={toggle} />} />
      <Route path="/projet/ultimatecourse" element={<UltimateCoursePage theme={theme} onThemeToggle={toggle} />} />
      <Route path="/projet/stage-nperf" element={<StageNperfPage theme={theme} onThemeToggle={toggle} />} />
      <Route path="/projet/annuaire" element={<AnnuairePage theme={theme} onThemeToggle={toggle} />} />
      {/* Ajouter une ligne par projet */}
    </Routes>
  )
}