import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { renderWithRouter } from '../../test/render'
import { PROJECTS } from '../../data/projects'
import ProjectCard from './ProjectCard'

describe('<ProjectCard />', () => {
  test('should mount', () => {
    renderWithRouter(<ProjectCard project={PROJECTS[0]} onSkillClick={() => {}} />)

    expect(screen.getByRole('article')).toBeInTheDocument()
  })
})
