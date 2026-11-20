import { useTranslation } from 'react-i18next'
import { PROFILE } from '../../data/profile'
import { Link } from 'react-router-dom'
import './Footer.css'
export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="site-footer container">
      <span>
        © {new Date().getFullYear()} {PROFILE.name}
      </span>
      <Link to="/accueil">{t('common.backTop')} </Link>
    </footer>
  )
}
