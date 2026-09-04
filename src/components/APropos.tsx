interface InfoItem    { label: string; value: string }
interface InteretItem { label: string }

const INFOS: InfoItem[] = [
  { label: 'Formation',     value: 'B.U.T. Informatique, parcours R.A.' },
  { label: 'Localisation',  value: 'Lyon, France' },
  { label: 'Disponibilité', value: 'Alternance / Stage' },
  { label: 'Anglais',       value: 'Niveau B2' },
]

const INTERETS: InteretItem[] = [
  { label: 'Jeux vidéo' },
  { label: 'Escalade' },
  { label: 'Montage vidéo' },
  { label: 'Streaming' },
]

export default function APropos() {
  return (
    <section
      id="a-propos"
      className="py-20 bg-indigo-500/[0.025]"
      aria-labelledby="apropos-title"
    >
      <div className="max-w-[1100px] mx-auto px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="section-label">À propos de moi</p>
          <h2 id="apropos-title" className="section-title">
            Mon <span>profil</span>
          </h2>
        </div>

        <div className="grid gap-16 md:grid-cols-[280px_1fr] items-start">
          {/* Colonne gauche */}
          <div className="flex flex-col gap-6 items-center">
            {/* Avatar */}
            <div className="relative w-fit">
              <div className="w-48 h-48 rounded-2xl border border-default overflow-hidden">
                <img
                  src="/images/pp_hugo.png"
                  alt="Hugo Vitry"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Centres d'intérêt */}
            <div className="flex flex-col gap-2 w-full max-w-[280px]">
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-center" style={{ color: 'var(--text-muted)' }}>
                À côté de l'écran (à moitié)
              </span>
              <div className="flex flex-wrap gap-2 justify-center">
                {INTERETS.map(({ label }) => (
                  <span
                    key={label}
                    className="px-3 py-1.5 rounded-full text-[0.8rem] font-medium"
                    style={{
                      backgroundColor: 'rgba(139,92,246,0.08)',
                      border: '1px solid rgba(139,92,246,0.2)',
                      color: '#a78bfa',
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="flex flex-col gap-5">
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Étudiant en{' '}
              <strong className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                2ème année de B.U.T. Informatique
              </strong>
              , parcours Réalisation d'applications, à l'IUT Lyon 1. Je termine actuellement un
              stage de deux mois chez nPerf, où je développe une application web en React et PHP.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Mon parcours m'a permis de travailler sur des projets variés : applications de
              gestion en équipe, développement mobile, optimisation d'algorithmes et maintenant
              une mission professionnelle complète, de la conception à la mise en production.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Je recherche aujourd'hui une alternance ou un stage long pour l'année 2026-2027,
              afin de continuer à progresser dans un environnement de développement exigeant.
            </p>

            {/* Infos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {INFOS.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col gap-0.5 px-4 py-3 rounded-xl bg-bg-surface border border-subtle"
                >
                  <span className="text-[0.68rem] font-bold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                    {label}
                  </span>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}