import { useTranslation } from 'react-i18next'
import type { CompetenceId, ProjectContent, SkillContent } from '../types'
export function useContent() {
  const { t } = useTranslation()
  return {
    project: (slug: string) => t(`projects.${slug}`, { returnObjects: true }) as ProjectContent,
    skill: (id: CompetenceId) => t(`skills.${id}`, { returnObjects: true }) as SkillContent,
  }
}
