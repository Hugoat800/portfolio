import { useEffect, useRef, useState } from 'react'
import { MUSIC_VOLUME, PLAYLIST } from './sound'

const STORAGE_KEY = 'space-sound'

/**
 * Background playlist of the 3D page. Starts on a random track, plays them in
 * order and loops. Browsers only allow sound after a user gesture, so nothing
 * plays before the first click or key press.
 */
export function useSpaceMusic() {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [track, setTrack] = useState(() => Math.floor(Math.random() * PLAYLIST.length))
  const [soundOn, setSoundOn] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== 'off'
    } catch {
      return true
    }
  })
  const soundOnRef = useRef(soundOn)
  soundOnRef.current = soundOn
  const started = useRef(false)
  const failures = useRef(0)

  const play = () => {
    const el = audio.current
    if (!el || !soundOnRef.current || !PLAYLIST.length) return
    started.current = true
    el.volume = MUSIC_VOLUME
    el.play().catch(() => {
      /* The browser refused or the file is missing: the error handler moves on. */
    })
  }

  const next = () => setTrack((i) => (i + 1) % PLAYLIST.length)

  // One <audio> element for the whole page, removed when leaving the 3D view.
  useEffect(() => {
    const el = new Audio()
    el.preload = 'none'
    audio.current = el
    const onEnded = () => {
      failures.current = 0
      next()
    }
    // Skip missing or broken files, but stop once every track has failed.
    const onError = () => {
      failures.current += 1
      if (failures.current < PLAYLIST.length) next()
    }
    el.addEventListener('ended', onEnded)
    el.addEventListener('error', onError)
    window.addEventListener('pointerdown', play, { once: true })
    window.addEventListener('keydown', play, { once: true })
    return () => {
      el.pause()
      el.removeAttribute('src')
      el.removeEventListener('ended', onEnded)
      el.removeEventListener('error', onError)
      window.removeEventListener('pointerdown', play)
      window.removeEventListener('keydown', play)
      audio.current = null
    }
  }, [])

  // Load the current track, and keep playing if the music had already started.
  useEffect(() => {
    const el = audio.current
    if (!el || !PLAYLIST.length) return
    el.src = PLAYLIST[track].src
    el.loop = PLAYLIST.length === 1
    if (started.current) play()
  }, [track])

  const toggle = () => {
    const value = !soundOn
    setSoundOn(value)
    soundOnRef.current = value
    try {
      localStorage.setItem(STORAGE_KEY, value ? 'on' : 'off')
    } catch {
      /* Keep working without storage. */
    }
    if (value) play()
    else audio.current?.pause()
  }

  const skip = () => {
    failures.current = 0
    started.current = true
    next()
  }

  return {
    soundOn,
    soundOnRef,
    toggle,
    skip,
    title: PLAYLIST[track]?.title ?? '',
    hasPlaylist: PLAYLIST.length > 1,
  }
}
