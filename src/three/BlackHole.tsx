import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard } from '@react-three/drei'
import * as THREE from 'three'
import type { Vec3 } from './constellationData'

/** Where the easter egg hides, far beyond the constellation. */
export const BLACK_HOLE_POSITION: Vec3 = [-20, 9, -26]

const HORIZON = 1.6
/** Tilt of the accretion disk; stars fall into this same plane. */
const DISK_ROTATION = new THREE.Euler(-1.05, 0.15, 0)
const DISK_INNER = 1.9
const DISK_OUTER = 5.2

const passVertex = /* glsl */ `
  varying vec2 vPos;
  void main() {
    vPos = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

/**
 * Accretion disk. Close to the hole the gas is white-hot, then orange, then violet.
 * The side turning toward the camera is much brighter and bluer (relativistic
 * Doppler beaming), the other side dimmer and redder. The inner edge glows hardest.
 */
const diskFragment = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vPos;
  void main() {
    float r = length(vPos);
    float t = clamp((r - ${DISK_INNER.toFixed(2)}) / ${(DISK_OUTER - DISK_INNER).toFixed(2)}, 0.0, 1.0);
    float a = atan(vPos.y, vPos.x);
    // Logarithmic spiral that turns over time: the matter falling in.
    float swirl = a * 3.0 + log(r) * 6.0 - uTime * 1.2;
    float streaks = 0.6 + 0.4 * sin(swirl * 2.0) * sin(swirl * 0.7 + 1.3);
    float fine = 0.85 + 0.15 * sin(swirl * 9.0);
    float doppler = cos(a - 0.6);
    float beaming = pow(1.0 + 0.55 * doppler, 3.0) * 0.55;
    vec3 col = mix(vec3(1.0, 0.97, 0.92), vec3(1.0, 0.6, 0.25), smoothstep(0.0, 0.4, t));
    col = mix(col, vec3(0.5, 0.32, 0.8), smoothstep(0.4, 0.95, t));
    col = mix(col, vec3(0.82, 0.9, 1.0), clamp(doppler, 0.0, 1.0) * 0.3 * (1.0 - t));
    col *= mix(vec3(1.0, 0.72, 0.55), vec3(1.0), doppler * 0.5 + 0.5);
    float innerEdge = exp(-t * 12.0) * 2.2;
    float intensity = (pow(1.0 - t, 1.6) * 2.4 + innerEdge) * streaks * fine * beaming;
    float edges = smoothstep(0.0, 0.03, t) * (1.0 - smoothstep(0.6, 1.0, t));
    gl_FragColor = vec4(col * intensity, edges * uOpacity);
  }
`

/**
 * Always faces the camera. Gravity bends the light of the far side of the disk
 * over and under the hole: two bright arcs, strongest above and below, fading on
 * the sides so it never reads as a plain outline. Plus a wide, soft glow.
 */
const haloFragment = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vPos;
  void main() {
    float d = length(vPos) - ${HORIZON.toFixed(2)};
    if (d < 0.0) discard;
    float a = atan(vPos.y, vPos.x);
    float vertical = pow(abs(sin(a)), 2.5);
    float shimmer = 0.9 + 0.1 * sin(a * 7.0 + uTime * 1.5);
    float arc = exp(-pow((d - 0.22) / 0.2, 2.0)) * (0.12 + 1.1 * vertical) * shimmer;
    float hug = exp(-d * 6.0) * 0.35;
    float glow = exp(-d * 0.75) * 0.42;
    vec3 warm = vec3(1.0, 0.86, 0.66);
    vec3 col = mix(vec3(0.62, 0.46, 1.0), warm, clamp(arc * 1.5 + hug, 0.0, 1.0));
    gl_FragColor = vec4(col * (arc * 1.6 + hug + glow), uOpacity);
  }
