import ProjetLayout from './_ProjetLayout'
import { SectionTitle, Paragraph, CompetenceBlock, FeatureCard, TechBadge } from '../../components/ProjetPageBlocks'
import type { Theme } from '../../hooks/useTheme'

interface Props {
  theme: Theme
  onThemeToggle: () => void
}

export default function LumiereMobilitesPage({ theme, onThemeToggle }: Props) {
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
          Lumière Mobilités
        </h1>
        <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
          SAE de développement — B.U.T. Informatique, 2ème semestre
        </p>
        <p className="text-[1.05rem] leading-relaxed max-w-[640px]" style={{ color: 'var(--text-secondary)' }}>
          Application Java avec interface graphique Swing, conçue pour optimiser des
          trajets touristiques à travers les différents sites illuminés lors de la
          Fête des Lumières de Lyon. Plusieurs algorithmes de résolution du problème
          du voyageur de commerce permettent de comparer différentes stratégies de parcours.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {['Java', 'Swing', 'JXMapViewer'].map((t) => (
            <TechBadge key={t}>{t}</TechBadge>
          ))}
        </div>
        <div className="flex gap-3 pt-1">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-primary">
            Code source
          </a>
        </div>
      </div>

      {/* Aperçu du projet */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Aperçu du projet</SectionTitle>
        <figure className="flex flex-col gap-2">
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--border-subtle)', aspectRatio: '16/9' }}
          >
            <video controls className="w-full h-full object-cover">
              <source src="/projets/lumiere/2026-06-17-20-17-04.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
        </figure>
      </div>

      {/* Contexte */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Contexte</SectionTitle>
        <Paragraph>
          Réalisé dans le cadre d'une SAE de développement de deuxième semestre, ce
          projet a été mené à trois avec Antoine Panouillot et Nicolas Manesse.
          L'objectif était de concevoir un outil capable de calculer des trajets
          touristiques optimisés entre différents points d'intérêt de la Fête des
          Lumières de Lyon, en s'appuyant sur des algorithmes classiques de résolution
          du problème du voyageur de commerce (TSP).
        </Paragraph>
        <Paragraph>
          L'application gère deux types de points : des points euclidiens, affichés
          sur un repère orthonormé avec une visualisation graphique personnalisée, et
          des points géographiques, affichés sur une carte interactive réelle via la
          librairie JXMapViewer connectée aux tuiles OpenStreetMap.
        </Paragraph>
      </div>

      {/* Fonctionnalités */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Fonctionnalités principales</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FeatureCard label="Double visualisation" desc="Bascule entre une carte euclidienne (repère orthonormé) et une carte géographique réelle selon le type de données chargées." />
          <FeatureCard label="Chargement de fichiers" desc="Import de jeux de points depuis un fichier texte, avec détection automatique du type euclidien ou géographique." />
          <FeatureCard label="Génération aléatoire" desc="Création rapide de jeux de points euclidiens aléatoires pour tester les algorithmes." />
          <FeatureCard label="Quatre algorithmes" desc="Glouton, Aléatoire, Insertion et un algorithme personnalisé combinant Glouton et optimisation 2-Opt." />
          <FeatureCard label="Édition interactive" desc="Ajout et suppression de points directement au clic sur la carte, avec menu contextuel." />
          <FeatureCard label="Comparaison de circuits" desc="Sauvegarde des résultats de chaque algorithme exécuté et comparaison des distances totales obtenues." />
        </div>
      </div>

      {/* Algorithmes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Algorithmes implémentés</SectionTitle>
        <Paragraph>
          Le cœur du projet repose sur la comparaison de plusieurs heuristiques de
          résolution du TSP. L'algorithme Glouton construit le circuit en choisissant
          systématiquement le point le plus proche non encore visité. L'algorithme
          Aléatoire génère un ordre de parcours arbitraire, servant de référence basse.
          L'algorithme Insertion construit le circuit en insérant progressivement
          chaque point à la position qui minimise l'allongement du trajet. Enfin,
          l'algorithme personnalisé combine une première solution Glouton avec une
          phase d'amélioration par 2-Opt, qui élimine les croisements de trajet pour
          réduire la distance totale.
        </Paragraph>
      </div>

      {/* Équipe */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Équipe</SectionTitle>
        <Paragraph>
          Projet réalisé à trois : Antoine Panouillot, Nicolas Manesse et moi-même,
          avec une répartition du travail entre la logique algorithmique, la gestion
          des données et la construction de l'interface graphique.
        </Paragraph>
      </div>

      {/* Compétences */}
      <div className="flex flex-col gap-5">
        <SectionTitle>Compétences B.U.T. mobilisées</SectionTitle>
        <CompetenceBlock
          id="realiser"
          justification="Développement d'une interface graphique Swing complète avec GridBagLayout, gestion de deux modes de visualisation interchangeables via CardLayout, et intégration de la librairie JXMapViewer pour l'affichage cartographique réel avec gestion des interactions souris (pan, zoom, clic sur point)."
          apprentissages={[
            'Implémenter et élaborer des conceptions',
            'Adopter de bonnes pratiques de conception et de programmation',
            "Intégrer des solutions dans un environnement de production",
          ]}
        />
        <CompetenceBlock
          id="optimiser"
          justification="Implémentation et comparaison de plusieurs algorithmes de résolution du problème du voyageur de commerce : Glouton, Insertion, Aléatoire, ainsi qu'un algorithme personnalisé combinant une heuristique de construction avec une phase d'amélioration 2-Opt. La fonctionnalité de comparaison de circuits permet d'évaluer concrètement les écarts de performance entre ces approches."
          apprentissages={[
            'Analyser un problème avec méthode',
            'Comparer des algorithmes pour des problèmes classiques',
            'Choisir des structures de données complexes adaptées',
          ]}
        />
        <CompetenceBlock
          id="collaborer"
          justification="Travail en équipe de trois avec répartition des responsabilités entre la couche algorithmique, le modèle de données (points euclidiens et géographiques) et l'interface utilisateur, nécessitant une coordination étroite pour assurer la cohérence entre les différentes parties du système."
          apprentissages={[
            "Identifier les rôles de chaque membre d'une équipe",
            'Acquérir les compétences interpersonnelles pour travailler en équipe',
          ]}
        />
      </div>

    </ProjetLayout>
  )
}