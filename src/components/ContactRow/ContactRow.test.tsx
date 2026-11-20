import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { renderWithRouter } from '../../test/render'
import ContactRow from './ContactRow'

describe('<ContactRow />', () => {
  test('should mount', () => {
    renderWithRouter(
      <ContactRow label="Email" value="hello@example.com" href="mailto:hello@example.com" />,
    )

    expect(screen.getByRole('link', { name: 'hello@example.com' })).toBeInTheDocument()
  })
})
