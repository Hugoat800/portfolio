import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from '../data/projects'
import type { CompetenceId } from '../types'
import { useContent } from '../hooks/useContent'
import Section from './Section'
import ProjectCard from './ProjectCard'
export default function Projets() {
  const { t } = useTranslation()
  const content = useContent()
  const [type, setType] = useState('tous')
  const [skill, setSkill] = useState<CompetenceId | null>(null)
  const projects = PROJECTS.filter(
    (p) => (type === 'tous' || p.type === type) && (!skill || p.skills.includes(skill)),
  )
  return (
    <Section id="projets">
      <div className="filter-bar" role="group" aria-label={t('common.filterType')}>
        {['tous', 'etudiant', 'stage'].map((value) => (
          <button key={value} aria-pressed={type === value} onClick={() => setType(value)}>
            {t(`projectTypes.${value}`)}
          </button>
        ))}
      </div>
      {skill && (
        <button className="active-filter" onClick={() => setSkill(null)}>
          {content.skill(skill).label} ({t('common.clearFilter')}) ×
        </button>
      )}
      <p className="result-count" role="status">
        {t('common.projectCount', { count: projects.length })}
      </p>
      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} onSkillClick={setSkill} />
        ))}
      </div>
      {!projects.length && <p className="empty-state">{t('common.noProjects')}</p>}
    </Section>
  )
}
