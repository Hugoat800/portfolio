import { useTranslation } from 'react-i18next'
import { PROFILE } from '../data/profile'
export default function Hero() {
  const { t } = useTranslation()
  return (
    <section id="accueil" className="hero-stage" aria-labelledby="hero-title">
      <div className="hero container">
        <div className="hero-copy">
          <p className="hero-location">{t('hero.location')}</p>
          <h1 id="hero-title">
            Hugo
            <br />
            <span>Vitry.</span>
          </h1>
          <p className="hero-role">{t('hero.role')}</p>
          <p className="hero-description">{t('hero.description')}</p>
          <div className="hero-actions">
            <a href="#projets" className="btn-primary">
              {t('hero.projects')}
            </a>
            <a href="#contact" className="btn-outline">
              {t('hero.contact')}
            </a>
            <a href="#a-propos" className="btn-outline">
              {t('hero.scroll')}
            </a>
          </div>
          <p className="hero-availability">{t('hero.availability')}</p>
        </div>
        <figure className="hero-portrait">
          <img src={PROFILE.portrait} alt={PROFILE.name} />
          <figcaption>
            {t('hero.caption')} <span>Hugoat</span>
          </figcaption>
        </figure>
        <a href="#a-propos" className="hero-scroll" aria-label={t('hero.scroll')}>
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}
