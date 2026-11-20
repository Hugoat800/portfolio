import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { renderWithRouter } from '../../test/render'
import Navbar from './Navbar'

describe('<Navbar />', () => {
  test('should mount', () => {
    renderWithRouter(<Navbar activeId="" theme="dark" onThemeToggle={() => {}} />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
})
