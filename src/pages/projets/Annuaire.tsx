import ProjetLayout from './_ProjetLayout'
import { SectionTitle, Paragraph, CompetenceBlock, FeatureCard, TechBadge } from '../../components/ProjetPageBlocks'
import type { Theme } from '../../hooks/useTheme'

interface Props {
  theme: Theme
  onThemeToggle: () => void
}

export default function AnnuairePage({ theme, onThemeToggle }: Props) {
  return (
    <ProjetLayout theme={theme} onThemeToggle={onThemeToggle}>

      {/* En-tête */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="badge-violet">Projet étudiant</span>
          <span className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>2024</span>
        </div>
        <h1
          className="font-display font-bold leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}
        >
          Annuaire
        </h1>
        <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
          Projet de développement — B.U.T. Informatique, 1ère année
        </p>
        <p className="text-[1.05rem] leading-relaxed max-w-[640px]" style={{ color: 'var(--text-secondary)' }}>
          Annuaire de gestion clients développé en C, avec une interface console paginée
          permettant la lecture de fichiers CSV, l'ajout et la suppression de clients, ainsi
          que le tri et le filtrage des données.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {['C'].map((t) => (
            <TechBadge key={t}>{t}</TechBadge>
          ))}
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
              <source src="/projets/annuaire/annuaire.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
        </figure>
      </div>

      {/* Contexte */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Contexte</SectionTitle>
        <Paragraph>
          Réalisé dans le cadre du module de développement du premier semestre à l'IUT en binôme avec Ugo Lajoie,
          ce projet consistait à concevoir un annuaire de clients en langage C capable
          de gérer, afficher, trier, rechercher et filtrer des données. L'objectif était
          de produire une application structurée et performante, en justifiant chaque
          choix algorithmique effectué.
        </Paragraph>
      </div>

      {/* Structure de données */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Structure de données</SectionTitle>
        <Paragraph>
          L'annuaire s'appuie sur un tableau de structures contenant l'ensemble des
          données client, couplé à un tableau d'indices dédié uniquement à l'affichage,
          au tri et au filtrage. Cette séparation évite toute modification des données
          d'origine : les tris et filtres ne touchent que les indices, ce qui permet de
          réinitialiser l'affichage à tout moment et accélère les opérations courantes.
        </Paragraph>
      </div>

      {/* Modularité */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Modularité</SectionTitle>
        <Paragraph>
          Le programme s'organise autour de menus construits à partir de fonctions
          dédiées, et de fonctions génériques réutilisables comme la demande d'action à
          l'utilisateur, mutualisée entre les différents écrans du programme.
        </Paragraph>
      </div>

      {/* Algorithmes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Choix algorithmiques</SectionTitle>
        <Paragraph>
          Le tri et le filtrage constituant l'un des objectifs centraux du projet du
          point de vue algorithmique, plusieurs approches ont été mises en œuvre : un
          tri rapide (Quick Sort) en complexité O(n log n) pour ordonner l'annuaire,
          une recherche linéaire en O(n) pour localiser un client, et des filtres
          cumulables également en O(n) pour combiner plusieurs critères de sélection.
        </Paragraph>
      </div>

      {/* Fonctionnalités */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Fonctionnalités principales</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FeatureCard label="Import CSV" desc="Lecture et chargement des données client depuis un fichier CSV au démarrage du programme." />
          <FeatureCard label="Gestion des clients" desc="Ajout et suppression de clients dans l'annuaire, avec mise à jour de l'affichage." />
          <FeatureCard label="Tri" desc="Tri rapide des données selon différents critères, via l'algorithme Quick Sort." />
          <FeatureCard label="Filtrage cumulable" desc="Application de plusieurs filtres combinés pour affiner l'affichage de l'annuaire." />
          <FeatureCard label="Pagination console" desc="Navigation paginée dans l'annuaire pour une lecture confortable en interface texte." />
          <FeatureCard label="Menus modulaires" desc="Navigation structurée par menus construits à partir de fonctions dédiées et réutilisables." />
        </div>
      </div>

      {/* Compétences */}
      <div className="flex flex-col gap-5">
        <SectionTitle>Compétences B.U.T. mobilisées</SectionTitle>
        <CompetenceBlock
          id="realiser"
          justification="Développement complet de l'annuaire en C, depuis la lecture des fichiers CSV jusqu'aux fonctionnalités d'ajout, de suppression et d'affichage des clients en interface console."
          apprentissages={[
            'Implémenter et élaborer des conceptions',
            'Adopter de bonnes pratiques de conception et de programmation',
          ]}
        />
        <CompetenceBlock
          id="optimiser"
          justification="Conception et implémentation d'algorithmes de tri et de filtrage pensés pour limiter la complexité des traitements, avec un tri rapide en O(n log n) et des opérations de recherche et de filtrage en O(n)."
          apprentissages={[
            'Analyser un problème avec méthode',
            'Comparer des algorithmes pour des problèmes classiques',
          ]}
        />
        <CompetenceBlock
          id="gerer"
          justification="Structuration des données en mémoire à travers un tableau de structures client et un tableau d'indices séparé, ainsi que manipulation de fichiers CSV pour la persistance des données."
          apprentissages={[
            'Choisir des structures de données complexes adaptées',
          ]}
        />
        <CompetenceBlock
          id="conduire"
          justification="Analyse des besoins fonctionnels du projet (tri, recherche, filtrage) et justification argumentée des choix algorithmiques retenus pour y répondre."
          apprentissages={[
            "Appréhender les besoins du client et de l'utilisateur",
          ]}
        />
        <CompetenceBlock
          id="collaborer"
          justification="Travail en binôme sur la conception modulaire du programme, avec séparation claire des fonctions et répartition des tâches de développement."
          apprentissages={[
            "Identifier les rôles de chaque membre d'une équipe",
          ]}
        />
      </div>

    </ProjetLayout>
  )
}