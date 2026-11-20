import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { Route, Routes } from 'react-router-dom'
import { PROJECTS } from '../../data/projects'
import { renderWithRouter } from '../../test/render'
import ProjectPage from './ProjectPage'

describe('<ProjectPage />', () => {
  test('should mount', () => {
    renderWithRouter(
      <Routes>
        <Route path="/projet/:slug" element={<ProjectPage />} />
      </Routes>,
      `/projet/${PROJECTS[0].slug}`,
    )

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
})
