import type { Theme } from '../hooks/useTheme'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
      style={{
        position: 'relative',
        width: '3.25rem',
        height: '1.75rem',
        borderRadius: '9999px',
        border: '1px solid',
        borderColor: isDark ? 'rgba(139, 92, 246, 0.4)' : '#c4b5fd',
        backgroundColor: isDark ? 'rgba(139, 92, 246, 0.2)' : '#ede9fe',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'all 300ms ease',
        padding: 0,
      }}
    >
      {/* Icônes soleil / lune */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 0.4rem',
          pointerEvents: 'none',
          userSelect: 'none',
          fontSize: '0.65rem',
        }}
      >
        <span style={{ opacity: isDark ? 0.3 : 1, transition: 'opacity 200ms' }}>&#9728;</span>
        <span style={{ opacity: isDark ? 1 : 0.3, transition: 'opacity 200ms' }}>&#9790;</span>
      </span>

      {/* Thumb */}
      <span
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: isDark ? 'calc(100% - 1.5rem - 2px)' : '2px',
          width: '1.375rem',
          height: '1.375rem',
          borderRadius: '9999px',
          backgroundColor: isDark ? '#a78bfa' : '#ffffff',
          boxShadow: isDark ? '0 0 8px rgba(139, 92, 246, 0.6)' : '0 1px 3px rgba(0,0,0,0.2)',
          transition: 'left 300ms ease, background-color 300ms ease',
          zIndex: 1,
        }}
      />
    </button>
  )
}