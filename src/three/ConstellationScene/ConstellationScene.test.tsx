import { describe, test, expect } from 'vitest'
import { STAR_COLORS } from './ConstellationScene'

// The scene itself needs WebGL, which jsdom does not provide.
describe('<ConstellationScene />', () => {
  test('has a colour for each kind of star', () => {
    expect(Object.keys(STAR_COLORS).sort()).toEqual(['project', 'skill', 'techno'])
  })
})
