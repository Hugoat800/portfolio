import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PROFILE } from '../../data/profile'
import './Hero.css'
export default function Hero() {
  const { t } = useTranslation()
  return (
    <section id="accueil" className="hero-stage" aria-labelledby="hero-title">
      <div className="hero container">
        <div className="hero-copy">
          <h1 id="hero-title">
            Hugo
            <br />
            <span>Vitry</span>
          </h1>
          <p className="hero-role">{t('hero.role')}</p>
          <p className="hero-location">{t('hero.location')}</p>
          <p className="hero-description">{t('hero.description')}</p>
          <div className="hero-actions">
            <Link to="/projets" className="btn-primary">
              {t('hero.projects')}
            </Link>
            <Link to="/contact" className="btn-outline">
              {t('hero.contact')}
            </Link>
            <Link to="/a-propos" className="btn-outline">
              {t('hero.scroll')}
            </Link>
          </div>
          <p className="hero-availability">{t('hero.availability')}</p>
        </div>
        <figure className="hero-portrait">
          <img src={PROFILE.portrait} alt={PROFILE.name} />
        </figure>
        <Link to="/a-propos" className="hero-scroll" aria-label={t('hero.scroll')}>
          <span aria-hidden="true">↓</span>
        </Link>
      </div>
    </section>
  )
}
