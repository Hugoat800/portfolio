import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { renderWithRouter } from '../../test/render'
import Experience from './Experience'

describe('<Experience />', () => {
  test('should mount', () => {
    renderWithRouter(<Experience />)

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })
})
