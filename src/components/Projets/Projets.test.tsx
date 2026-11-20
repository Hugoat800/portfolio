import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { renderWithRouter } from '../../test/render'
import Projets from './Projets'

describe('<Projets />', () => {
  test('should mount', () => {
    renderWithRouter(<Projets />)

    expect(screen.getAllByRole('article').length).toBeGreaterThan(0)
  })
})
