import type { SubjectDetail, SubjectSummary } from './subjectsRepository'

export interface SubjectsSource {
  listSubjects: () => Promise<SubjectSummary[]>
  getSubject: (slug: string) => Promise<SubjectDetail | null>
}

export const createEmptySubjectsSource = (): SubjectsSource => ({
  async listSubjects() {
    return []
  },
  async getSubject() {
    return null
  }
})
