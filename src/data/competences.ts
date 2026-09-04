import type { Competence, NiveauxAcquis } from '../types'

export const COMPETENCES: Competence[] = [
  {
    id: 'realiser',
    label: 'Réaliser',
    color: '#6366f1',
    accentRgb: '99, 102, 241',
    description: 'Développer une solution informatique pour un client.',
    niveaux: [
      { numero: 1, titre: 'Développer des applications informatiques simples' },
      { numero: 2, titre: "Partir des exigences et aller jusqu'à une application complète" },
      { numero: 3, titre: "Adapter des applications sur un ensemble de supports" },
    ],
    apprentissages: [
      'Implémenter et élaborer des conceptions',
      'Élaborer et implémenter des spécifications fonctionnelles',
      'Adopter de bonnes pratiques de conception et de programmation',
      "Vérifier et valider la qualité de l'application par les tests",
      'Choisir et implémenter les architectures adaptées',
      "Intégrer des solutions dans un environnement de production",
    ],
  },
  {
    id: 'optimiser',
    label: 'Optimiser',
    color: '#8b5cf6',
    accentRgb: '139, 92, 246',
    description: 'Proposer des applications informatiques optimisées selon des critères spécifiques.',
    niveaux: [
      { numero: 1, titre: 'Appréhender et construire des algorithmes' },
      { numero: 2, titre: 'Sélectionner les algorithmes adéquats pour répondre à un problème donné' },
      { numero: 3, titre: 'Analyser et optimiser des applications' },
    ],
    apprentissages: [
      'Analyser un problème avec méthode',
      'Comparer des algorithmes pour des problèmes classiques',
      'Choisir des structures de données complexes adaptées',
      'Comprendre les enjeux de sécurisation des données',
      'Anticiper les résultats de diverses métriques',
      "Profiler, analyser et justifier le comportement d'un code",
    ],
  },
  {
    id: 'administrer',
    label: 'Administrer',
    color: '#7c3aed',
    accentRgb: '124, 58, 237',
    description: 'Installer, configurer et maintenir des infrastructures, services et réseaux.',
    niveaux: [
      { numero: 1, titre: 'Installer et configurer un poste de travail' },
      { numero: 2, titre: "Déployer des services dans une architecture réseau" },
    ],
    apprentissages: [
      'Identifier les composants matériels et logiciels',
      "Installer et configurer un système d'exploitation",
      'Concevoir et développer des applications communicantes',
      'Utiliser des serveurs et services réseaux virtualisés',
      "Sécuriser les services et données d'un système",
    ],
  },
  {
    id: 'gerer',
    label: 'Gérer',
    color: '#4f46e5',
    accentRgb: '79, 70, 229',
    description: "Concevoir, gérer et exploiter les données de l'entreprise.",
    niveaux: [
      { numero: 1, titre: 'Concevoir et mettre en place une base de données' },
      { numero: 2, titre: "Optimiser une base de données et mettre en œuvre la sécurité" },
    ],
    apprentissages: [
      'Mettre à jour et interroger une base de données relationnelle',
      "Concevoir une base de données à partir d'un cahier des charges",
      "Optimiser les modèles de données de l'entreprise",
      'Assurer la sécurité des données',
      'Organiser la restitution de données et la visualisation',
    ],
  },
  {
    id: 'conduire',
    label: 'Conduire',
    color: '#3730a3',
    accentRgb: '55, 48, 163',
    description: 'Organiser et piloter un projet informatique avec des méthodes classiques ou agiles.',
    niveaux: [
      { numero: 1, titre: 'Identifier les besoins métiers des clients et des utilisateurs' },
      { numero: 2, titre: 'Appliquer une démarche de suivi de projet' },
    ],
    apprentissages: [
      "Appréhender les besoins du client et de l'utilisateur",
      'Mettre en place les outils de gestion de projet',
      "Identifier les acteurs et les phases d'un cycle de développement",
      'Formaliser les besoins du client',
      'Définir et mettre en œuvre une démarche de suivi de projet',
    ],
  },
  {
    id: 'collaborer',
    label: 'Collaborer',
    color: '#1d4ed8',
    accentRgb: '29, 78, 216',
    description: 'Travailler efficacement dans une équipe informatique.',
    niveaux: [
      { numero: 1, titre: 'Identifier ses aptitudes pour travailler dans une équipe' },
      { numero: 2, titre: 'Situer son rôle et ses missions au sein d\'une équipe' },
      { numero: 3, titre: 'Manager une équipe informatique' },
    ],
    apprentissages: [
      "Appréhender l'écosystème numérique",
      "Identifier les rôles de chaque membre d'une équipe",
      'Acquérir les compétences interpersonnelles pour travailler en équipe',
      'Appliquer une démarche pour intégrer une équipe informatique',
      'Rendre compte de son activité professionnelle',
      'Organiser et partager une veille technologique',
    ],
  },
]

// Niveaux acquis par compétence — à personnaliser (1, 2 ou 3)
export const NIVEAUX_ACQUIS: NiveauxAcquis = {
  realiser:    3,
  optimiser:   2,
  administrer: 2,
  gerer:       2,
  conduire:    2,
  collaborer:  3,
}
