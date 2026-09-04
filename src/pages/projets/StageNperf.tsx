import ProjetLayout from './_ProjetLayout'
import { SectionTitle, Paragraph, CompetenceBlock, FeatureCard, TechBadge } from '../../components/ProjetPageBlocks'
import type { Theme } from '../../hooks/useTheme'

interface Props {
  theme: Theme
  onThemeToggle: () => void
}

export default function StageNperfPage({ theme, onThemeToggle }: Props) {
  return (
    <ProjetLayout theme={theme} onThemeToggle={onThemeToggle}>

      {/* En-tête */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="badge-blue">Stage</span>
          <span className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>Mai — Juillet 2026</span>
        </div>
        <h1
          className="font-display font-bold leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}
        >
          Refonte du formulaire d'hébergement nPerf
        </h1>
        <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
          Stage de 2ème année B.U.T. — nPerf, Villeurbanne
        </p>
        <p className="text-[1.05rem] leading-relaxed max-w-[640px]" style={{ color: 'var(--text-secondary)' }}>
          Refonte complète de l'outil de demande d'hébergement de serveur du site nPerf,
          passant d'un formulaire statique unique à un parcours interactif multi-étapes,
          avec automatisation de la création de tickets dans le système helpdesk interne.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {['React', 'TypeScript', 'Tailwind CSS', 'PHP'].map((t) => (
            <TechBadge key={t}>{t}</TechBadge>
          ))}
        </div>
        <div className="flex gap-3 pt-1">
          <a href="https://www.nperf.com" target="_blank" rel="noreferrer" className="btn-primary">
            Voir nPerf
          </a>
        </div>
      </div>

      {/* Aperçu du projet */}
        <div className="flex flex-col gap-4">
        <SectionTitle>Aperçu du projet</SectionTitle>
        <div
            className="w-full rounded-2xl flex items-center justify-center py-16"
            style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px dashed var(--border-default)',
            }}
        >
            <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
            En attente de la fin du stage
            </p>
        </div>
        </div>

      {/* Contexte */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Contexte</SectionTitle>
        <Paragraph>
          nPerf est une entreprise lyonnaise spécialisée dans la mesure et l'analyse de
          la performance des connexions internet, dont l'activité repose en grande partie
          sur un réseau de plus de 3 000 serveurs de test déployés à travers le monde
          chez des partenaires. La gestion administrative de ces demandes d'hébergement
          passait jusqu'alors par un formulaire web minimaliste, insuffisant pour collecter
          les informations techniques nécessaires.
        </Paragraph>
        <Paragraph>
          Ce manque de structure générait un grand nombre d'échanges supplémentaires
          entre le support et les clients pour obtenir les informations manquantes,
          ralentissant le travail du service informatique chargé de la configuration
          réseau et du déploiement technique des serveurs validés. Certains demandeurs
          allaient jusqu'à soumettre une dizaine de tickets quasiment identiques pour une
          même demande, faute de retour clair sur la prise en compte de leur requête.
        </Paragraph>
      </div>

      {/* Mission */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Ma mission</SectionTitle>
        <Paragraph>
          Ma mission s'inscrivait dans un projet plus large nommé « Efficacité support
          serveur », porté conjointement par l'équipe Web et le service informatique.
          L'objectif était de réduire les échanges inutiles entre le support et ses clients
          en collectant des informations complètes dès le premier contact, à travers un
          parcours guidé en plusieurs étapes plutôt qu'un formulaire unique et dense,
          afin de limiter le risque d'abandon.
        </Paragraph>
        <Paragraph>
          Travaillant seul sur ce projet au sein d'une équipe Web de huit personnes, j'ai
          couvert l'ensemble de la chaîne de développement : conception du parcours
          utilisateur, développement frontend React, gestion des traductions et du mode
          sombre, puis développement du backend PHP assurant la validation des données
          et leur transmission automatisée vers le système de ticketing osTicket.
        </Paragraph>
      </div>

      {/* Fonctionnalités */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Fonctionnalités principales</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FeatureCard label="Parcours multi-étapes" desc="Quatre types de demande pris en charge (création, modification, signalement de problème, autre), chacun orienté vers des étapes spécifiques." />
          <FeatureCard label="Validation à deux niveaux" desc="Validation côté client avec React Hook Form pour l'expérience utilisateur, doublée d'une validation côté serveur en PHP pour garantir l'intégrité des données." />
          <FeatureCard label="Interface multilingue" desc="Disponible en français, anglais et arabe, avec gestion du sens de lecture droite-à-gauche pour cette dernière langue." />
          <FeatureCard label="Mode sombre" desc="Implémentation par variables Tailwind plutôt que logique conditionnelle, pour une maintenance simplifiée." />
          <FeatureCard label="Intégration osTicket" desc="Construction et envoi automatisés du ticket vers le système helpdesk, avec encodage en base64 des pièces jointes." />
          <FeatureCard label="État centralisé via Redux" desc="Élimination du prop drilling grâce à un store centralisant les données du formulaire, accessible depuis n'importe quel composant." />
        </div>
      </div>

      {/* Refactorisation */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Une première version, puis une refactorisation en profondeur</SectionTitle>
        <Paragraph>
          La première version du formulaire, développée rapidement pour couvrir
          l'ensemble des cas d'usage, reposait sur une transmission des données par
          props à travers les composants, certains recevant jusqu'à quatorze props
          différentes. Les revues de code menées par ma maîtresse de stage ont mis en
          évidence plusieurs axes d'amélioration : répartition des responsabilités,
          duplication d'éléments d'interface, nommage peu explicite et accessibilité
          insuffisante.
        </Paragraph>
        <Paragraph>
          Ces retours ont structuré un travail de refactorisation conséquent : extraction
          des éléments répétés en composants génériques réutilisables, centralisation
          du routage entre étapes par association plutôt que par une succession de
          conditions, migration de la gestion d'état vers Redux, et reprise de la
          validation des champs avec React Hook Form. Cette réorganisation a permis de
          réduire significativement la duplication de code tout en facilitant la
          maintenance future du projet par l'équipe.
        </Paragraph>
      </div>

      {/* Équipe et méthode */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Méthode de travail</SectionTitle>
        <Paragraph>
          L'équipe Web fonctionne selon une méthode agile rythmée par des réunions
          quotidiennes et un suivi des tâches sur YouTrack, avec des cartes estimées
          en story points et des revues de code systématiques avant intégration. Bien
          que seul sur le développement de ce formulaire, j'étais pleinement intégré à
          cette organisation d'équipe, ce qui m'a permis de bénéficier de retours réguliers
          et de monter en compétence sur des outils que je découvrais pour la première
          fois en conditions réelles, notamment React, Redux et React Hook Form.
        </Paragraph>
      </div>

      {/* Compétences */}
      <div className="flex flex-col gap-5">
        <SectionTitle>Compétences B.U.T. mobilisées</SectionTitle>
        <CompetenceBlock
          id="realiser"
          justification="Développement complet d'une interface React/TypeScript depuis la traduction de la fiche projet jusqu'à l'implémentation finale, en intégrant progressivement les bonnes pratiques de conception identifiées lors des revues de code : fusion de composants quasi identiques, extraction d'éléments réutilisables, et prise en compte de l'accessibilité."
          apprentissages={[
            'Élaborer et implémenter les spécifications fonctionnelles et non fonctionnelles à partir des exigences',
            'Adopter de bonnes pratiques de conception et de programmation',
            "Appliquer des principes d'accessibilité et d'ergonomie",
          ]}
        />
        <CompetenceBlock
          id="optimiser"
          justification="Mise en place d'une validation côté serveur garantissant la sécurité et la fiabilité des données reçues, indépendamment de la validation côté client : rejet des adresses IP mal formées ou privées, contrôle du format et de la taille des fichiers transmis."
          apprentissages={[
            'Comprendre les enjeux et moyens de sécurisation des données et du code',
          ]}
        />
        <CompetenceBlock
          id="administrer"
          justification="Conception du backend PHP assurant la communication avec l'API externe osTicket, incluant la construction du message de ticket selon le type de demande et l'encodage en base64 des pièces jointes pour leur transmission."
          apprentissages={[
            'Concevoir et développer des applications communicantes',
            "Sécuriser les services et données d'un système",
          ]}
        />
        <CompetenceBlock
          id="conduire"
          justification="Suivi de la mission via YouTrack avec décomposition de l'EPIC du projet en tâches individuelles estimées en story points, permettant de visualiser l'avancement réel du travail et de traduire progressivement les besoins exprimés en fonctionnalités concrètes."
          apprentissages={[
            'Définir et mettre en œuvre une démarche de suivi de projet',
            "Formaliser les besoins du client et de l'utilisateur",
          ]}
        />
        <CompetenceBlock
          id="collaborer"
          justification="Intégration au sein d'une équipe de huit développeurs avec participation aux réunions quotidiennes et prise en compte de retours de revue de code exigeants mais constructifs, ayant fait évoluer significativement ma manière de solliciter l'aide de l'équipe au fil du stage."
          apprentissages={[
            'Mobiliser les compétences interpersonnelles pour travailler dans une équipe informatique',
            'Rendre compte de son activité professionnelle',
          ]}
        />
      </div>

    </ProjetLayout>
  )
}