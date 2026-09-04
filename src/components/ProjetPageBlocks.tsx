import { COMPETENCES } from '../data/competences'
import type { CompetenceId } from '../types'

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display font-bold text-2xl"
      style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
    >
      {children}
    </h2>
  )
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.97rem] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
      {children}
    </p>
  )
}

interface CompetenceBlockProps {
  id: CompetenceId
  justification: string
  apprentissages: string[]
}

export function CompetenceBlock({ id, justification, apprentissages }: CompetenceBlockProps) {
  const comp = COMPETENCES.find((c) => c.id === id)
  if (!comp) return null

  return (
    <div
      className="flex flex-col gap-4 p-6 rounded-2xl"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: `1px solid rgba(${comp.accentRgb}, 0.2)`,
      }}
    >
      <div className="flex items-start gap-3 flex-wrap">
        <span className="font-display font-bold text-lg" style={{ color: comp.color }}>
          {comp.label}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded font-mono mt-0.5"
          style={{
            backgroundColor: `rgba(${comp.accentRgb}, 0.1)`,
            color: comp.color,
            border: `1px solid rgba(${comp.accentRgb}, 0.25)`,
          }}
        >
          {comp.description}
        </span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {justification}
      </p>
      <div className="flex flex-col gap-1.5">
        <p className="text-[0.68rem] font-bold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
          Apprentissages critiques mobilisés
        </p>
        <ul className="flex flex-col gap-1">
          {apprentissages.map((ac) => (
            <li key={ac} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: comp.color }} />
              {ac}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  label: string
  desc: string
}

export function FeatureCard({ label, desc }: FeatureCardProps) {
  return (
    <div
      className="flex flex-col gap-1.5 p-4 rounded-xl"
      style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
    >
      <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{label}</span>
      <span className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</span>
    </div>
  )
}

export function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="px-2 py-0.5 rounded-md text-[0.78rem] font-mono font-medium"
      style={{
        backgroundColor: 'rgba(139,92,246,0.10)',
        border: '1px solid rgba(139,92,246,0.22)',
        color: '#a78bfa',
      }}
    >
      {children}
    </span>
  )
}