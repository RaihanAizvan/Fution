import type { SubjectDetail, SubjectSummary } from './subjectsRepository'
import type { SubjectsSource } from './subjectsSource'

const mockSubjects: SubjectSummary[] = [
  { slug: 'javascript', title: 'JavaScript' },
  { slug: 'html', title: 'HTML' },
  { slug: 'css', title: 'CSS' }
]

export const createMockSubjectsSource = (): SubjectsSource => ({
  async listSubjects() {
    return mockSubjects
  },
  async getSubject(slug: string) {
    const match = mockSubjects.find((subject) => subject.slug === slug)
    return match ? ({ ...match } satisfies SubjectDetail) : null
  }
})
