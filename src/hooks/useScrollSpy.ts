import { useState, useEffect } from 'react'

export function useScrollSpy(
  sectionIds: string[],
  offsetRatio = 0.3,
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    const computeActive = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

      if (scrolledToBottom) {
        setActiveId(sectionIds[sectionIds.length - 1] ?? '')
        return
      }

      const referenceLine = window.innerHeight * offsetRatio

      // Sélectionne la section dont la plage [top, bottom] contient la ligne de référence.
      // Si aucune ne la contient (cas d'une section très courte), prend celle la plus proche.
      let current = sectionIds[0] ?? ''
      let bestDistance = Infinity

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const { top, bottom } = el.getBoundingClientRect()

        if (top <= referenceLine && bottom >= referenceLine) {
          // La ligne de référence est dans cette section -> match direct
          current = id
          bestDistance = -1
          break
        }

        // Sinon on garde la section la plus proche de la ligne (par son bord le plus proche)
        const distance = top > referenceLine
          ? top - referenceLine
          : referenceLine - bottom
        if (distance < bestDistance) {
          bestDistance = distance
          current = id
        }
      }

      setActiveId(current)
    }

    computeActive()
    window.addEventListener('scroll', computeActive, { passive: true })
    window.addEventListener('resize', computeActive)

    return () => {
      window.removeEventListener('scroll', computeActive)
      window.removeEventListener('resize', computeActive)
    }
  }, [sectionIds, offsetRatio])

  return activeId
}