`

function useAdditiveShader(fragmentShader: string) {
  return useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 } },
        vertexShader: passVertex,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      }),
    [fragmentShader],
  )
}

/** Overshoots a little before settling, so the hole "pops" into existence. */
const easeOutBack = (x: number) => 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2)

export const BLACK_HOLE_ID = 'blackhole'

/** How much bigger the hole gets once it has swallowed the whole constellation. */
const FED_GROWTH = 0.3

export function BlackHole({
  reducedMotion,
  suctionStart,
  onSelect,
}: {
  reducedMotion: boolean
  /** Clock time when the suction started, or null: the hole grows as it eats. */
  suctionStart: React.MutableRefObject<number | null>
  onSelect: (id: string) => void
}) {
  const group = useRef<THREE.Group>(null)
  const disk = useAdditiveShader(diskFragment)
  const halo = useAdditiveShader(haloFragment)
  const born = useRef<number | null>(null)
  const fed = useRef(0)

  useFrame(({ clock }, delta) => {
    born.current ??= clock.elapsedTime
    const age = clock.elapsedTime - born.current
    const grow = reducedMotion ? 1 : Math.min(age / 2.4, 1)
    const start = suctionStart.current
    const target = start === null ? 0 : suctionFeed(clock.elapsedTime - start)
    fed.current = THREE.MathUtils.damp(fed.current, target, 4, delta)
    const size = Math.max(easeOutBack(grow), 0.001) * 1.4 * (1 + FED_GROWTH * fed.current)
    group.current?.scale.setScalar(size)
    const opacity = Math.min(age / 1.2, 1)
    disk.uniforms.uTime.value = reducedMotion ? 0 : clock.elapsedTime
    disk.uniforms.uOpacity.value = opacity
    halo.uniforms.uOpacity.value = opacity
    halo.uniforms.uTime.value = disk.uniforms.uTime.value
  })

  return (
    <group ref={group} position={BLACK_HOLE_POSITION}>
      <mesh>
        <sphereGeometry args={[HORIZON, 48, 48]} />
        <meshBasicMaterial color="#000000" fog={false} />
      </mesh>
      <mesh rotation={DISK_ROTATION} material={disk}>
        <ringGeometry args={[DISK_INNER, DISK_OUTER, 160, 1]} />
      </mesh>
      {/* Invisible hit area: the black hole can be selected like any star. */}
      <mesh
        onClick={(e) => {
          e.stopPropagation()
          onSelect(BLACK_HOLE_ID)
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = '')}
      >
        <sphereGeometry args={[DISK_OUTER * 0.7, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} fog={false} />
      </mesh>
      <Billboard>
        <mesh material={halo}>
          <ringGeometry args={[HORIZON - 0.05, HORIZON + 6, 160, 1]} />
        </mesh>
      </Billboard>
    </group>
  )
}

/** A faint, flickering speck where the black hole sleeps. Click it to wake it up. */
export function HiddenStar({ glow, onFound }: { glow: THREE.Texture; onFound: () => void }) {
  const sprite = useRef<THREE.Sprite>(null)
  useFrame(({ clock }) => {
    if (!sprite.current) return
    const flicker =
      0.35 + 0.25 * Math.sin(clock.elapsedTime * 2.3) * Math.sin(clock.elapsedTime * 0.9)
    ;(sprite.current.material as THREE.SpriteMaterial).opacity = flicker
  })
  return (
    <group position={BLACK_HOLE_POSITION}>
      <sprite ref={sprite} scale={0.9}>
        <spriteMaterial
          map={glow}
          color="#ffd9b0"
          transparent
          depthWrite={false}
          fog={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      <mesh
        onClick={(e) => {
          e.stopPropagation()
          onFound()
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = '')}
      >
        <sphereGeometry args={[1.2, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} fog={false} />
      </mesh>
    </group>
  )
}

/* ---------- Second easter egg: the black hole swallows the constellation ---------- */

const BLACK_HOLE_VECTOR = new THREE.Vector3(...BLACK_HOLE_POSITION)
/** Axis of the disk. Turning around it with a positive angle follows the disk's swirl. */
const DISK_AXIS = new THREE.Vector3(0, 0, 1).applyEuler(DISK_ROTATION)
const PULL_TIME = 22
const MAX_DELAY = 5
/** Number of turns each star makes around the hole before falling in. */
const TURNS = 9
const EMPTY_UNTIL = MAX_DELAY + PULL_TIME + 2
const RETURN_TIME = 3
/** Whole sequence, in seconds: pull, a short empty sky, then everything comes back. */
export const SUCTION_DURATION = EMPTY_UNTIL + RETURN_TIME

const pullAt = (local: number) => Math.pow(local, 3.2)
/** Never let the orbit radius reach 0 in the speed formula (it would spin infinitely fast). */
const MIN_RADIUS = 0.12

/**
 * Kepler: angular speed grows like radius^-1.5, so a star turns slowly on its
 * wide orbit and faster and faster as it gets closer. Integrating that speed
 * gives the angle; it only depends on progress, so it is computed once here.
 */
const ANGLE_TABLE = (() => {
  const steps = 400
  const table = new Float32Array(steps + 1)
  for (let i = 1; i <= steps; i++) {
    const radius = Math.max(1 - pullAt((i - 0.5) / steps), MIN_RADIUS)
    table[i] = table[i - 1] + Math.pow(radius, -1.5) / steps
  }
  const total = table[steps]
  return table.map((v) => (v / total) * Math.PI * 2 * TURNS)
})()

function orbitAngle(local: number) {
  const x = local * (ANGLE_TABLE.length - 1)
  const i = Math.min(Math.floor(x), ANGLE_TABLE.length - 2)
  return THREE.MathUtils.lerp(ANGLE_TABLE[i], ANGLE_TABLE[i + 1], x - i)
}

const offset = new THREE.Vector3()
const height = new THREE.Vector3()

/**
 * Where a star sits `t` seconds after the black hole started eating.
 * Writes into `out` and returns the star's scale (0 = swallowed).
 * Closer stars go first. Each one orbits around the disk's axis, in the disk's
 * direction, settling into the disk plane while the orbit tightens (Kepler speed).
 * The fall itself only really happens at the end.
 */
export function suctionPose(base: THREE.Vector3, t: number, out: THREE.Vector3) {
  if (t >= SUCTION_DURATION) {
    out.copy(base)
    return 1
  }
  if (t >= EMPTY_UNTIL) {
    // Spat back out: from the hole to the original place, easing out.
    const r = 1 - Math.pow(1 - (t - EMPTY_UNTIL) / RETURN_TIME, 3)
    out.copy(BLACK_HOLE_VECTOR).lerp(base, r)
    return r
  }
  const distance = base.distanceTo(BLACK_HOLE_VECTOR)
  const delay = THREE.MathUtils.clamp((distance - 22) / 24, 0, 1) * MAX_DELAY
  const local = THREE.MathUtils.clamp((t - delay) / PULL_TIME, 0, 1)
  const pull = pullAt(local)
  // Split the star's offset into a part along the disk axis (height) and a part in the disk plane.
  offset.copy(base).sub(BLACK_HOLE_VECTOR)
  height.copy(DISK_AXIS).multiplyScalar(offset.dot(DISK_AXIS))
  offset.sub(height)
  // The height melts away faster than the radius: the star flattens into the disk.
  height.multiplyScalar(Math.pow(1 - local, 1.6))
  offset
    .applyAxisAngle(DISK_AXIS, orbitAngle(local))
    .multiplyScalar(1 - pull)
    .add(height)
  out.copy(BLACK_HOLE_VECTOR).add(offset)
  return 1 - THREE.MathUtils.smoothstep(pull, 0.8, 1)
}

/**
 * How much of the constellation the hole has eaten, from 0 to 1, `t` seconds
 * after the suction started. Stars mostly fall in at the end of their orbit,
 * so it rises slowly first; it drops back to 0 while they are spat out.
 */
export function suctionFeed(t: number) {
  if (t <= 0 || t >= SUCTION_DURATION) return 0
  if (t >= EMPTY_UNTIL) return Math.pow(1 - (t - EMPTY_UNTIL) / RETURN_TIME, 3)
  return Math.pow(Math.min(t / (MAX_DELAY + PULL_TIME), 1), 3)
}
