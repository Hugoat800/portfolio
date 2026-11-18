import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/** Header button between the classic site and the 3D constellation. */
export default function ViewSwitch() {
  const { t } = useTranslation()
  const is3D = useLocation().pathname === '/3d'
  return (
    <Link
      to={is3D ? '/' : '/3d'}
      className={`view-switch ${is3D ? 'view-switch--back' : ''}`}
      title={t(is3D ? 'space.toClassic' : 'space.to3d')}
    >
      {t(is3D ? 'space.classicButton' : 'space.button')}
    </Link>
  )
}
