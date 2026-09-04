import type { Projet, FiltreProjet } from '../types'

export const PROJETS: Projet[] = [
  {
    id: 1,
    slug: 'team-jardin',
    titre: 'Team Jardin',
    type: 'etudiant',
    annee: '2025',
    contexte: 'SAE S3.01 - B.U.T. Informatique, 2ème année',
    description: "Application web centralisant la gestion d'une entreprise de paysagisme : planning, facturation et espace collaborateur.",
    technos: ['PHP', 'JavaScript', 'HTML', 'CSS', 'MySQL'],
    competences: ['realiser', 'gerer', 'conduire', 'collaborer'],
    liens: { git: 'https://github.com', demo: null },
    image: '/projets/teamjardin/image.png'
  },
  {
  id: 5, // adapte selon le prochain id disponible
  slug: 'movietor',
  titre: 'MovieTor',
  type: 'etudiant',
  annee: '2026',
  contexte: 'TP de développement mobile — B.U.T. Informatique',
  description: "Application mobile Android pour découvrir films, séries, acteurs et leurs relations, avec watchlist et favoris.",
  technos: ['Kotlin'],
  competences: ['realiser', 'gerer', 'collaborer'],
  liens: { git: 'https://github.com', demo: null },
  image: '/projets/movietor/movieTor.png'
},
{
  id: 6, // adapte selon le prochain id disponible
  slug: 'lumiere-mobilites',
  image: '/projets/lumiere/lumiere.png',
  titre: 'Lumière Mobilités',
  type: 'etudiant',
  annee: '2025',
  contexte: 'SAE de développement — B.U.T. Informatique, 2ème semestre',
  description: "Application Java avec IHM Swing pour optimiser des trajets touristiques lors de la Fête des Lumières de Lyon, via plusieurs algorithmes de résolution du problème du voyageur de commerce.",
  technos: ['Java', 'Swing'],
  competences: ['realiser', 'optimiser', 'collaborer'],
  liens: { git: 'https://github.com', demo: null },
  
},
{
  id: 7, // adapte selon le prochain id disponible
  slug: 'ultimatecourse',
  image: '/projets/ultimatecourse/ultimatecourse.png',
  titre: 'UltimateCourse',
  type: 'etudiant',
  annee: '2026',
  contexte: 'TP noté Symfony — B.U.T. Informatique, 2ème année',
  description: "Application web de gestion de listes de courses développée en Symfony, avec catalogue multilingue, statistiques de dépenses et espace administrateur.",
  technos: ['PHP', 'Symfony', 'MySQL', 'Twig', 'Bootstrap'],
  competences: ['realiser', 'gerer', 'collaborer'],
  liens: { git: 'https://forge.univ-lyon1.fr/p2401392/ultimatecourse', demo: null },
},
{
  id: 8, // adapte selon le prochain id disponible
  slug: 'stage-nperf',
  image: '/projets/nperf/nperf.png',
  titre: 'Refonte du formulaire d\'hébergement nPerf',
  type: 'stage',
  annee: '2026',
  contexte: 'Stage de 2ème année - nPerf, Villeurbanne (mai-juillet 2026)',
  description: "Refonte complète d'un formulaire de demande d'hébergement de serveur en React/TypeScript, avec backend PHP et intégration automatisée au système de ticketing osTicket.",
  technos: ['React', 'TypeScript', 'Tailwind CSS', 'PHP'],
  competences: ['realiser', 'optimiser', 'administrer', 'collaborer', 'conduire'],
  liens: { git: null, demo: 'https://www.nperf.com' },
},
{
  id: 9, // adapte selon le prochain id disponible
  slug: 'annuaire',
  image: '/projets/annuaire/annuaire.png',
  titre: 'Annuaire',
  type: 'etudiant',
  annee: '2024',
  contexte: 'Projet de développement — B.U.T. Informatique, 1ère année',
  description: "Annuaire client en C avec interface console paginée, gestion CSV, tri et filtrage des données.",
  technos: ['C'],
  competences: ['realiser', 'optimiser', 'gerer', 'conduire', 'collaborer'],
  liens: { git: null, demo: null },
},
]

export const FILTRES_PROJETS: FiltreProjet[] = [
  { value: 'tous',      label: 'Tous les projets' },
  { value: 'etudiant',  label: 'Projets étudiants' },
  { value: 'stage',     label: 'Stage' },
  
]
