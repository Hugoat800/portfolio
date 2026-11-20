import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { renderWithRouter } from '../../test/render'
import LanguageSwitcher from './LanguageSwitcher'

describe('<LanguageSwitcher />', () => {
  test('should mount', () => {
    renderWithRouter(<LanguageSwitcher />)

    expect(screen.getAllByRole('button')).toHaveLength(2)
  })
})
