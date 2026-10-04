import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from '../data/projects'
import { useContent } from '../hooks/useContent'
import TagList from '../components/TagList'
export default function ProjectPage() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const content = useContent()
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project)
    return (
      <div className="not-found container">
        <h1>{t('common.notFound')}</h1>
        <Link to="/#projets">{t('common.backProjects')}</Link>
      </div>
    )
  const text = content.project(project.slug)
  const next = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length]
  return (
    <article className="project-page container">
      <Link className="btn-outline" to="/#projets">
        {t('common.backProjects')}
      </Link>
      <header className="project-header">
        <p className="project-meta">
          {t(`projectTypes.${project.type}`)} · {project.year}
        </p>
        <h1>{text.title}</h1>
        <p className="project-context">{text.context}</p>
        <p className="project-description">{text.description}</p>
        <TagList items={project.technologies} />
        <div className="hero-actions">
          {project.links.source && (
            <a className="btn-primary" href={project.links.source} target="_blank" rel="noreferrer">
              {t('common.source')}
            </a>
          )}
          {project.links.website && (
            <a
              className="btn-outline"
              href={project.links.website}
              target="_blank"
              rel="noreferrer"
            >
              {t('common.website')}
            </a>
          )}
        </div>
      </header>
      {(project.video || project.image) && (
        <figure className="project-preview">
          {project.video ? (
            <video key={project.slug} controls preload="none" poster={project.image}>
              <source src={project.video} type="video/mp4" />
              {t('common.videoFallback')} <a href={project.video}>{t('common.downloadVideo')}</a>
            </video>
          ) : (
            <img src={project.image} alt={t('common.preview', { project: text.title })} />
          )}
          <figcaption>{t('common.preview', { project: text.title })}</figcaption>
        </figure>
      )}
      {text.sections.map((section, i) => (
        <section className="project-section" key={i} aria-labelledby={`project-section-${i}`}>
          <h2 id={`project-section-${i}`}>{section.title}</h2>
          <div className="prose">
            {section.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
            {section.features.length > 0 && (
              <dl className="feature-list">
                {section.features.map((f, j) => (
                  <div key={j}>
                    <dt>{f.title}</dt>
                    <dd>{f.description}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>
      ))}
      <section className="project-section">
        <h2>{t('common.projectSkills')}</h2>
        <div className="evidence-list">
          {text.evidence.map((e) => (
            <details key={e.id}>
              <summary>
                {content.skill(e.id).label}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{e.description}</p>
              <ul className="learning-list">
                {e.learnings.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>
      <nav className="next-project" aria-label={t('common.nextProject')}>
        <span>{t('common.nextProject')}</span>
        <Link to={`/projet/${next.slug}`}>
          {content.project(next.slug).title} <span aria-hidden="true">&gt;</span>
        </Link>
      </nav>
    </article>
  )
}
