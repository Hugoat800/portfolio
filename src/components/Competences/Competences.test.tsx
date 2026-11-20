import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { renderWithRouter } from '../../test/render'
import Competences from './Competences'

describe('<Competences />', () => {
  test('should mount', () => {
    renderWithRouter(<Competences />)

    expect(screen.getAllByRole('group').length).toBeGreaterThan(0)
  })
})
