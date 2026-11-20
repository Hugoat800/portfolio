import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { render } from '@testing-library/react'
import TagList from './TagList'

describe('<TagList />', () => {
  test('should mount', () => {
    render(<TagList items={['React', 'Vite']} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })
})
