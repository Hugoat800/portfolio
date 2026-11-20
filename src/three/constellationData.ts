import { PROJECTS } from '../data/projects'
import { SKILLS } from '../data/skills'
import { TECHNOS } from '../data/technos'
import type { CompetenceId } from '../types'

export type StarKind = 'project' | 'skill' | 'techno'
export type Vec3 = [number, number, number]

export interface StarNode {
  id: string
  kind: StarKind
  /** Project slug, skill id or techno display name. */
  key: string
  position: Vec3
  /** Ids of every node this star is connected to. */
  neighbours: Set<string>
}

export interface StarEdge {
  from: string
  to: string
  /** Faint links that only draw a techno family together. */
  family: boolean
}

export interface ConstellationGraph {
  nodes: StarNode[]
  edges: StarEdge[]
  byId: Map<string, StarNode>
  /** How much bigger than the default layout the ring is (1 up to 7 projects). */
  spread: number
}

/** Ring radius used up to 7 projects. */
const BASE_RADIUS = 6.5
/** Distance kept between two neighbouring projects on the ring. */
const PROJECT_SPACING = (2 * Math.PI * BASE_RADIUS) / 7

/** "Tailwind CSS" and "TailwindCSS" must land on the same star. */
const normalize = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '')

/** Small deterministic PRNG so the sky looks the same on every visit. */
function seeded(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
const scale = (a: Vec3, k: number): Vec3 => [a[0] * k, a[1] * k, a[2] * k]
const length = (a: Vec3) => Math.hypot(a[0], a[1], a[2]) || 1

function randomUnit(random: () => number): Vec3 {
  const theta = random() * Math.PI * 2
  const z = random() * 2 - 1
  const r = Math.sqrt(1 - z * z)
  return [r * Math.cos(theta), z, r * Math.sin(theta)]
}

function centroid(points: Vec3[]): Vec3 {
  return scale(
    points.reduce((sum, p) => add(sum, p), [0, 0, 0] as Vec3),
    1 / points.length,
  )
}

/** Evenly spread directions on a sphere (golden-angle spiral). */
function fibonacciDirection(index: number, count: number): Vec3 {
  const y = 1 - ((index + 0.5) / count) * 2
  const r = Math.sqrt(1 - y * y)
  const theta = index * Math.PI * (3 - Math.sqrt(5))
  return [r * Math.cos(theta), y * 0.7, r * Math.sin(theta)]
}

export function buildConstellation(): ConstellationGraph {
  const random = seeded(2026)
  const nodes: StarNode[] = []
  const edges: StarEdge[] = []
  const byId = new Map<string, StarNode>()

  const addNode = (kind: StarKind, key: string, position: Vec3) => {
    const id = kind === 'techno' ? `techno:${normalize(key)}` : `${kind}:${key}`
    const node: StarNode = { id, kind, key, position, neighbours: new Set() }
    nodes.push(node)
    byId.set(id, node)
    return node
  }
  const link = (from: StarNode, to: StarNode, family = false) => {
    from.neighbours.add(to.id)
    to.neighbours.add(from.id)
    edges.push({ from: from.id, to: to.id, family })
  }

  // 1. Projects: the brightest stars, on a tilted ring that widens as projects are added.
  // When there are many, they also alternate between an inner and an outer lane, with a bit
  // of disorder, so the ring looks less like a perfect circle and neighbours' names overlap less.
  const radius = Math.max(BASE_RADIUS, (PROJECTS.length * PROJECT_SPACING) / (2 * Math.PI))
  const spread = radius / BASE_RADIUS
  const scatter = Math.min(0.22, 0.22 * (spread - 1))
  PROJECTS.forEach((project, index) => {
    const step = (Math.PI * 2) / PROJECTS.length
    // No extra random draws without scatter, so a small portfolio keeps its exact layout.
    const jitterAngle = scatter ? random() - 0.5 : 0
    const jitterLane = scatter ? random() - 0.5 : 0
    const angle = index * step + jitterAngle * step * scatter * 2
    const lane = radius * (1 + (index % 2 ? 1 : -1) * scatter + jitterLane * scatter * 0.6)
    addNode('project', project.slug, [
      Math.cos(angle) * lane,
      Math.sin(angle * 2) * 1.6 + (random() - 0.5) * (1 + scatter * 10),
      Math.sin(angle) * lane,
    ])
  })
  const projectNode = (slug: string) => byId.get(`project:${slug}`)!

  // 2. Skills: an inner ring, C1 to C6 in order, linked to the projects that use them.
  SKILLS.forEach(({ id }, index) => {
    const angle = (index / SKILLS.length) * Math.PI * 2 + Math.PI / SKILLS.length
    const node = addNode('skill', id, [
      Math.cos(angle) * 3.2 * spread,
      index % 2 ? 0.9 : -0.9,
      Math.sin(angle) * 3.2 * spread,
    ])
    PROJECTS.filter((p) => p.skills.includes(id as CompetenceId)).forEach((p) =>
      link(projectNode(p.slug), node),
    )
  })

  // 3. Technologies used by projects: orbit just outside their projects.
  const technoNames = new Map<string, string>()
  TECHNOS.forEach((t) => technoNames.set(normalize(t.name), t.name))
  PROJECTS.forEach((p) =>
    p.technologies.forEach((name) => {
      if (!technoNames.has(normalize(name))) technoNames.set(normalize(name), name)
    }),
  )
  const unlinked: string[] = []
  technoNames.forEach((name, key) => {
    const linked = PROJECTS.filter((p) => p.technologies.some((t) => normalize(t) === key))
    if (!linked.length) {
      unlinked.push(name)
      return
    }
    const centre = centroid(linked.map((p) => projectNode(p.slug).position))
    const outward = scale(centre, (length(centre) + 2.6) / length(centre))
    const node = addNode('techno', name, add(outward, scale(randomUnit(random), 2)))
    linked.forEach((p) => link(projectNode(p.slug), node))
  })

  // 4. Other technologies: small families on the outer sky, grouped by category.
  const families = new Map<string, string[]>()
  unlinked.forEach((name) => {
    const category = TECHNOS.find((t) => t.name === name)?.categories[0] ?? 'Autres'
    families.set(category, [...(families.get(category) ?? []), name])
  })
  const familyList = [...families.values()]
  familyList.forEach((members, familyIndex) => {
    const direction = fibonacciDirection(familyIndex, familyList.length)
    const anchor = scale(direction, radius + 7.5)
    let previous: StarNode | null = null
    members.forEach((name) => {
      const node = addNode('techno', name, add(anchor, scale(randomUnit(random), 2.4)))
      if (previous) link(previous, node, true)
      previous = node
    })
  })

  return { nodes, edges, byId, spread }
}
