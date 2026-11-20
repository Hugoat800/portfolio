import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Line, OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import type { ConstellationGraph, StarKind, StarNode } from '../constellationData'
import {
  BLACK_HOLE_ID,
  BLACK_HOLE_POSITION,
  BlackHole,
  HiddenStar,
  suctionPose,
} from '../BlackHole'
import './ConstellationScene.css'

export const STAR_COLORS: Record<StarKind, string> = {
  project: '#c4b0ff',
  skill: '#f5cf86',
  techno: '#8fd6ff',
}
const STAR_SIZE: Record<StarKind, number> = { project: 0.34, skill: 0.24, techno: 0.13 }

/** One radial-gradient texture shared by every halo. */
function useGlowTexture() {
  return useMemo(() => {
    const size = 128
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.55)')
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.12)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [])
}

interface SceneProps {
  graph: ConstellationGraph
  labels: Record<string, string>
  /** Short tag drawn before a label, e.g. the skill number "C1". */
  badges: Record<string, string>
  focusId: string | null
  hoveredId: string | null
  selectedId: string | null
  /** Project the camera is flying into, before opening its page. */
  travelId: string | null
  /** Easter egg: the black hole has been found and is now visible. */
  blackHole: boolean
  onSecretFound: () => void
  /** Second easter egg: the black hole is swallowing the constellation. */
  suction: boolean
  reducedMotion: boolean
  onHover: (id: string | null) => void
  onSelect: (id: string | null) => void
}

