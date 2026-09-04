export default function Footer() {

  const PhoneIcon = () => (
    <svg
      viewBox="0 0 512 512"
      aria-hidden="true"
      style={{ width: '0.85rem', height: '0.85rem', fill: 'currentColor', flexShrink: 0 }}
    >
      <path d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z" />
    </svg>
  )

  return (
    <footer className="border-t border-subtle px-8 py-5">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between gap-4 flex-wrap">
        <span className="flex items-center justify-center gap-1.5 text-[0.78rem]" style={{ color: 'var(--text-muted)' }}>
          <PhoneIcon /> +262693614191
        </span>
        <span className="text-[0.78rem] text-white/25">
          Codé avec React - Tailwind par{' '}
          <strong className="text-violet-400 font-semibold">Hugo Vitry</strong>
        </span>
      </div>
    </footer>
  )
}
