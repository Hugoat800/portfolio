interface QuickInfoItem {
  value: string
  label: string
}

const QUICK_INFO: QuickInfoItem[] = [
  { value: '2+',     label: 'ans de formation' },
  { value: '6+',     label: 'projets réalisés' },
  { value: '20+',    label: 'technologies' },
]

function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-8 pt-24 pb-16 text-center"
      aria-label="Présentation"
    >
      {/* Grille décorative */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 70% at center, black 30%, transparent 80%)',
        }}
      />

      {/* Orbes */}
      <div
        aria-hidden="true"
        className="absolute top-[5%] -left-[10%] w-[380px] h-[380px] rounded-full pointer-events-none animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 65%)',
          filter: 'blur(72px)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[15%] -right-[5%] w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)',
          filter: 'blur(72px)',
          animation: 'float 8s ease-in-out -4s infinite',
        }}
      />

      {/* Contenu */}
      <div className="relative z-10 max-w-2xl flex flex-col items-center gap-6 animate-fade-up">
        {/* Badge disponibilité */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-700 bg-violet-500/8 text-violet-300 text-xs font-semibold tracking-wide"
          aria-label="Disponibilité"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse-glow shrink-0"
            aria-hidden="true"
          />
          Disponible - Alternance / Stage - 2026-2027
        </div>

        {/* Titre */}
        <h1
          className="text-white"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.6rem)', fontStretch: '100%', letterSpacing: '-0.02em', lineHeight: 1.15 }}
        >
        Je suis
          <br />
          <span className="text-gradient block">Hugo VITRY</span>
        </h1>

        {/* Sous-titre */}
        <p className="text-white/60 max-w-lg leading-relaxed" style={{ fontSize: 'clamp(1rem, 2.4vw, 1.2rem)' }}>
          Étudiant en&nbsp;&nbsp;
          <strong className="text-violet-300 font-semibold">
            B.U.T. Informatique - Parcours Réalisation d'applications
          </strong>
          <br />
          Passionné par le développement full-stack et la qualité logicielle.
        </p>

        {/* CTA */}
        <div className="flex gap-3 flex-wrap justify-center">
          <button
            className="btn-primary"
            onClick={() => scrollToId('projets')}
          >
            Voir mes projets
          </button>
          <button
            className="btn-outline"
            onClick={() => scrollToId('contact')}
          >
            Me contacter
          </button>
          <button className="btn-outline" onClick={() => scrollToId('a-propos')}>
            Me connaitre
          </button>
        </div>

        {/* Quick info */}
        <div
          className="flex gap-6 pt-4 border-t border-subtle flex-wrap justify-center"
          aria-label="Informations rapides"
        >
          {QUICK_INFO.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="font-display font-bold text-violet-300 leading-none" style={{ fontSize: '1.8rem' }}>
                {value}
              </span>
              <span className="text-xs text-white/40 text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
