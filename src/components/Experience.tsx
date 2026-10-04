import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Section from './Section'
export default function Experience() {
  const { t } = useTranslation()
  const entries = t('experience.entries', { returnObjects: true }) as {
    date: string
    title: string
    organization: string
    description: string
    project?: string
  }[]
  return (
    <Section id="experience">
      <ol className="experience-list">
        {entries.map((entry) => (
          <li key={entry.title}>
            <p className="experience-date">{entry.date}</p>
            <div>
              <p className="experience-organization">{entry.organization}</p>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
              {entry.project && (
                <Link className="btn-outline" to={`/projet/${entry.project}`}>
                  {t('common.readProject')}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
