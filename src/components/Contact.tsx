import { useTranslation } from 'react-i18next'
import { PROFILE } from '../data/profile'
import Section from './Section'
import ContactRow from './ContactRow'
export default function Contact() {
  const { t } = useTranslation()
  return (
    <Section id="contact">
      <div className="contact-layout">
        <p className="contact-intro">{t('contact.intro')}</p>
        <div>
          <ContactRow
            label={t('contact.email')}
            value={PROFILE.email}
            href={`mailto:${PROFILE.email}`}
          />
          <ContactRow
            label={t('contact.phone')}
            value={PROFILE.phone}
            href={`tel:${PROFILE.phone}`}
          />
          <nav className="social-links" aria-label={t('contact.socials')}>
            {PROFILE.socials.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                <img src={link.icon} alt="" aria-hidden="true" />
                {link.label}
              </a>
            ))}
            <a href={PROFILE.resume} target="_blank" rel="noreferrer">
              <img src={PROFILE.resumeIcon} alt="" aria-hidden="true" />
              {t('contact.resume')}
            </a>
          </nav>
        </div>
      </div>
    </Section>
  )
}
