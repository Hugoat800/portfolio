import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { renderWithRouter } from '../../test/render'
import Section from './Section'

describe('<Section />', () => {
  test('should mount', () => {
    renderWithRouter(
      <Section id="contact">
        <p>Contenu</p>
      </Section>,
    )

    expect(screen.getByText('Contenu')).toBeInTheDocument()
  })
})
