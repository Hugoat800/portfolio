import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PROJETS, FILTRES_PROJETS } from '../data/projets'
import { COMPETENCES } from '../data/competences'
import type { Projet, TypeProjet, CompetenceId } from '../types'

interface TypeMeta {
  label: string
  badgeClass: string
}

const TYPE_META: Record<TypeProjet, TypeMeta> = {
  etudiant:  { label: 'Étudiant',  badgeClass: 'badge-violet' },
  stage:     { label: 'Stage',     badgeClass: 'badge-blue' },
  personnel: { label: 'Personnel', badgeClass: 'badge-green' },
}

interface ProjetCardProps {
  projet: Projet
  onCompetenceClick: (id: CompetenceId) => void
}

function ProjetCard({ projet, onCompetenceClick }: ProjetCardProps) {
  const navigate = useNavigate()
  const meta     = TYPE_META[projet.type]
  const comps    = COMPETENCES.filter((c) => projet.competences.includes(c.id))

  return (
    <article
      className="flex flex-col rounded-2xl cursor-pointer transition-all duration-200 outline-none overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
      onClick={() => navigate(`/projet/${projet.slug}`)}
      role="button"
      tabIndex={0}
      aria-label={`Voir le détail : ${projet.titre}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(`/projet/${projet.slug}`) }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-default)'
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 36px rgba(139,92,246,0.12)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)'
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {projet.image ? (
        <div className="w-full h-44 overflow-hidden">
          <img src={projet.image} alt={projet.titre} className="w-full h-full object-cover block" />
        </div>
      ) : (
        <div
          className="w-full h-44 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.06))', borderBottom: '1px solid var(--border-subtle)' }}
        >
          <span
            className="font-display font-bold text-4xl"
            style={{ background: 'linear-gradient(135deg, #c4b5fd, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            {projet.titre.charAt(0)}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <span className={meta.badgeClass}>{meta.label}</span>
          <span className="text-[0.76rem] font-mono" style={{ color: 'var(--text-muted)' }}>{projet.annee}</span>
        </div>

        <div>
          <h3 className="font-display font-bold text-[1.08rem] tracking-tight mb-1.5" style={{ color: 'var(--text-primary)' }}>
            {projet.titre}
          </h3>
          <p className="text-[0.85rem] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {projet.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {projet.technos.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md text-[0.74rem] font-medium font-mono"
              style={{ backgroundColor: 'rgba(139, 92, 246, 0.10)', border: '1px solid rgba(139, 92, 246, 0.22)', color: '#a78bfa' }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Compétences — cliquables */}
        <div className="flex flex-wrap gap-1.5">
          {comps.map((c) => (
            <button
              key={c.id}
              onClick={(e) => {
                e.stopPropagation()  // évite de déclencher la navigation vers le projet
                onCompetenceClick(c.id)
              }}
              className="px-2 py-0.5 rounded-md text-[0.71rem] font-semibold cursor-pointer transition-transform duration-150 hover:scale-105"
              style={{
                background: `rgba(${c.accentRgb}, 0.08)`,
                color: c.color,
                border: `1px solid rgba(${c.accentRgb}, 0.2)`,
              }}
              title={`Filtrer par ${c.label}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 mt-auto" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <span className="text-[0.8rem] font-semibold text-violet-500 flex items-center gap-2">
            Voir le détail &#8594;
          </span>
          <div className="flex gap-3">
            {projet.liens.git && <span className="text-[0.78rem] font-mono" style={{ color: 'var(--text-muted)' }} title="Code source">{'{ }'}</span>}
            {projet.liens.demo && <span className="text-[0.78rem]" style={{ color: 'var(--text-muted)' }} title="Démo">&#9654;</span>}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Projets() {
  const [filtre,            setFiltre]            = useState<string>('tous')
  const [filtreCompetence,  setFiltreCompetence]   = useState<CompetenceId | null>(null)

  const projetsFiltres = PROJETS.filter((p) => {
    const matchType = filtre === 'tous' || p.type === filtre
    const matchComp = !filtreCompetence || p.competences.includes(filtreCompetence)
    return matchType && matchComp
  })

  const competenceActive = filtreCompetence
    ? COMPETENCES.find((c) => c.id === filtreCompetence)
    : null

  return (
    <section id="projets" className="py-20" style={{ backgroundColor: 'rgba(99,102,241,0.025)' }} aria-labelledby="projets-title">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="mb-12">
          <p className="section-label">Réalisations</p>
          <h2 id="projets-title" className="section-title">
            Mes <span>projets</span>
          </h2>
        </div>

        {/* Filtres type */}
        <div className="flex gap-2 flex-wrap mb-4" role="group" aria-label="Filtrer par type">
          {FILTRES_PROJETS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFiltre(value)}
              aria-pressed={filtre === value}
              className="px-5 py-2 rounded-full text-[0.83rem] font-semibold tracking-wide border cursor-pointer font-body transition-all duration-200"
              style={filtre === value ? {
                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                color: 'white',
                borderColor: 'transparent',
              } : {
                background: 'transparent',
                color: 'var(--text-secondary)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Filtre compétence actif */}
        {competenceActive && (
          <div className="flex items-center gap-2 mb-8">
            <span className="text-[0.82rem]" style={{ color: 'var(--text-secondary)' }}>
              Filtré par compétence :
            </span>
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.8rem] font-semibold"
              style={{
                background: `rgba(${competenceActive.accentRgb}, 0.12)`,
                color: competenceActive.color,
                border: `1px solid rgba(${competenceActive.accentRgb}, 0.3)`,
              }}
            >
              {competenceActive.label}
              <button
                onClick={() => setFiltreCompetence(null)}
                aria-label="Retirer le filtre compétence"
                className="cursor-pointer"
                style={{ color: competenceActive.color }}
              >
                &#10005;
              </button>
            </span>
          </div>
        )}
        {!competenceActive && <div className="mb-8" />}

        {/* Grille */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
          {projetsFiltres.map((projet) => (
            <ProjetCard key={projet.id} projet={projet} onCompetenceClick={setFiltreCompetence} />
          ))}
        </div>

        {projetsFiltres.length === 0 && (
          <p className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
            Aucun projet ne correspond à ces critères.
          </p>
        )}
      </div>
    </section>
  )
}