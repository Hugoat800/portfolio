
import { EXPERIENCES } from '../data/experiences'
import { COMPETENCES } from '../data/competences'

export default function Experience() {
  return (
    <section id="experience" className="py-20" aria-labelledby="experience-title">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="mb-12">
          <p className="section-label">Parcours</p>
          <h2 id="experience-title" className="section-title">
            Mon <span>expérience</span>
          </h2>
        </div>

        <div className="relative max-w-[680px]">
          {/* Ligne verticale — s'arrête exactement au centre du dernier point */}
          <div
            className="absolute left-[15px] top-[18px] w-px"
            style={{ background: 'var(--border-default)', bottom: '14px' }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-10">
            {EXPERIENCES.map((exp) => {
              const comps = COMPETENCES.filter((c) => exp.competences.includes(c.id))
              const isClickable = Boolean(exp.lien)

              const cardContent = (
                <>
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h3 className="font-display font-bold text-[1.05rem]" style={{ color: 'var(--text-primary)' }}>
                        {exp.titre}
                      </h3>
                      <p className="text-sm font-medium" style={{ color: '#a78bfa' }}>
                        {exp.entreprise} &middot; {exp.lieu}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {exp.enCours && <span className="badge-violet">En cours</span>}
                      <span className="text-[0.78rem] font-mono whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                        {exp.periode}
                      </span>
                    </div>
                  </div>

                  <p className="text-[0.88rem] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.technos.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md text-[0.74rem] font-medium font-mono"
                        style={{
                          backgroundColor: 'rgba(139, 92, 246, 0.10)',
                          border: '1px solid rgba(139, 92, 246, 0.22)',
                          color: '#a78bfa',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {comps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {comps.map((c) => (
                        <span
                          key={c.id}
                          className="px-2 py-0.5 rounded-md text-[0.71rem] font-semibold"
                          style={{
                            background: `rgba(${c.accentRgb}, 0.08)`,
                            color: c.color,
                            border: `1px solid rgba(${c.accentRgb}, 0.2)`,
                          }}
                        >
                          {c.label}
                        </span>
                      ))}
                    </div>
                  )}

                  
                </>
              )

              return (
                <div key={exp.id} className="relative flex gap-6">
                  <div className="relative shrink-0 w-8 flex justify-center pt-1">
                    <span
                      className="w-4 h-4 rounded-full border-2 z-10"
                      style={{
                        backgroundColor: exp.enCours ? '#8b5cf6' : 'var(--bg-base)',
                        borderColor: '#8b5cf6',
                        boxShadow: exp.enCours ? '0 0 0 4px rgba(139,92,246,0.18)' : 'none',
                      }}
                    />
                  </div>

                  {isClickable ? (
                    <a
                      href={exp.lien}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex flex-col gap-3 p-5 rounded-2xl transition-all duration-200 cursor-pointer"
                      style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-default)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(139,92,246,0.1)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)'
                        e.currentTarget.style.transform = 'none'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      {cardContent}
                    </a>
                  ) : (
                    <div
                      className="flex-1 flex flex-col gap-3 p-5 rounded-2xl"
                      style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
                    >
                      {cardContent}
                    </div>
                  )}
                </div>
              )
            })}

            {/* Point de départ */}
            <div className="relative flex gap-6">
              <div className="relative shrink-0 w-8 flex justify-center pt-1">
                <span className="w-3 h-3 rounded-full z-10" style={{ backgroundColor: 'var(--text-muted)' }} />
              </div>
              <p className="text-sm pt-1.5" style={{ color: 'var(--text-muted)' }}>
                Début du B.U.T. Informatique
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}