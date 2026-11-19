import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard } from '@react-three/drei'
import * as THREE from 'three'
import type { Vec3 } from './constellationData'

/** Where the easter egg hides, far beyond the constellation. */
export const BLACK_HOLE_POSITION: Vec3 = [-20, 9, -26]

const HORIZON = 1.6
const DISK_INNER = 1.9
const DISK_OUTER = 5.2

const passVertex = /* glsl */ `
  varying vec2 vPos;
  void main() {
    vPos = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

/** Accretion disk: hot white near the hole, orange then violet outside, swirling streaks. */
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
    float streaks = 0.55 + 0.45 * sin(swirl * 2.0) * sin(swirl * 0.7 + 1.3);
    // One side brighter than the other, like the real Doppler beaming.
    float doppler = 0.65 + 0.45 * cos(a - 0.6);
    vec3 col = mix(vec3(1.0, 0.96, 0.88), vec3(1.0, 0.62, 0.3), smoothstep(0.0, 0.35, t));
    col = mix(col, vec3(0.45, 0.31, 0.75), smoothstep(0.35, 0.9, t));
    float intensity = pow(1.0 - t, 1.4) * streaks * doppler * 2.4;
    float edges = smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.55, 1.0, t));
    gl_FragColor = vec4(col * intensity, edges * uOpacity);
  }
`

/** Always faces the camera: thin photon ring hugging the horizon, plus a soft glow. */
const haloFragment = /* glsl */ `
  uniform float uOpacity;
  varying vec2 vPos;
  void main() {
    float d = length(vPos) - ${HORIZON.toFixed(2)};
    if (d < 0.0) discard;
    // Soft light bending around the hole, no hard outline, so it does not read as a ball.
    float inner = exp(-d * 4.0) * 0.45;
    float glow = exp(-d * 1.1) * 0.28;
    vec3 col = mix(vec3(0.62, 0.48, 1.0), vec3(1.0, 0.85, 0.7), inner * 2.0);
    gl_FragColor = vec4(col * (inner + glow), uOpacity);
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

export function BlackHole({
  reducedMotion,
  onSelect,
}: {
  reducedMotion: boolean
  onSelect: (id: string) => void
}) {
  const group = useRef<THREE.Group>(null)
  const disk = useAdditiveShader(diskFragment)
  const halo = useAdditiveShader(haloFragment)
  const born = useRef<number | null>(null)

  useFrame(({ clock }) => {
    born.current ??= clock.elapsedTime
    const age = clock.elapsedTime - born.current
    const grow = reducedMotion ? 1 : Math.min(age / 2.4, 1)
    group.current?.scale.setScalar(Math.max(easeOutBack(grow), 0.001) * 1.4)
    const opacity = Math.min(age / 1.2, 1)
    disk.uniforms.uTime.value = reducedMotion ? 0 : clock.elapsedTime
    disk.uniforms.uOpacity.value = opacity
    halo.uniforms.uOpacity.value = opacity
  })

  return (
    <group ref={group} position={BLACK_HOLE_POSITION}>
      <mesh>
        <sphereGeometry args={[HORIZON, 48, 48]} />
        <meshBasicMaterial color="#000000" fog={false} />
      </mesh>
      <mesh rotation={[-1.05, 0.15, 0]} material={disk}>
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
          <ringGeometry args={[HORIZON - 0.05, HORIZON + 3, 128, 1]} />
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
