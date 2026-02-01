import type { TopicBlock } from './topicBlocks'

export interface BlocksSource {
  getBlocksByTopic: (slug: string) => Promise<TopicBlock[]>
}

type BlocksApiResponse = {
  topic: {
    slug: string
    title: string
  }
  blocks: Array<{
    type: 'intro' | 'code' | 'accordion'
    data: Record<string, unknown>
  }>
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

const mapBlocks = (response: BlocksApiResponse): TopicBlock[] =>
  response.blocks.flatMap((block) => {
    if (block.type === 'intro') {
      const data = block.data as { title?: string; description?: string }
      if (!data.title || !data.description) {
        return []
      }
      return [{ type: 'intro', title: data.title, description: data.description }]
    }

    if (block.type === 'code') {
      const data = block.data as { language?: string; code?: string }
      if (!data.language || !data.code) {
        return []
      }
      return [{ type: 'code', language: data.language, code: data.code }]
    }

    const data = block.data as { items?: Array<{ title?: string; content?: string }> }
    const firstItem = data.items?.[0]
    if (!firstItem?.title || !firstItem.content) {
      return []
    }

    return [{ type: 'accordion', title: firstItem.title, content: firstItem.content }]
  })

export const createBlocksSource = (): BlocksSource => ({
  async getBlocksByTopic(slug: string) {
    const response = await fetch(`${API_BASE_URL}/topics/${slug}/content`)

    if (!response.ok) {
      return []
    }

    const payload = (await response.json()) as BlocksApiResponse

    return mapBlocks(payload)
  }
})
