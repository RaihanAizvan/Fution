import type { TopicSummary, TopicsSource } from './topicsMockSource'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''


interface TopicApiRecord {
  id: string
  subjectId: string
  slug: string
  title: string
  level: string
}

export const createApiTopicsSource = (): TopicsSource => ({
  async listTopicsBySubject(subjectSlug: string): Promise<TopicSummary[]> {
    const response = await fetch(`${API_BASE_URL}/subjects/${subjectSlug}/topics`, { cache: 'no-cache' })

    if (!response.ok) {
      throw new Error(`Failed to fetch topics for subject: ${subjectSlug}`)
    }

    const data = await response.json()
    const topics: TopicApiRecord[] = data.topics || []

    return topics.map(topic => ({
      id: topic.slug,
      title: topic.title
    }))
  }
})
