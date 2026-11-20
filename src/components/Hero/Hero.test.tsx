import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { renderWithRouter } from '../../test/render'
import Hero from './Hero'

describe('<Hero />', () => {
  test('should mount', () => {
    renderWithRouter(<Hero />)

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
})
