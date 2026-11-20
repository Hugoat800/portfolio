import { useEffect, useRef, useState, type CSSProperties } from 'react'
import './ContourBackground.css'

export interface ContourBackgroundProps {
  /** Any CSS colour. Defaults to the portfolio's theme accent. */
  color?: string
  /** Duration of one movement cycle in seconds. */
  duration?: number
  /** Overall opacity, from 0 to 1. */
  intensity?: number
  className?: string
}

const CONTOURS = Array.from({ length: 14 }, (_, index) => {
  const y = 90 + index * 29
  return `M -150 ${y} C 140 ${y - 170}, 300 ${y + 230}, 540 ${y + 70} S 920 ${y - 160}, 1250 ${y + 80}`
})

/** Place inside a positioned container. Decorative and independent of page content. */
export default function ContourBackground({
  color = 'var(--accent, #b7a0ee)',
  duration = 18,
  intensity = 0.25,
  className = '',
}: ContourBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const style = {
    '--contour-color': color,
    '--contour-duration': `${Math.max(1, duration)}s`,
    '--contour-intensity': Math.max(0, Math.min(1, intensity)),
    '--contour-play-state': visible ? 'running' : 'paused',
  } as CSSProperties

  return (
    <div ref={ref} className={`contour-background ${className}`} style={style} aria-hidden="true">
      <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" focusable="false">
        <g className="contour-background__lines">
          {CONTOURS.map((path, index) => (
            <path key={index} d={path} />
          ))}
        </g>
        <g className="contour-background__echo">
          {CONTOURS.filter((_, index) => index % 2 === 0).map((path, index) => (
            <path key={index} d={path} />
          ))}
        </g>
      </svg>
    </div>
  )
}
