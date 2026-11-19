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
/** Default music volume, from 0 to 1. */
export const MUSIC_VOLUME = 0.07
/** Highest volume the slider allows, so the music never gets too loud. */
export const MUSIC_MAX_VOLUME = 0.2

/** Sound played when a star is clicked, one file per kind of star. */
export const CLICK_SOUNDS: Record<StarKind, string> = {
  project: '/audio/clic-projets.mp3',
  skill: '/audio/clic-competences.mp3',
  techno: '/audio/clic-technos.mp3',
}
export const CLICK_VOLUME = 0.14

/** Sound of the "warp" toward a project page, on the second click. */
export const TRAVEL_SOUND = '/audio/voyage.mp3'

function playFile(src: string) {
  const sound = new Audio(src)
  sound.volume = CLICK_VOLUME
  sound.play().catch(() => {
    /* Missing file or blocked by the browser: stay silent. */
  })
}

export function playStarSound(kind: StarKind) {
  playFile(CLICK_SOUNDS[kind])
}

export function playTravelSound() {
  playFile(TRAVEL_SOUND)
}
