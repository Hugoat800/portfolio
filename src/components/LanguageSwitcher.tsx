import { useTranslation } from 'react-i18next'
export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  return (
    <div className="language-switcher" role="group" aria-label={t('common.language')}>
      {['fr', 'en'].map((language) => (
        <button
          key={language}
          lang={language}
          aria-label={language === 'fr' ? 'Français' : 'English'}
          aria-pressed={i18n.resolvedLanguage === language}
          onClick={() => void i18n.changeLanguage(language)}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
