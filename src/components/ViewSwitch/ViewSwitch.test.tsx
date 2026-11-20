import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { renderWithRouter } from '../../test/render'
import ViewSwitch from './ViewSwitch'

describe('<ViewSwitch />', () => {
  test('should mount', () => {
    renderWithRouter(<ViewSwitch />)

    expect(screen.getByRole('link')).toHaveAttribute('href', '/3d')
  })
})
