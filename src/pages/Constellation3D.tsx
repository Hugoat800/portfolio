import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from '../data/projects'
import { SKILLS } from '../data/skills'
import { TECHNOS } from '../data/technos'
import { buildConstellation, type StarNode } from '../three/constellationData'
import ConstellationScene, { STAR_COLORS } from '../three/ConstellationScene'

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export default function Constellation3D() {
  const { t } = useTranslation()
  const graph = useMemo(buildConstellation, [])
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  // On phones the panel would hide most of the sky, so it starts closed.
  const [panelOpen, setPanelOpen] = useState(() => !window.matchMedia('(max-width: 640px)').matches)
  const select = (id: string | null) => {
    setSelected(id)
    if (id) setPanelOpen(true)
  }
  const closePanel = () => {
    setSelected(null)
    setPanelOpen(false)
  }
  const webgl = useMemo(hasWebGL, [])
  const reducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  const nameOf = (node: StarNode) => {
    if (node.kind === 'project') return t(`projects.${node.key}.title`)
    if (node.kind === 'skill') return t(`skills.${node.key}.label`)
    return node.key
  }
  /** B.U.T. skills are numbered C1 to C6 in the curriculum. */
  const badgeOf = (node: StarNode) =>
    node.kind === 'skill' ? `C${SKILLS.findIndex((s) => s.id === node.key) + 1}` : undefined
  const logoOf = (node: StarNode) => {
    if (node.kind !== 'techno') return undefined
    const key = node.key.toLowerCase().replace(/[^a-z0-9]/g, '')
    return TECHNOS.find((t) => t.name.toLowerCase().replace(/[^a-z0-9]/g, '') === key)?.logo
  }
  const imageOf = (node: StarNode) =>
    node.kind === 'project' ? PROJECTS.find((p) => p.slug === node.key)?.image : undefined
  const labels = Object.fromEntries(graph.nodes.map((n) => [n.id, nameOf(n)]))
  const badges = Object.fromEntries(
    graph.nodes.filter((n) => n.kind === 'skill').map((n) => [n.id, badgeOf(n)!]),
  )
  const neighboursOf = (node: StarNode, kind: StarNode['kind']) =>
    [...node.neighbours].map((id) => graph.byId.get(id)!).filter((n) => n.kind === kind)

  const current = selected ? graph.byId.get(selected) : undefined

  if (!webgl)
    return (
      <div className="space-fallback container">
        <p>{t('space.noWebgl')}</p>
        <Link to="/">{t('space.toClassic')}</Link>
      </div>
    )

  return (
    <div className="space-page">
      <h1 className="sr-only">{t('space.title')}</h1>
      <ConstellationScene
        graph={graph}
        labels={labels}
        badges={badges}
        focusId={hovered ?? selected}
        selectedId={selected}
        reducedMotion={reducedMotion}
        onHover={setHovered}
        onSelect={select}
      />

      {!panelOpen && (
        <button
          className="space-open"
          onClick={() => setPanelOpen(true)}
          aria-expanded={false}
          aria-controls="space-panel"
        >
          {t('space.open')}
        </button>
      )}
      <aside id="space-panel" className="space-panel" aria-live="polite" hidden={!panelOpen}>
        {current ? (
          <div className="space-card">
            {imageOf(current) && (
              <img className="space-cover" src={imageOf(current)} alt="" loading="lazy" />
            )}
            <button className="space-close" onClick={closePanel} aria-label={t('space.close')}>
              <CloseIcon />
            </button>
            <p className="space-kind" style={{ color: STAR_COLORS[current.kind] }}>
              {t(`space.legend.${current.kind}`)} {badgeOf(current)}
            </p>
            <h2 className="space-title">
              {logoOf(current) && <img src={logoOf(current)} alt="" aria-hidden="true" />}
              {nameOf(current)}
            </h2>
            {current.kind === 'project' && (
              <>
                <p>{t(`projects.${current.key}.description`)}</p>
                <Chips
                  title={t('space.technologies')}
                  nodes={neighboursOf(current, 'techno')}
                  nameOf={nameOf}
                  badgeOf={badgeOf}
                  logoOf={logoOf}
                  onSelect={select}
                />
                <Chips
                  title={t('space.skills')}
                  nodes={neighboursOf(current, 'skill')}
                  nameOf={nameOf}
                  badgeOf={badgeOf}
                  logoOf={logoOf}
                  onSelect={select}
                />
                <Link className="space-cta" to={`/projet/${current.key}`}>
                  {t('common.readProject')}
                </Link>
              </>
            )}
            {current.kind === 'skill' && <p>{t(`skills.${current.key}.description`)}</p>}
            {current.kind !== 'project' &&
              (neighboursOf(current, 'project').length ? (
                <Chips
                  title={t('space.linkedProjects')}
                  nodes={neighboursOf(current, 'project')}
                  nameOf={nameOf}
                  badgeOf={badgeOf}
                  logoOf={logoOf}
                  onSelect={select}
                />
              ) : (
                <p className="space-muted">{t('space.noProject')}</p>
              ))}
          </div>
        ) : (
          <div className="space-card">
            <button className="space-close" onClick={closePanel} aria-label={t('space.close')}>
              <CloseIcon />
            </button>
            <h2>{t('space.title')}</h2>
            <p>{t('space.intro')}</p>
            <p className="space-muted">{t('space.hint')}</p>
            <ul className="space-legend">
              {(['project', 'skill', 'techno'] as const).map((kind) => (
                <li key={kind}>
                  <span style={{ background: STAR_COLORS[kind] }} aria-hidden="true" />
                  {t(`space.legend.${kind}`)}
                </li>
              ))}
            </ul>
            <Chips
              title={t('space.projectsList')}
              nodes={PROJECTS.map((p) => graph.byId.get(`project:${p.slug}`)!)}
              nameOf={nameOf}
              badgeOf={badgeOf}
              logoOf={logoOf}
              onSelect={select}
            />
          </div>
        )}
      </aside>
    </div>
  )
}

function Chips({
  title,
  nodes,
  nameOf,
  badgeOf,
  logoOf,
  onSelect,
}: {
  title: string
  nodes: StarNode[]
  nameOf: (node: StarNode) => string
  badgeOf: (node: StarNode) => string | undefined
  logoOf: (node: StarNode) => string | undefined
  onSelect: (id: string) => void
}) {
  if (!nodes.length) return null
  return (
    <div className="space-chips">
      <h3>{title}</h3>
      <ul>
        {nodes.map((node) => (
          <li key={node.id}>
            <button
              onClick={() => onSelect(node.id)}
              style={{ borderColor: STAR_COLORS[node.kind] }}
            >
              {badgeOf(node) && <b className="star-badge">{badgeOf(node)}</b>}
              {logoOf(node) && <img src={logoOf(node)} alt="" aria-hidden="true" />}
              {nameOf(node)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Drawn as SVG so the cross is perfectly centred, whatever the font. */
function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M1 1l10 10M11 1L1 11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}
