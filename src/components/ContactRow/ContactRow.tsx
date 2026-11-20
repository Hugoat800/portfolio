import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './ContactRow.css'
export default function ContactRow({
  label,
  value,
  href,
}: {
  label: string
  value: string
  href: string
}) {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => () => clearTimeout(timer.current), [])
  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setStatus('copied')
    } catch {
      setStatus('error')
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus('idle'), 3000)
  }
  return (
    <div className="contact-row">
      <span>{label}</span>
      <div>
        <a href={href}>{value}</a>
        <button onClick={() => void copy()} aria-label={t('common.copyValue', { value })}>
          {t('common.copy')}
        </button>
      </div>
      <p role="status">{status === 'idle' ? '' : t(`common.${status}`)}</p>
    </div>
  )
}
