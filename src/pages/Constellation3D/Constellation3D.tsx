import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from '../../data/projects'
import { SKILLS } from '../../data/skills'
import { TECHNOS } from '../../data/technos'
import { buildConstellation, type StarNode } from '../../three/constellationData'
import ConstellationScene, { STAR_COLORS } from '../../three/ConstellationScene/ConstellationScene'
import {
  MUSIC_MAX_VOLUME,
  playBlackHoleSound,
  playStarSound,
  playTravelSound,
} from '../../three/sound'
import { useSpaceMusic } from '../../three/useSpaceMusic'
import { BLACK_HOLE_ID, SUCTION_DURATION } from '../../three/BlackHole'
import './Constellation3D.css'

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
  const music = useSpaceMusic()
  const navigate = useNavigate()
  const [travelId, setTravelId] = useState<string | null>(null)
  const [blackHole, setBlackHole] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number>()
  const showToast = (text: string) => {
    window.clearTimeout(toastTimer.current)
    setToast(text)
    toastTimer.current = window.setTimeout(() => setToast(null), 5000)
  }
  const [suction, setSuction] = useState(false)
  /** Second easter egg: clicking the selected black hole makes it eat everything. */
  const startSuction = () => {
    if (suction) return
    setSelected(null)
    setSuction(true)
    showToast(t('space.suction'))
    if (music.soundOnRef.current) playBlackHoleSound()
    window.setTimeout(() => setSuction(false), SUCTION_DURATION * 1000)
  }
  const findBlackHole = () => {
    if (blackHole) return
    setBlackHole(true)
    showToast(t('space.blackHole'))
    if (music.soundOnRef.current) playBlackHoleSound()
  }
  // Second way in: type the secret word anywhere on the page.
  useEffect(() => {
    const secret = 'trounoir'
    let typed = ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return
      typed = (typed + e.key.toLowerCase()).slice(-secret.length)
      if (typed === secret) findBlackHole()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })
  const travelTimer = useRef<number>()
  useEffect(() => () => window.clearTimeout(travelTimer.current), [])
  /** Fly into a project, then open its page once the warp has filled the screen. */
  const travel = (node: StarNode) => {
    if (travelId || node.kind !== 'project') return
    setTravelId(node.id)
    if (music.soundOnRef.current) playTravelSound()
    travelTimer.current = window.setTimeout(
      () => navigate(`/projet/${node.key}`),
      reducedMotion ? 0 : 1100,
    )
  }
  const select = (id: string | null) => {
    if (travelId) return
    const clicked = id ? graph.byId.get(id) : undefined
    // Second click on the selected project: go to its page.
    if (clicked && id === selected && clicked.kind === 'project') return travel(clicked)
    if (id === BLACK_HOLE_ID && selected === BLACK_HOLE_ID) return startSuction()
    setSelected(id)
    if (!id) return
    setPanelOpen(true)
    const node = graph.byId.get(id)
    if (!music.soundOnRef.current) return
    if (node) playStarSound(node.kind)
    else if (id === BLACK_HOLE_ID) playBlackHoleSound()
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
      <div className="space-audio">
        {music.soundOn && (
          <input
            className="space-volume"
            type="range"
            min={0}
            max={MUSIC_MAX_VOLUME}
            step={0.005}
            value={music.volume}
            onChange={(e) => music.setVolume(Number(e.target.value))}
            aria-label={t('space.volume')}
            title={t('space.volume')}
            style={
              { '--fill': `${(music.volume / MUSIC_MAX_VOLUME) * 100}%` } as React.CSSProperties
            }
          />
        )}
        {music.hasPlaylist && music.soundOn && (
          <button
            className="space-sound"
            onClick={music.skip}
            aria-label={t('space.nextTrack')}
            title={t('space.nowPlaying', { title: music.title })}
          >
            <NextIcon />
          </button>
        )}
        <button
          className="space-sound"
          onClick={music.toggle}
          aria-pressed={music.soundOn}
          aria-label={t(music.soundOn ? 'space.soundOff' : 'space.soundOn')}
          title={t(music.soundOn ? 'space.soundOff' : 'space.soundOn')}
        >
          <SoundIcon on={music.soundOn} />
        </button>
      </div>
      <h1 className="sr-only">{t('space.title')}</h1>
      {travelId && <div className="space-warp" aria-hidden="true" />}
      {toast && (
        <p key={toast} className="space-toast" role="status">
          {toast}
        </p>
      )}
      <ConstellationScene
        graph={graph}
        labels={labels}
        badges={badges}
        focusId={hovered ?? selected}
        hoveredId={hovered}
        selectedId={selected}
        travelId={travelId}
        blackHole={blackHole}
        onSecretFound={findBlackHole}
        suction={suction}
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
      <aside
        id="space-panel"
        className="space-panel"
        aria-live="polite"
        hidden={!panelOpen || !!travelId || suction}
      >
        {selected === BLACK_HOLE_ID ? (
          <div className="space-card">
            <button className="space-close" onClick={closePanel} aria-label={t('space.close')}>
              <CloseIcon />
            </button>
            <p className="space-kind" style={{ color: '#ffb36b' }}>
              {t('space.blackHoleCard.kind')}
            </p>
            <h2>{t('space.blackHoleCard.title')}</h2>
            <p>{t('space.blackHoleCard.text')}</p>
          </div>
        ) : current ? (
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
                <Link
                  className="space-cta"
                  to={`/projet/${current.key}`}
                  onClick={(e) => {
                    e.preventDefault()
                    travel(current)
                  }}
                >
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
            <p className="space-credits">{t('space.credits')}</p>
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

function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
      {on ? (
        <path
          d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M16 9l5 6M21 9l-5 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

function NextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5l10 7-10 7z" fill="currentColor" />
      <rect x="16.5" y="5" width="2.5" height="14" rx="1" fill="currentColor" />
    </svg>
  )
}
