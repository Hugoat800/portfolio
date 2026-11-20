import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SKILLS } from '../../data/skills'
import { PROJECTS } from '../../data/projects'
import { useContent } from '../../hooks/useContent'
import Section from '../Section/Section'
import './Competences.css'
export default function Competences() {
  const { t } = useTranslation()
  const content = useContent()
  return (
    <Section id="competences">
      <div className="skills-grid">
        {SKILLS.map(({ id, level }, index) => {
          const skill = content.skill(id)
          return (
            <details className="skill-card" key={id}>
              <summary>
                <span className="item-index">0{index + 1}</span>
                <h3>{skill.label}</h3>
                <span className="expand-indicator" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{skill.description}</p>
              <p className="skill-level">
                {t('common.level', { level, label: skill.levels[level - 1] })}
              </p>
              <ul className="learning-list">
                {skill.learnings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h4>{t('common.usedIn')}</h4>
              <ul className="related-projects">
                {PROJECTS.filter((p) => p.skills.includes(id)).map((p) => (
                  <li key={p.slug}>
                    <Link to={`/projet/${p.slug}`}>{content.project(p.slug).title} </Link>
                  </li>
                ))}
              </ul>
            </details>
          )
        })}
      </div>
    </Section>
  )
}
