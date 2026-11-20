import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import './Section.css'
export default function Section({ id, children }: { id: string; children: ReactNode }) {
  const { t } = useTranslation()
  return (
    <section id={id} className="portfolio-section" aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className="section-heading">
          <p className="section-label">{t(`sections.${id}.eyebrow`)}</p>
          <h2 id={`${id}-title`} className="section-title">
            {t(`sections.${id}.title`)}
          </h2>
        </header>
        {children}
      </div>
    </section>
  )
}
