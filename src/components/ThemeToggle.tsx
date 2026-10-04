import { useTranslation } from 'react-i18next'
import type { Theme } from '../hooks/useTheme'
export default function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const { t } = useTranslation()
  const isDark = theme === 'dark'
  return (
    <button
      className="theme-toggle"
      data-theme={theme}
      onClick={onToggle}
      aria-label={t(theme === 'dark' ? 'common.lightTheme' : 'common.darkTheme')}
      title={t(theme === 'dark' ? 'common.lightTheme' : 'common.darkTheme')}
    >
      <span className="theme-toggle-icons" aria-hidden="true">
        <span style={{ opacity: isDark ? 0.3 : 1 }}>☀</span>
        <span style={{ opacity: isDark ? 1 : 0.3 }}>☾</span>
      </span>
      <span className="theme-toggle-thumb" aria-hidden="true" />
    </button>
  )
}
