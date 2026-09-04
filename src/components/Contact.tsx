import { useState } from 'react'

const EMAIL = 'hugo.vitry@etu.univ-lyon1.fr'
const TEL = '+262693614191'




interface LienSocial {
  label: string
  href: string
  icon: string
}

const LIENS_SOCIAUX: LienSocial[] = [
  { label: 'GitHub',   href: 'https://github.com/Hugoat800',  icon: '/logo/github-6980894_640.webp' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hugo-vitry-3a9a78333', icon: '/logo/LinkedIn_icon.svg.webp'  },
  { label: 'C.V.',   href: '/public/CV_VITRY_Hugo_V2.pdf',              icon: '/logo/337946.png'   },
] 

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedTel, setCopiedTel] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2500)
    } catch {

    }
  }

  const copyTel = async () => {
    try {
      await navigator.clipboard.writeText(TEL)
      setCopiedTel(true)
      setTimeout(() => setCopiedTel(false), 2500)
    } catch {
      
    }
  }

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center"
      style={{ background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.04))' }}
      aria-labelledby="contact-title"
    >
      <div className="max-w-[1100px] mx-auto px-8 w-full">
        <div className="mb-12 text-center">
          <p className="section-label text-center">Me Contacter</p>
          <h2 id="contact-title" className="section-title">
            Travaillons <span>ensemble</span>
          </h2>
        </div>

        <div className="max-w-[520px] mx-auto flex flex-col items-center gap-8">
          <p className="text-center text-white/55 text-[1.02rem] leading-relaxed">
            Disponible pour une alternance ou un stage de 6 mois durant l'année 2026-2027.
            <br />
            N&apos;hésitez pas à me contacter.
          </p>

          <div className="w-full p-8 rounded-3xl bg-bg-surface border border-subtle flex flex-col gap-6">
            {/* Tel */}
            <div className="flex flex-col gap-2">
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-white/30">
                Téléphone
              </span>
              <button
                className="flex items-center justify-between w-full px-5 py-4 rounded-xl bg-bg-elevated border border-subtle cursor-pointer font-mono transition-all duration-150 hover:border-default hover:bg-violet-500/6 text-left"
                onClick={copyTel}
                aria-label={`Copier le numéro de téléphone : ${TEL}`}
              >
                <span className="text-[0.88rem] text-white font-medium break-all">{TEL}</span>
                <span
                  className={[
                    'text-[0.74rem] font-semibold font-body shrink-0 ml-4 px-2 py-0.5 rounded border transition-all duration-150',
                    copiedTel
                      ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/28'
                      : 'text-white/30 bg-bg-surface border-subtle',
                  ].join(' ')}
                >
                  {copiedTel ? 'Copié !' : 'Copier'}
                </span>

              </button>
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-white/30">
                Adresse email
              </span>
              <button
                className="flex items-center justify-between w-full px-5 py-4 rounded-xl bg-bg-elevated border border-subtle cursor-pointer font-mono transition-all duration-150 hover:border-default hover:bg-violet-500/6 text-left"
                onClick={copyEmail}
                aria-label={`Copier l'adresse email : ${EMAIL}`}
              >
                <span className="text-[0.88rem] text-white font-medium break-all">{EMAIL}</span>
                <span
                  className={[
                    'text-[0.74rem] font-semibold font-body shrink-0 ml-4 px-2 py-0.5 rounded border transition-all duration-150',
                    copiedEmail
                      ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/28'
                      : 'text-white/30 bg-bg-surface border-subtle',
                  ].join(' ')}
                >
                  {copiedEmail ? 'Copié !' : 'Copier'}
                </span>
              </button>
            </div>

            {/* Liens */}
            <div className="flex flex-col gap-2">
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-white/30">
                Retrouvez-moi sur
              </span>
              <nav className="flex gap-3 flex-wrap justify-center" aria-label="Liens sociaux et CV">
                {LIENS_SOCIAUX.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-bg-elevated border border-subtle text-white/50 text-[0.88rem] font-semibold transition-all duration-200 hover:bg-violet-500/8 hover:border-default hover:text-white hover:-translate-y-0.5"
                  >
                    <img
                      src={icon}
                      alt=""
                      aria-hidden="true"
                      className="w-5 h-5 object-contain"
                    />
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
