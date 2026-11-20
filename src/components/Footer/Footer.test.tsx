import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { renderWithRouter } from '../../test/render'
import Footer from './Footer'

describe('<Footer />', () => {
  test('should mount', () => {
    renderWithRouter(<Footer />)

    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
