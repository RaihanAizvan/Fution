import type { SubjectApiClient } from './subjectsApi'

export interface SubjectSummary {
  slug: string
  title: string
  description?: string
}

export interface SubjectDetail extends SubjectSummary { }

export interface SubjectsRepository {
  getSubjects: () => Promise<SubjectSummary[]>
  getSubjectBySlug: (slug: string) => Promise<SubjectDetail | null>
}

export const createSubjectsRepository = (
  client: SubjectApiClient
): SubjectsRepository => ({
  async getSubjects() {
    const subjects = await client.listSubjects()
    return (subjects as SubjectSummary[]) || []
  },
  async getSubjectBySlug(slug: string) {
    const subject = await client.fetchSubject(slug)
    return (subject as SubjectDetail) || null
  }
})
