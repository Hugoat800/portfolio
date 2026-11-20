import { describe, test, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { renderWithRouter } from '../../test/render'
import Constellation3D from './Constellation3D'

// jsdom has no WebGL: the page shows its fallback, and the scene is replaced just in case.
vi.mock('../../three/ConstellationScene/ConstellationScene', () => ({ default: () => <div /> }))

describe('<Constellation3D />', () => {
  test('offers the classic version when WebGL is missing', () => {
    renderWithRouter(<Constellation3D />, '/3d')

    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })
})
