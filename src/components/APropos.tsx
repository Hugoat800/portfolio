import { useTranslation } from 'react-i18next'
import Section from './Section'
import TagList from './TagList'
export default function APropos() {
  const { t } = useTranslation()
  const paragraphs = t('about.paragraphs', { returnObjects: true }) as string[]
  const facts = t('about.facts', { returnObjects: true }) as { label: string; value: string }[]
  return (
    <Section id="a-propos">
      <div className="about-layout">
        <div className="prose">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h3>{t('about.interestsTitle')}</h3>
          <TagList items={t('about.interests', { returnObjects: true }) as string[]} />
        </div>
        <dl className="facts">
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
