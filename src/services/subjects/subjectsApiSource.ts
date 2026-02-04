import type { SubjectDetail, SubjectSummary } from './subjectsRepository'
import type { SubjectsSource } from './subjectsSource'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

interface SubjectApiRecord {
  id: string
  slug: string
  title: string
}

export const createApiSubjectsSource = (): SubjectsSource => ({
  async listSubjects(): Promise<SubjectSummary[]> {
    const response = await fetch(`${API_BASE_URL}/admin/subjects`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch subjects')
    }

    const subjects = (await response.json()) as SubjectApiRecord[]
    
    return subjects.map(subject => ({
      slug: subject.slug,
      title: subject.title
    }))
  },

  async getSubject(slug: string): Promise<SubjectDetail | null> {
    const response = await fetch(`${API_BASE_URL}/admin/subjects`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch subject')
    }

    const subjects = (await response.json()) as SubjectApiRecord[]
    const subject = subjects.find(s => s.slug === slug)
    
    if (!subject) {
      return null
    }

    return {
      slug: subject.slug,
      title: subject.title
    }
  }
})
