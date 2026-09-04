// ── Compétences ───────────────────────────────────────────────────────────

export type CompetenceId =
  | 'realiser'
  | 'optimiser'
  | 'administrer'
  | 'gerer'
  | 'conduire'
  | 'collaborer'

export interface NiveauCompetence {
  numero: number
  titre: string
}

export interface Experience {
  id: number
  titre: string
  entreprise: string
  lieu: string
  periode: string
  description: string
  technos: string[]
  competences: CompetenceId[]
  enCours?: boolean
  lien?: string   // ← nouveau
}

export interface Competence {
  id: CompetenceId
  label: string
  color: string
  accentRgb: string
  description: string
  niveaux: NiveauCompetence[]
  apprentissages: string[]
}

export type NiveauxAcquis = Record<CompetenceId, number>

// ── Projets ───────────────────────────────────────────────────────────────

export type TypeProjet = 'etudiant' | 'stage' | 'personnel'

export interface LiensProjet {
  git: string | null
  demo: string | null
}




export interface Projet {
  id: number
  slug: string
  titre: string
  type: TypeProjet
  annee: string
  contexte: string
  description: string
  technos: string[]
  competences: CompetenceId[]
  liens: LiensProjet
  image?: string
}


export interface FiltreProjet {
  value: 'tous' | TypeProjet
  label: string
}

// ── Technologies ──────────────────────────────────────────────────────────

export interface Techno {
  name: string
  categories: string[]
  logo: string
}




