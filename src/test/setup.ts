import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '../i18n'

afterEach(cleanup)

// jsdom does not implement matchMedia, used by the theme and the 3D page.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}

// jsdom has no canvas or media playback: report WebGL as missing and keep audio silent.
HTMLCanvasElement.prototype.getContext = () => null
HTMLMediaElement.prototype.play = () => Promise.resolve()
HTMLMediaElement.prototype.pause = () => {}
