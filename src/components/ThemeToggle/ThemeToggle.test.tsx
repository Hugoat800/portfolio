import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { render } from '@testing-library/react'
import ThemeToggle from './ThemeToggle'

describe('<ThemeToggle />', () => {
  test('should mount', () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} />)

    expect(screen.getByRole('button')).toHaveAttribute('data-theme', 'dark')
  })
})
