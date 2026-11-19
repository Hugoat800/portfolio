import type { StarKind } from './constellationData'

export interface Track {
  /** File in public/audio/, e.g. '/audio/nebula.mp3'. */
  src: string
  /** Shown when hovering the "next track" button. */
  title: string
}

/**
 * Background playlist of the 3D page. Put the files in public/audio/ and list
 * them here; it starts on a random track and plays them in order.
 */
export const PLAYLIST: Track[] = [
  { src: '/audio/musique-1.mp3', title: 'Musique 1' },
  { src: '/audio/musique-2.mp3', title: 'Musique 2' },
  { src: '/audio/musique-3.mp3', title: 'Musique 3' },
]
export const MUSIC_VOLUME = 0.07

/** Sound played when a star is clicked, one file per kind of star. */
export const CLICK_SOUNDS: Record<StarKind, string> = {
  project: '/audio/clic-projets.mp3',
  skill: '/audio/clic-competences.mp3',
  techno: '/audio/clic-technos.mp3',
}
export const CLICK_VOLUME = 0.14

export function playStarSound(kind: StarKind) {
  const sound = new Audio(CLICK_SOUNDS[kind])
  sound.volume = CLICK_VOLUME
  sound.play().catch(() => {
    /* Missing file or blocked by the browser: stay silent. */
  })
}
