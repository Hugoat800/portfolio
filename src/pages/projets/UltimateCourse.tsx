import ProjetLayout from './_ProjetLayout'
import { SectionTitle, Paragraph, CompetenceBlock, FeatureCard, TechBadge } from '../../components/ProjetPageBlocks'
import type { Theme } from '../../hooks/useTheme'

interface Props {
  theme: Theme
  onThemeToggle: () => void
}

export default function UltimateCoursePage({ theme, onThemeToggle }: Props) {
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
          UltimateCourse
        </h1>
        <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
          TP noté Symfony — B.U.T. Informatique, 2ème année
        </p>
        <p className="text-[1.05rem] leading-relaxed max-w-[640px]" style={{ color: 'var(--text-secondary)' }}>
          Application web de gestion de listes de courses, conçue comme une preuve
          de concept pour aider les consommateurs à mieux maîtriser leur budget
          alimentaire à travers un suivi détaillé de leurs achats.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {['PHP', 'Symfony', 'Doctrine ORM', 'Twig', 'Bootstrap', 'MySQL'].map((t) => (
            <TechBadge key={t}>{t}</TechBadge>
          ))}
        </div>
        <div className="flex gap-3 pt-1">
          <a href="https://forge.univ-lyon1.fr/p2401392/ultimatecourse" target="_blank" rel="noreferrer" className="btn-primary">
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
              <source src="/projets/ultimatecourse/2026-06-17 21-53-22.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
        </figure>
      </div>

      {/* Contexte */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Contexte</SectionTitle>
        <Paragraph>
          Réalisé dans le cadre d'un TP noté de deuxième année visant à approfondir
          le framework Symfony, ce projet a été mené à trois avec Aurélien Claudin
          et Leny Arizzi. Le scénario imposait de développer la version V0 d'une
          application de gestion de listes de courses pour le compte d'un
          entrepreneur fictif, dans une logique de preuve de concept destinée à
          convaincre des investisseurs.
        </Paragraph>
        <Paragraph>
          L'enjeu technique principal résidait dans la mise en œuvre de
          fonctionnalités avancées du framework au-delà du simple CRUD : gestion
          des droits par Voter, vérification d'email à l'inscription, traduction
          multilingue des données métier et contraintes de validation personnalisées.
        </Paragraph>
      </div>

      {/* Fonctionnalités */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Fonctionnalités principales</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FeatureCard label="Authentification sécurisée" desc="Inscription et connexion avec vérification de l'adresse email avant activation du compte." />
          <FeatureCard label="Gestion des listes de courses" desc="Création, consultation et suppression de listes, avec ajout d'articles et gestion des quantités." />
          <FeatureCard label="Suivi et statistiques" desc="Total des dépenses, coût moyen par article, article le plus cher et le moins cher, répartition par catégorie." />
          <FeatureCard label="Interface multilingue" desc="Site disponible en français, anglais et japonais, avec conversion automatique des prix selon la devise locale." />
          <FeatureCard label="Espace administrateur" desc="CRUD complet pour la gestion des articles, des types d'articles et des magasins." />
          <FeatureCard label="Validation personnalisée" desc="Contraintes de validation sur-mesure, notamment un filtre de mots interdits sur les champs texte." />
        </div>
      </div>

      {/* Choix techniques */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Choix techniques</SectionTitle>
        <Paragraph>
          La traduction des entités métier (articles, types, magasins) repose sur
          Gedmo Translatable, permettant de stocker les variantes linguistiques
          directement liées aux entités Doctrine. La vérification d'email s'appuie
          sur le bundle SymfonyCasts Verify Email, avec envoi des messages de
          confirmation via Gmail. Les données de test sont générées avec Faker PHP
          pour disposer d'un jeu de données réaliste dès l'installation du projet.
          La gestion des droits entre utilisateur standard et administrateur est
          assurée par un système de Voter Symfony plutôt que par de simples
          vérifications de rôle dans les contrôleurs.
        </Paragraph>
      </div>

      {/* Équipe */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Équipe</SectionTitle>
        <Paragraph>
          Projet réalisé à trois : Aurélien Claudin, Leny Arizzi et moi-même, avec
          une répartition du travail entre la gestion des entités et de la base de
          données, l'implémentation des fonctionnalités métier et la mise en place
          de l'internationalisation du site.
        </Paragraph>
      </div>

      {/* Compétences */}
      <div className="flex flex-col gap-5">
        <SectionTitle>Compétences B.U.T. mobilisées</SectionTitle>
        <CompetenceBlock
          id="realiser"
          justification="Développement complet d'une application Symfony incluant authentification, formulaires, gestion des droits par Voter et internationalisation. La contrainte de mots interdits a nécessité l'écriture d'un Validator personnalisé, et la vérification d'email l'intégration d'un bundle tiers avec configuration d'envoi via Gmail."
          apprentissages={[
            'Implémenter et élaborer des conceptions',
            'Élaborer et implémenter des spécifications fonctionnelles',
            'Adopter de bonnes pratiques de conception et de programmation',
          ]}
        />
        <CompetenceBlock
          id="gerer"
          justification="Modélisation des entités Doctrine (articles, listes, types, magasins, utilisateurs) avec relations entre elles, mise en place des migrations et des fixtures de test. La fonctionnalité de statistiques a nécessité l'écriture de requêtes d'agrégation pour calculer totaux, moyennes et répartitions par catégorie."
          apprentissages={[
            "Concevoir une base de données à partir d'un cahier des charges",
            'Mettre à jour et interroger une base de données relationnelle',
          ]}
        />
        <CompetenceBlock
          id="collaborer"
          justification="Travail en équipe de trois sous contrainte de temps fixée par le TP noté, avec répartition des modules entre les membres et coordination pour respecter le délai de rendu, incluant la préparation d'un support de présentation orale du projet."
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