function Star({
  node,
  label,
  badge,
  state,
  ready,
  hovered,
  glow,
  phase,
  reducedMotion,
  suctionStart,
  onHover,
  onSelect,
}: {
  node: StarNode
  label: string
  badge?: string
  state: 'normal' | 'active' | 'dim'
  /** Selected project: a second click opens it, so it pulses to invite it. */
  ready: boolean
  hovered: boolean
  glow: THREE.Texture
  phase: number
  reducedMotion: boolean
  /** Clock time when the black hole started eating, or null. Read every frame. */
  suctionStart: React.MutableRefObject<number | null>
  onHover: SceneProps['onHover']
  onSelect: SceneProps['onSelect']
}) {
  const halo = useRef<THREE.Sprite>(null)
  const core = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)
  const group = useRef<THREE.Group>(null)
  const labelBox = useRef<HTMLDivElement>(null)
  const base = useMemo(() => new THREE.Vector3(...node.position), [node])
  const size = STAR_SIZE[node.kind]
  const color = STAR_COLORS[node.kind]
  const target = state === 'active' ? 1.6 : state === 'dim' ? 0.55 : 1

  useFrame(({ clock }, delta) => {
    if (group.current) {
      const start = suctionStart.current
      const scale =
        start === null
          ? (group.current.position.copy(base), 1)
          : suctionPose(base, clock.elapsedTime - start, group.current.position)
      group.current.scale.setScalar(Math.max(scale, 0.0001))
      if (labelBox.current) labelBox.current.style.opacity = String(scale)
    }
    if (core.current && node.kind !== 'techno' && !reducedMotion)
      core.current.rotation.y += delta * (node.kind === 'skill' ? 0.8 : 0.3)
    if (!halo.current) return
    const twinkle = reducedMotion ? 1 : 1 + Math.sin(clock.elapsedTime * 1.7 + phase) * 0.12
    // A selected project "breathes", and its ring opens wider under the pointer.
    const pulse = ready && !reducedMotion ? 1 + Math.sin(clock.elapsedTime * 4) * 0.18 : 1
    if (ring.current) {
      const ringTarget = ready ? (hovered ? 1.6 : 1.2) : 1
      const k = THREE.MathUtils.damp(ring.current.scale.x, ringTarget, 8, delta)
      ring.current.scale.setScalar(k)
    }
    const next = THREE.MathUtils.damp(halo.current.userData.k ?? 1, target, 6, delta)
    halo.current.userData.k = next
    halo.current.scale.setScalar(size * 9 * next * twinkle * pulse)
    ;(halo.current.material as THREE.SpriteMaterial).opacity = state === 'dim' ? 0.25 : 0.9
  })

  const showLabel = node.kind !== 'techno' || state === 'active'
  return (
    <group ref={group} position={node.position}>
      <mesh ref={core} rotation={node.kind === 'project' ? [1.1, 0, 0.3] : [0, 0, 0]}>
        {node.kind === 'skill' ? (
          <octahedronGeometry args={[size * 1.3]} />
        ) : (
          <sphereGeometry args={[size, 24, 24]} />
        )}
        <meshBasicMaterial color={state === 'dim' ? '#4a4560' : color} />
        {/* Projects get a thin orbit ring so they read as "planets" among the stars. */}
        {node.kind === 'project' && (
          <mesh ref={ring}>
            <torusGeometry args={[size * 1.9, 0.018, 8, 64]} />
            <meshBasicMaterial color={color} transparent opacity={state === 'dim' ? 0.2 : 0.7} />
          </mesh>
        )}
      </mesh>
      <sprite ref={halo}>
        <spriteMaterial
          map={glow}
          color={color}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      {/* Invisible, larger hit area so small stars stay easy to point at. */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(node.id)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          onHover(null)
          document.body.style.cursor = ''
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(node.id)
        }}
      >
        <sphereGeometry args={[Math.max(size * 2.6, 0.5), 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {showLabel && (
        <Html
          ref={labelBox}
          center
          position={[0, -size - 0.45, 0]}
          zIndexRange={[10, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <span className={`star-label star-label--${node.kind} star-label--${state}`}>
            {badge && <b className="star-badge">{badge}</b>}
            {label}
          </span>
        </Html>
      )}
    </group>
  )
}

/** Eases the orbit target toward the selected star, or back to the centre. */
function CameraRig({
  controls,
  target,
  travel,
  approach,
  sideView,
}: {
  controls: React.RefObject<OrbitControlsImpl>
  target: THREE.Vector3
  travel: StarNode | undefined
  /** True while the black hole is selected: it is far away, so fly closer for a few seconds. */
  approach: boolean
  /** During the suction: watch from the side, so the hole and the constellation are both in view. */
  sideView: boolean
}) {
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera
  const approachStart = useRef<number | null>(null)
  const side = useRef<{ start: number; goal: THREE.Vector3 } | null>(null)
  useFrame(({ clock }, delta) => {
    if (sideView && !side.current) {
      // Goal: perpendicular to the centre -> black hole line, on the camera's current side.
      const axis = new THREE.Vector3(...BLACK_HOLE_POSITION).normalize()
      const middle = new THREE.Vector3(...BLACK_HOLE_POSITION).multiplyScalar(0.5)
      const away = camera.position.clone().sub(middle)
      away.sub(axis.clone().multiplyScalar(away.dot(axis)))
      if (away.lengthSq() < 1e-3) away.set(0, 1, 0).cross(axis)
      const goal = middle.add(away.setLength(46))
      side.current = { start: clock.elapsedTime, goal }
    }
    if (!sideView) side.current = null
    if (side.current && clock.elapsedTime - side.current.start < 4)
      camera.position.lerp(side.current.goal, 1 - Math.exp(-1.6 * delta))
    if (approach) approachStart.current ??= clock.elapsedTime
    else approachStart.current = null
    const approaching =
      approachStart.current !== null && clock.elapsedTime - approachStart.current < 4
    if (approaching && controls.current) {
      // Shorten the camera-to-target distance smoothly, down to 17 units.
      const offset = camera.position.clone().sub(controls.current.target)
      const length = THREE.MathUtils.damp(offset.length(), 17, 1.5, delta)
      camera.position.copy(controls.current.target).add(offset.setLength(length))
    }
    if (travel) {
      // Warp: dive straight into the planet while the field of view stretches.
      const goal = new THREE.Vector3(...travel.position)
      camera.position.lerp(goal, 1 - Math.exp(-3.2 * delta))
      camera.lookAt(goal)
      camera.fov = THREE.MathUtils.damp(camera.fov, 110, 2.5, delta)
      camera.updateProjectionMatrix()
      return
    }
    const c = controls.current
    if (!c) return
    c.target.x = THREE.MathUtils.damp(c.target.x, target.x, 3, delta)
    c.target.y = THREE.MathUtils.damp(c.target.y, target.y, 3, delta)
    c.target.z = THREE.MathUtils.damp(c.target.z, target.z, 3, delta)
    c.update()
  })
  return null
}

/** Starts and stops the suction clock, and hides the links while stars are moving. */
function SuctionClock({
  active,
  start,
  edges,
}: {
  active: boolean
  start: React.MutableRefObject<number | null>
  edges: React.RefObject<THREE.Group>
}) {
  useFrame(({ clock }) => {
    if (active) start.current ??= clock.elapsedTime
    else start.current = null
    if (edges.current) edges.current.visible = start.current === null
  })
  return null
}

function Constellation({
  graph,
  labels,
  badges,
  focusId,
  hoveredId,
  selectedId,
  travelId,
  blackHole,
  onSecretFound,
  suction,
  reducedMotion,
  onHover,
  onSelect,
}: SceneProps) {
  const glow = useGlowTexture()
  const controls = useRef<OrbitControlsImpl>(null)
  const suctionStart = useRef<number | null>(null)
  const edges = useRef<THREE.Group>(null)
  const focus = focusId ? graph.byId.get(focusId) : undefined
  const selected = selectedId ? graph.byId.get(selectedId) : undefined
  const target = useMemo(
    () =>
      new THREE.Vector3(
        ...(selected
          ? selected.position
          : selectedId === BLACK_HOLE_ID
            ? BLACK_HOLE_POSITION
            : suction
              ? // Halfway, so both the hole and the constellation stay in view.
                BLACK_HOLE_POSITION.map((v) => v / 2)
              : [0, 0, 0]),
      ),
    [selected, selectedId, suction],
  )

  // The more projects (and so links), the fainter each idle link, so the sky stays readable.
  const edgeFade = 1 / graph.spread ** 0.9

  const stateOf = (node: StarNode) => {
    if (!focus) return 'normal' as const
    return node.id === focus.id || focus.neighbours.has(node.id) ? 'active' : 'dim'
  }

  return (
    <>
      <color attach="background" args={['#07060f']} />
      <fog attach="fog" args={['#07060f', 26 * graph.spread, 80 * graph.spread]} />
      <Stars radius={70} depth={40} count={2500} factor={3} fade speed={reducedMotion ? 0 : 0.6} />

      <SuctionClock active={suction} start={suctionStart} edges={edges} />
      <group ref={edges}>
        {graph.edges.map((edge) => {
          const a = graph.byId.get(edge.from)!
          const b = graph.byId.get(edge.to)!
          const lit = focus && (edge.from === focus.id || edge.to === focus.id)
          return (
            <Line
              key={`${edge.from}-${edge.to}`}
              points={[a.position, b.position]}
              color={lit ? STAR_COLORS[focus.kind] : '#9d8fd0'}
              lineWidth={lit ? 1.8 : 1}
              transparent
              opacity={lit ? 0.9 : (focus ? 0.05 : edge.family ? 0.12 : 0.22) * edgeFade}
              depthWrite={false}
            />
          )
        })}
      </group>

      {graph.nodes.map((node, index) => (
        <Star
          key={node.id}
          node={node}
          label={labels[node.id] ?? node.key}
          badge={badges[node.id]}
          state={stateOf(node)}
          ready={node.kind === 'project' && node.id === selectedId && !travelId}
          hovered={node.id === hoveredId}
          glow={glow}
          phase={index * 1.37}
          reducedMotion={reducedMotion}
          suctionStart={suctionStart}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}

      {blackHole ? (
        <BlackHole reducedMotion={reducedMotion} suctionStart={suctionStart} onSelect={onSelect} />
      ) : (
        <HiddenStar glow={glow} onFound={onSecretFound} />
      )}

      <OrbitControls
        ref={controls}
        enabled={!travelId}
        enablePan={false}
        enableDamping
        minDistance={5}
        maxDistance={42 * graph.spread}
        autoRotate={!reducedMotion && !selectedId}
        autoRotateSpeed={0.07}
      />
      <CameraRig
        controls={controls}
        target={target}
        travel={travelId ? graph.byId.get(travelId) : undefined}
        approach={selectedId === BLACK_HOLE_ID}
        sideView={suction}
      />
    </>
  )
}

export default function ConstellationScene(props: SceneProps) {
  return (
    <Canvas
      // Portrait screens need the camera further back to fit the whole ring. A wider ring
      // (many projects) moves it back less than it grows, so the ring fills more of the
      // screen and the names spread out, and higher up so the far side is less squashed.
      camera={{
        position: [
          0,
          6 * props.graph.spread,
          (window.innerWidth < window.innerHeight ? 34 : 22) * props.graph.spread ** 0.75,
        ],
        fov: 55,
      }}
      dpr={[1, 2]}
      onPointerMissed={() => props.onSelect(null)}
    >
      <Constellation {...props} />
    </Canvas>
  )
}
