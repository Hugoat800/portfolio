import { describe, test, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render } from '@testing-library/react'
import ContourBackground from './ContourBackground'

describe('<ContourBackground />', () => {
  test('should mount', () => {
    const { container } = render(<ContourBackground />)

    expect(container.querySelector('.contour-background')).toBeInTheDocument()
  })
})
