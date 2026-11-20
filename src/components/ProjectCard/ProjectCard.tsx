import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { CompetenceId, Project } from '../../types'
import { useContent } from '../../hooks/useContent'
import TagList from '../TagList/TagList'
import './ProjectCard.css'
export default function ProjectCard({
  project,
  onSkillClick,
}: {
  project: Project
  onSkillClick: (id: CompetenceId) => void
}) {
  const { t } = useTranslation()
  const content = useContent()
  const text = content.project(project.slug)
  return (
    <article className="project-card">
      {project.image && (
        <Link to={`/projet/${project.slug}`} className="project-image" aria-label={text.title}>
          <img src={project.image} alt="" loading="lazy" />
        </Link>
      )}
      <div className="project-card-body">
        <p className="project-meta">
          {t(`projectTypes.${project.type}`)} <span>{project.year}</span>
        </p>
        <h3>
          <Link to={`/projet/${project.slug}`}>{text.title}</Link>
        </h3>
        <p>{text.description}</p>
        <TagList items={project.technologies} />
        <div className="skill-links">
          {project.skills.map((id) => (
            <button
              key={id}
              onClick={() => onSkillClick(id)}
              aria-label={t('common.filterSkill', { skill: content.skill(id).label })}
            >
              {content.skill(id).label}
            </button>
          ))}
        </div>
        <Link to={`/projet/${project.slug}`} className="project-detail-link">
          {t('common.readProject')}
        </Link>
      </div>
    </article>
  )
}
