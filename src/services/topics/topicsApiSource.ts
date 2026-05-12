import type { TopicSummary, TopicsSource } from './topicsMockSource'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

interface SubjectApiRecord {
  id: string
  slug: string
  title: string
}

interface TopicApiRecord {
  id: string
  subjectId: string
  slug: string
  title: string
  level: string
}

export const createApiTopicsSource = (): TopicsSource => ({
  async listTopicsBySubject(subjectSlug: string): Promise<TopicSummary[]> {
    // First, fetch all subjects to find the ID for this slug
    const subjectsResponse = await fetch(`${API_BASE_URL}/admin/subjects`)
    
    if (!subjectsResponse.ok) {
      throw new Error('Failed to fetch subjects')
    }

    const subjects = (await subjectsResponse.json()) as SubjectApiRecord[]
    const subject = subjects.find(s => s.slug === subjectSlug)
    
    if (!subject) {
      return []
    }

    // Then fetch topics for that subject
    const topicsResponse = await fetch(`${API_BASE_URL}/admin/topics?subjectId=${subject.id}`)
    
    if (!topicsResponse.ok) {
      throw new Error('Failed to fetch topics')
    }

    const topics = (await topicsResponse.json()) as TopicApiRecord[]
    
    return topics.map(topic => ({
      id: topic.slug,
      title: topic.title
    }))
  }
})
