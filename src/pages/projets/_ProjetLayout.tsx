import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import type { Theme } from '../../hooks/useTheme'

interface ProjetLayoutProps {
  theme: Theme
  onThemeToggle: () => void
  children: React.ReactNode
}

export default function ProjetLayout({ theme, onThemeToggle, children }: ProjetLayoutProps) {
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Navbar activeId="" theme={theme} onThemeToggle={onThemeToggle} />
      <main className="max-w-[860px] mx-auto px-8 pt-32 pb-24 flex flex-col gap-16">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm font-semibold w-fit transition-all duration-150 hover:-translate-x-1"
          style={{ color: 'var(--text-secondary)' }}
        >
          Retour aux projets
        </button>
        {children}
      </main>
      <Footer />
    </>
  )
}