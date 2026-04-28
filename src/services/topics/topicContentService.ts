const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export interface TopicContent {
    topic: {
        slug: string
        title: string
        isActive: boolean
    }
    markdown: string
    html: string
}

export async function fetchTopicContent(slug: string): Promise<TopicContent> {
    const response = await fetch(`${API_BASE_URL}/topics/${slug}/content`)

    if (response.status === 404) {
        throw new Error('Content not found')
    }

    if (!response.ok) {
        throw new Error('Failed to fetch topic content')
    }

    return response.json() as Promise<TopicContent>
}
