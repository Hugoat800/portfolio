import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { renderWithRouter } from '../../test/render'
import APropos from './APropos'

describe('<APropos />', () => {
  test('should mount', () => {
    renderWithRouter(<APropos />)

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })
})
