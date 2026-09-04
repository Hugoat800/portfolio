import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COMPETENCES, NIVEAUX_ACQUIS } from '../data/competences'
import { PROJETS } from '../data/projets'
import type { Competence } from '../types'

interface NiveauDotsProps {
  acquis: number
  total: number
  color: string
}

function NiveauDots({ acquis, total, color }: NiveauDotsProps) {
  return (
    <div className="flex gap-1.5 shrink-0 mt-0.5" role="img" aria-label={`Niveau ${acquis} sur ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className="w-2.5 h-2.5 rounded-full border transition-all duration-200"
          style={
            i < acquis
              ? { background: color, borderColor: 'transparent' }
              : { background: 'transparent', borderColor: 'rgba(139,92,246,0.28)' }
          }
        />
      ))}
    </div>
  )
}

interface CompetenceCardProps {
  competence: Competence
}

function CompetenceCard({ competence }: CompetenceCardProps) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const niveau = NIVEAUX_ACQUIS[competence.id] ?? 0
  const total  = competence.niveaux.length

  // Projets qui mobilisent cette compétence
  const projetsLies = PROJETS.filter((p) => p.competences.includes(competence.id))

  return (
    <article
      className={[
        'p-5 rounded-2xl bg-bg-surface border transition-all duration-200 relative',
        open ? 'bg-bg-elevated border-default z-20 shadow-2xl' : 'border-subtle hover:bg-bg-elevated hover:border-default',
      ].join(' ')}
      style={{
        boxShadow: open ? `0 16px 48px rgba(${competence.accentRgb}, 0.25)` : undefined,
      }}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: competence.color }}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-[1.08rem] text-white mb-1 tracking-tight">
              {competence.label}
            </h3>
            <p className="text-xs text-white/50 leading-snug">{competence.description}</p>
          </div>
          <NiveauDots acquis={niveau} total={total} color={competence.color} />
        </div>

        {niveau > 0 && (
          <div
            className="w-fit text-[0.73rem] font-medium font-mono px-3 py-1 rounded-md"
            style={{
              background: `rgba(${competence.accentRgb}, 0.08)`,
              border: `1px solid rgba(${competence.accentRgb}, 0.2)`,
              color: competence.color,
            }}
          >
            Niveau {niveau} — {competence.niveaux[niveau - 1]?.titre}
          </div>
        )}
      </div>

      <button
        className="flex items-center justify-between w-full px-4 py-2 rounded-xl border border-subtle text-[0.78rem] font-semibold text-white/40 cursor-pointer font-body bg-transparent hover:text-white/70 hover:border-default transition-all duration-150"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`comp-${competence.id}-body`}
      >
        <span>{open ? 'Masquer le détail' : 'Voir le détail'}</span>
        <span className={`text-base leading-none transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true">
          &#8964;
        </span>
      </button>

      
        <div
          id={`comp-${competence.id}-body`}
          className="absolute left-0 right-0 transition-all duration-300 ease-in-out"
          style={{
            top: '100%',
            marginTop: open ? '8px' : '0px',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: '1rem',
            padding: open ? '1.25rem' : '0 1.25rem',
            boxShadow: open ? `0 16px 48px rgba(${competence.accentRgb}, 0.25)` : 'none',
            maxHeight: open ? '500px' : '0px',
            opacity: open ? 1 : 0,
            overflow: 'hidden',
            overflowY: open ? 'auto' : 'hidden',
            pointerEvents: open ? 'auto' : 'none',
            zIndex: 30,
          }}
          aria-hidden={!open}
        >
        <div className="flex flex-col gap-5 pt-4">
          {/* Apprentissages critiques */}
          <ul className="flex flex-col gap-2">
            {competence.apprentissages.map((ac) => (
              <li key={ac} className="flex items-start gap-3 text-[0.83rem] text-white/50 leading-snug">
                <span
                  className="shrink-0 w-3.5 h-3.5 rounded-full mt-0.5 relative"
                  style={{
                    background: `rgba(${competence.accentRgb}, 0.18)`,
                    border: `1px solid rgba(${competence.accentRgb}, 0.4)`,
                  }}
                  aria-hidden="true"
                >
                  <span
                    className="absolute top-[3px] left-[3px] w-[6px] h-[6px] rounded-full"
                    style={{ background: competence.color }}
                  />
                </span>
                {ac}
              </li>
            ))}
          </ul>

          {/* Projets mobilisant cette compétence */}
          {projetsLies.length > 0 && (
            <div className="flex flex-col gap-2 pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <p className="text-[0.68rem] font-bold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                Mobilisée dans
              </p>
              <div className="flex flex-col gap-1.5">
                {projetsLies.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => navigate(`/projet/${p.slug}`)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-left text-[0.82rem] font-medium transition-all duration-150 cursor-pointer border"
                    style={{
                      backgroundColor: 'var(--bg-base)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = competence.color }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                  >
                    {p.titre}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Competences() {
  return (
    <section id="competences" className="py-20" aria-labelledby="competences-title">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="mb-12">
          <p className="section-label">Référentiel B.U.T.</p>
          <h2 id="competences-title" className="section-title">
            Mes <span>compétences</span>
          </h2>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {COMPETENCES.map((comp) => (
            <CompetenceCard key={comp.id} competence={comp} />
          ))}
        </div>
      </div>
    </section>
  )
}