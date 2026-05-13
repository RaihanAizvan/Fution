import type { SubjectDetail, SubjectSummary } from './subjectsRepository'
import type { SubjectsSource } from './subjectsSource'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

interface SubjectApiRecord {
  id: string
  slug: string
  title: string
  description?: string
  isActive?: boolean
}

export const createApiSubjectsSource = (): SubjectsSource => ({
  async listSubjects(): Promise<SubjectSummary[]> {
    const response = await fetch(`${API_BASE_URL}/subjects`, { cache: 'no-cache' })

    // Debug: log status/headers to help diagnose 304 caching issues
    // eslint-disable-next-line no-console
    console.log('listSubjects response status:', response.status)
    // eslint-disable-next-line no-console
    console.log('listSubjects response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      throw new Error(`Failed to fetch subjects: ${response.status}`)
    }

    const subjects = (await response.json()) as SubjectApiRecord[]

    return subjects
      .filter(subject => subject.isActive !== false)
      .map(subject => ({
        slug: subject.slug,
        title: subject.title,
        description: subject.description
      }))
  },

  async getSubject(slug: string): Promise<SubjectDetail | null> {
    const response = await fetch(`${API_BASE_URL}/subjects`, { cache: 'no-cache' })


    // Debug: log status/headers for getSubject
    // eslint-disable-next-line no-console
    console.log('getSubject response status:', response.status)
    // eslint-disable-next-line no-console
    console.log('getSubject response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      throw new Error(`Failed to fetch subject: ${response.status}`)
    }

    const subjects = (await response.json()) as SubjectApiRecord[]
    const subject = subjects.find(
      s => s.slug === slug && s.isActive !== false
    )

    if (!subject) {
      return null
    }

    return {
      slug: subject.slug,
      title: subject.title,
      description: subject.description
    }
  }
})
