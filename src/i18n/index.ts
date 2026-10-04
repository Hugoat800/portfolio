import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fr from './locales/fr.json'
import en from './locales/en.json'

let saved: string | null = null
try {
  saved = localStorage.getItem('portfolio-language')
} catch {
  /* Storage may be disabled. */
}
const language =
  saved === 'fr' || saved === 'en' ? saved : navigator.language.startsWith('fr') ? 'fr' : 'en'
void i18n.use(initReactI18next).init({
  resources: { fr: { translation: fr }, en: { translation: en } },
  lng: language,
  fallbackLng: 'fr',
  supportedLngs: ['fr', 'en'],
  interpolation: { escapeValue: false },
})
function applyLanguage(language: string) {
  document.documentElement.lang = language
  document.title = i18n.t('meta.title')
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', i18n.t('meta.description'))
  try {
    localStorage.setItem('portfolio-language', language)
  } catch {
    /* Continue without persistence. */
  }
}
applyLanguage(language)
i18n.on('languageChanged', applyLanguage)
export default i18n
