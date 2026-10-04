export type CompetenceId =
  'realiser' | 'optimiser' | 'administrer' | 'gerer' | 'conduire' | 'collaborer'
export type ProjectType = 'etudiant' | 'stage' | 'personnel'
export interface Project {
  id: number
  slug: string
  type: ProjectType
  year: string
  technologies: string[]
  skills: CompetenceId[]
  links: { source: string | null; website: string | null }
  image?: string
  video?: string
}
export interface ContentSection {
  title: string
  paragraphs: string[]
  features: { title: string; description: string }[]
}
export interface ProjectContent {
  title: string
  context: string
  description: string
  sections: ContentSection[]
  evidence: { id: CompetenceId; description: string; learnings: string[] }[]
}
export interface SkillContent {
  label: string
  description: string
  levels: string[]
  learnings: string[]
}
export interface Techno {
  name: string
  categories: string[]
  logo: string
}
