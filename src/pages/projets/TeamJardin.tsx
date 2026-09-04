import ProjetLayout from './_ProjetLayout'
import { COMPETENCES } from '../../data/competences'
import type { Theme } from '../../hooks/useTheme'

interface Props {
  theme: Theme
  onThemeToggle: () => void
}

// Composants utilitaires locaux
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display font-bold text-2xl"
      style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
    >
      {children}
    </h2>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.97rem] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
      {children}
    </p>
  )
}

function CompetenceBlock({
  id,
  justification,
  apprentissages,
}: {
  id: string
  justification: string
  apprentissages: string[]
}) {
  const comp = COMPETENCES.find((c) => c.id === id)
  if (!comp) return null
  return (
    <div
      className="flex flex-col gap-4 p-6 rounded-2xl"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderLeft: `3px solid ${comp.color}`,
        border: `1px solid rgba(${comp.accentRgb}, 0.2)`,
        borderLeftWidth: '3px',
        borderLeftColor: comp.color,
      }}
    >
      <div className="flex items-start gap-3 flex-wrap">
        <span className="font-display font-bold text-lg" style={{ color: comp.color }}>
          {comp.label}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded font-mono mt-0.5"
          style={{
            backgroundColor: `rgba(${comp.accentRgb}, 0.1)`,
            color: comp.color,
            border: `1px solid rgba(${comp.accentRgb}, 0.25)`,
          }}
        >
          {comp.description}
        </span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {justification}
      </p>
      <div className="flex flex-col gap-1.5">
        <p className="text-[0.68rem] font-bold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
          Apprentissages critiques mobilisés
        </p>
        <ul className="flex flex-col gap-1">
          {apprentissages.map((ac) => (
            <li key={ac} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: comp.color }} />
              {ac}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function TeamJardinPage({ theme, onThemeToggle }: Props) {
  return (
    <ProjetLayout theme={theme} onThemeToggle={onThemeToggle}>

      {/* En-tête */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="badge-violet">Projet étudiant</span>
          <span className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>2025</span>
        </div>
        <h1
          className="font-display font-bold leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}
        >
          Team Jardin
        </h1>
        <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
          SAE S3.01 - B.U.T. Informatique 2ème année - Groupe G1S3B
        </p>
        <p className="text-[1.05rem] leading-relaxed max-w-[640px]" style={{ color: 'var(--text-secondary)' }}>
          Application web destinée à un chef d'entreprise paysagiste, centralisant la gestion du planning
          des interventions, la facturation client et la communication interne pour une équipe d'une vingtaine de collaborateurs.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {['PHP', 'JavaScript', 'HTML', 'CSS', 'MySQL', 'Figma'].map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md text-[0.78rem] font-mono font-medium"
              style={{
                backgroundColor: 'rgba(139,92,246,0.10)',
                border: '1px solid rgba(139,92,246,0.22)',
                color: '#a78bfa',
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3 pt-1">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-primary">
            Code source
          </a>
        </div>
      </div>

      {/* Contexte */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Contexte</SectionTitle>
        <Paragraph>
          Dans le cadre de la SAE S3.01, notre équipe de quatre étudiants : Sébastien Tremillon,
          Armin Osmanovic, Romain Duval-Cifoux et moi-même a conçu et développé une application
          web pour répondre aux besoins quotidiens d'une petite entreprise de paysagisme.
        </Paragraph>
        <Paragraph>
          L'outil se positionne à mi-chemin entre un ERP léger et un logiciel de facturation :
          aussi simple qu'un outil comme Facture.net, mais intégrant des fonctionnalités
          opérationnelles de planning inspirées des ERP, le tout dans une interface centralisée
          adaptée à une structure de 5 à 10 personnes.
        </Paragraph>
      </div>

      {/* Aperçu du projet */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Aperçu du projet</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Vidéo */}
          <figure className="flex flex-col gap-2 sm:col-span-2">
            <div
              className="w-full rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border-subtle)', aspectRatio: '16/9' }}
            >
              <video
                controls
                className="w-full h-full object-cover"
                poster="/projets/teamjardin/teamjardin-poster.png"  
              >
                <source src="/projets/teamjardin/PrésentationdusiteTeamJardin.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            </div>
            
          </figure>

          {/* Images optionnelles sous la vidéo */}
          {/* <figure className="flex flex-col gap-2">
            <img
              src="/medias/teamjardin-planning.png"
              alt="Interface de gestion du planning"
              className="w-full rounded-xl object-cover"
              style={{ border: '1px solid var(--border-subtle)', height: '180px' }}
            />
            <figcaption className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
              Gestion du planning
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-2">
            <img
              src="/medias/teamjardin-facture.png"
              alt="Édition de facture"
              className="w-full rounded-xl object-cover"
              style={{ border: '1px solid var(--border-subtle)', height: '180px' }}
            />
            <figcaption className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
              Édition de facture
            </figcaption>
          </figure> */}
        </div>
      </div>

      {/* Acteurs */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Acteurs du système</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { titre: 'Gérant', desc: "Gère le planning, crée les devis et factures, valide les congés et supervise l'activité globale." },
            { titre: 'Collaborateur', desc: "Consulte son planning personnel, accède aux détails des interventions et pose des demandes de congé." },
            { titre: 'Client', desc: "Consulte ses factures et l'avancement de ses interventions via son espace personnel sécurisé." },
          ].map(({ titre, desc }) => (
            <div
              key={titre}
              className="flex flex-col gap-2 p-4 rounded-xl"
              style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
            >
              <span className="font-display font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                {titre}
              </span>
              <span className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fonctionnalités */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Fonctionnalités principales</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Site vitrine', desc: 'Présentation des réalisations, avis clients et formulaire de contact pour convertir le trafic web.' },
            { label: 'Gestion du planning', desc: 'Vue jour / semaine / mois, affectation des collaborateurs aux chantiers, vérification automatique des disponibilités.' },
            { label: 'Facturation', desc: "Création de devis et factures personnalisés, génération PDF, suivi des paiements et relances automatiques." },
            { label: 'Espace collaborateur', desc: 'Consultation du planning personnel, détail des interventions à venir, demandes de congé en ligne.' },
            { label: 'Espace client', desc: 'Suivi des factures et interventions, modification des informations personnelles, notifications la veille des passages.' },
    
          ].map(({ label, desc }) => (
            <div
              key={label}
              className="flex flex-col gap-1.5 p-4 rounded-xl"
              style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
            >
              <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{label}</span>
              <span className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Captures — à décommenter quand tu as les images */}
      {/*
      <div className="flex flex-col gap-4">
        <SectionTitle>Aperçu</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { src: '/medias/teamjardin-accueil.png', caption: "Page d'accueil vitrine" },
            { src: '/medias/teamjardin-planning.png', caption: 'Interface de gestion du planning' },
            { src: '/medias/teamjardin-facture.png', caption: 'Édition de facture' },
          ].map(({ src, caption }) => (
            <figure key={src} className="flex flex-col gap-2">
              <img src={src} alt={caption} className="w-full rounded-xl" style={{ border: '1px solid var(--border-subtle)' }} />
              <figcaption className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      */}

      {/* Conception */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Démarche de conception</SectionTitle>
        <Paragraph>
          Le projet a suivi une méthodologie complète : analyse de l'existant comparant ERP (Axonaut, Odoo),
          logiciels de facturation (Facture.net, Qonto) et outils de planning (Calendly, Trello),
          priorisation des besoins via la méthode MOSCOW, maquettage sur Figma, modélisation UML
          (diagrammes de cas d'utilisation, diagramme de séquence pour la facturation) et planification
          via WBS et diagramme de Gantt.
        </Paragraph>
        <Paragraph>
          Ce projet a été notre premier projet utilisant une vraie architecture d'application, nous avons utilisé le modèle MVC afin de bien séparer les responsabilités du projet, les vues, les données
          et la logique métier derrière chaque fonctionnalité du site.
        </Paragraph>
      </div>

      {/* Compétences */}
      <div className="flex flex-col gap-5">
        <SectionTitle>Compétences B.U.T. mobilisées</SectionTitle>
        <CompetenceBlock
          id="realiser"
          justification="Ce projet couvre l'intégralité du cycle de développement : recueil des besoins, conception des maquettes sur Figma, développement full-stack PHP/MySQL et déploiement sur les serveurs de l'outil Digital Ocean. J'ai notamment développé le module de facturation avec génération PDF et l'interface de gestion des plannings avec ses trois granularités d'affichage."
          apprentissages={[
            'Implémenter et élaborer des conceptions',
            'Élaborer et implémenter des spécifications fonctionnelles',
            'Adopter de bonnes pratiques de conception et de programmation',
            "Vérifier et valider la qualité de l'application par les tests",
          ]}
        />
        <CompetenceBlock
          id="gerer"
          justification="Nous avons conçu le MCD depuis le cahier des charges en modélisant les entités et leurs relations, puis implémenté la base MySQL en garantissant l'intégrité référentielle. Les requêtes de planning ont été optimisées pour gérer efficacement la vérification des disponibilités des collaborateurs."
          apprentissages={[
            "Concevoir une base de données à partir d'un cahier des charges",
            'Mettre à jour et interroger une base de données relationnelle',
            'Assurer la sécurité des données',
          ]}
        />
        <CompetenceBlock
          id="conduire"
          justification="Le projet a été conduit avec une méthodologie structurée : analyse de l'existant, MOSCOW pour la priorisation, WBS et Gantt pour la planification, diagrammes UML pour la formalisation. Cette démarche a permis de respecter les échéances et de livrer un produit cohérent avec les besoins identifiés."
          apprentissages={[
            "Appréhender les besoins du client et de l'utilisateur",
            'Mettre en place les outils de gestion de projet',
            "Identifier les acteurs et les phases d'un cycle de développement",
            'Formaliser les besoins du client',
          ]}
        />
        <CompetenceBlock
          id="collaborer"
          justification="Projet réalisé en équipe de quatre avec répartition claire des rôles. GitHub pour la gestion de versions, Discord pour la communication quotidienne, Google Docs pour la rédaction collaborative du dossier de conception. La coordination a été essentielle pour tenir le planning Gantt."
          apprentissages={[
            "Identifier les rôles de chaque membre d'une équipe",
            'Acquérir les compétences interpersonnelles pour travailler en équipe',
            'Rendre compte de son activité professionnelle',
          ]}
        />
      </div>

    </ProjetLayout>
  )
}