import ProjetLayout from './_ProjetLayout'
import { SectionTitle, Paragraph, CompetenceBlock, FeatureCard, TechBadge } from '../../components/ProjetPageBlocks'
import type { Theme } from '../../hooks/useTheme'

interface Props {
  theme: Theme
  onThemeToggle: () => void
}

export default function MovieTorPage({ theme, onThemeToggle }: Props) {
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
          MovieTor
        </h1>
        <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
          TP de développement mobile — B.U.T. Informatique
        </p>
        <p className="text-[1.05rem] leading-relaxed max-w-[640px]" style={{ color: 'var(--text-secondary)' }}>
          Application Android pour explorer films, séries et acteurs, consulter leurs notes,
          extraits et relations, et constituer sa propre watchlist et liste de favoris.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {['Kotlin', 'Android Studio', 'Firebase'].map((t) => <TechBadge key={t}>{t}</TechBadge>)}
        </div>
        <div className="flex gap-3 pt-1">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-primary">
            Code source
          </a>
        </div>
      </div>

      {/* Aperçu vidéo */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Aperçu du projet</SectionTitle>
        <figure className="flex flex-col gap-2 items-center">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--border-subtle)', maxHeight: '600px', maxWidth: '100%' }}
          >
            <video controls className="block" style={{ maxHeight: '600px', width: 'auto', maxWidth: '100%' }}>
              <source src="/projets/movietor/videoMovieTor.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
          
        </figure>
      </div>

      {/* Contexte */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Contexte</SectionTitle>
        <Paragraph>
          MovieTor est né d'un TP de développement mobile que nous avons souhaité pousser
          au-delà du cadre initial, à trois — Leny Arizzi, Aurélien Claudin et moi-même.
          L'objectif était de construire une application Android complète exploitant une
          base de données de films et séries pour offrir une expérience de découverte
          proche de celle des grandes plateformes du secteur.
        </Paragraph>
        <Paragraph>
          L'application consomme une API externe spécialisée dans les données cinématographiques
          pour récupérer fiches de films, séries, acteurs et métadonnées associées (notes,
          extraits, distribution). Firebase est utilisé pour l'authentification des utilisateurs
          et la persistance de leurs listes personnelles.
        </Paragraph>
      </div>

      {/* Fonctionnalités */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Fonctionnalités principales</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FeatureCard label="Watchlist" desc="Ajout de films et séries à une liste à regarder plus tard, consultable à tout moment." />
          <FeatureCard label="Favoris" desc="Marquage des films et séries préférés pour un accès rapide." />
          <FeatureCard label="Extraits vidéo" desc="Visionnage de bandes-annonces et extraits directement depuis la fiche du film ou de la série." />
          <FeatureCard label="Fiches acteurs" desc="Consultation des informations sur les acteurs et visualisation de leurs relations avec d'autres films et séries." />
          <FeatureCard label="Notes et avis" desc="Affichage des notes des films et séries pour orienter le choix de visionnage." />
          <FeatureCard label="Recherche" desc="Recherche rapide parmi le catalogue de films et séries disponibles." />
        </div>
      </div>

      {/* Équipe */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Équipe</SectionTitle>
        <Paragraph>
          Projet réalisé à trois : Leny Arizzi, Aurélien Claudin et moi-même. Chacun a
          contribué au développement des différents écrans et fonctionnalités de
          l'application, avec une répartition du travail basée sur les modules
          (catalogue, fiches détail, gestion des listes utilisateur).
        </Paragraph>
      </div>

      {/* Compétences */}
      <div className="flex flex-col gap-5">
        <SectionTitle>Compétences B.U.T. mobilisées</SectionTitle>
        <CompetenceBlock
          id="realiser"
          justification="Développement d'une application Android complète en Kotlin, depuis l'intégration de l'API externe jusqu'à la conception des interfaces de navigation entre catalogue, fiches détail et listes personnelles. J'ai notamment travaillé sur l'affichage des relations entre acteurs et œuvres ainsi que sur la lecture des extraits vidéo intégrés."
          apprentissages={[
            'Implémenter et élaborer des conceptions',
            'Élaborer et implémenter des spécifications fonctionnelles',
            'Adopter de bonnes pratiques de conception et de programmation',
            "Adapter des applications sur un ensemble de supports",
          ]}
        />
        <CompetenceBlock
          id="gerer"
          justification="Intégration de Firebase Authentication pour la gestion des comptes utilisateurs, permettant à chacun de disposer de sa propre watchlist et liste de favoris persistante."
          apprentissages={[
            'Assurer la sécurité des données',
          ]}
        />
        <CompetenceBlock
          id="collaborer"
          justification="Travail en équipe de trois avec répartition des modules de l'application et coordination régulière pour assurer la cohérence de l'expérience utilisateur entre les différents écrans développés en parallèle."
          apprentissages={[
            "Identifier les rôles de chaque membre d'une équipe",
            'Acquérir les compétences interpersonnelles pour travailler en équipe',
          ]}
        />
      </div>

    </ProjetLayout>
  )
}