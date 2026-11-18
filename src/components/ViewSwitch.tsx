import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/** Header link between the classic site and the 3D constellation. */
export default function ViewSwitch() {
  const { t } = useTranslation()
  const is3D = useLocation().pathname === '/3d'
  const label = t(is3D ? 'space.toClassic' : 'space.to3d')
  return (
    <Link to={is3D ? '/' : '/3d'} className="view-switch" aria-label={label} title={label}>
      <span aria-hidden="true" data-active={!is3D}>
        2D
      </span>
      <span aria-hidden="true" data-active={is3D}>
        3D
      </span>
    </Link>
  )
}
