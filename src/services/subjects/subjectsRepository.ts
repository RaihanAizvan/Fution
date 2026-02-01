import type { SubjectApiClient } from './subjectsApi'

export interface SubjectSummary {
  slug: string
  title: string
}

export interface SubjectDetail extends SubjectSummary {
  description?: string
}

export interface SubjectsRepository {
  getSubjects: () => Promise<SubjectSummary[]>
  getSubjectBySlug: (slug: string) => Promise<SubjectDetail | null>
}

export const createSubjectsRepository = (
  client: SubjectApiClient
): SubjectsRepository => ({
  async getSubjects() {
    await client.listSubjects()
    return []
  },
  async getSubjectBySlug(slug: string) {
    await client.fetchSubject(slug)
    return null
  }
})
