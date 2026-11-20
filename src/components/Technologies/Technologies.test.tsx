import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { renderWithRouter } from '../../test/render'
import Technologies from './Technologies'

describe('<Technologies />', () => {
  test('should mount', () => {
    renderWithRouter(<Technologies />)

    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0)
  })
})
