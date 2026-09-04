import { useState } from 'react'
import { TECHNOS, CATEGORIES_TECHNOS } from '../data/technos'

export default function Technologies() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const technosFiltrees =
    activeCategory ? TECHNOS.filter((t) => t.categories.includes(activeCategory)) : TECHNOS

  const toggleCategory = (cat: string) =>
    setActiveCategory((prev) => (prev === cat ? null : cat))

  return (
    <section id="technos" className="py-20" aria-labelledby="technos-title">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="mb-12">
          <p className="section-label">Stack technique</p>
          <h2 id="technos-title" className="section-title">
            Mes <span>technologies</span>
          </h2>
        </div>

        {/* Filtres */}
        <div className="flex gap-2 flex-wrap mb-8" role="group" aria-label="Filtrer par catégorie">
          {['Toutes', ...CATEGORIES_TECHNOS].map((cat) => {
            const isActive = cat === 'Toutes' ? !activeCategory : activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => cat === 'Toutes' ? setActiveCategory(null) : toggleCategory(cat)}
                aria-pressed={isActive}
                style={isActive ? {
                  backgroundColor: 'rgba(139, 92, 246, 0.14)',
                  borderColor: 'var(--border-default)',
                  color: '#a78bfa',
                } : {
                  backgroundColor: 'transparent',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
                className="px-4 py-1.5 rounded-xl text-[0.81rem] font-semibold border cursor-pointer font-body transition-all duration-150 hover:-translate-y-0.5"
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Grille */}
        <ul
          className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          aria-label="Liste des technologies"
        >
          {technosFiltrees.map((techno) => (
            <li
              key={techno.name}
              className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl text-center transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'
                e.currentTarget.style.borderColor = 'var(--border-default)'
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(139,92,246,0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-surface)'
                e.currentTarget.style.borderColor = 'var(--border-subtle)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <img
                src={techno.logo}
                alt=""
                aria-hidden="true"
                className="w-10 h-10 object-contain"
              />
              <span
                className="text-sm font-semibold font-mono"
                style={{ color: 'var(--text-primary)' }}
              >
                {techno.name}
              </span>
             
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}