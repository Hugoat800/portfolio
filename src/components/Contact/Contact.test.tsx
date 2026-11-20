import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { renderWithRouter } from '../../test/render'
import Contact from './Contact'

describe('<Contact />', () => {
  test('should mount', () => {
    renderWithRouter(<Contact />)

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })
})
