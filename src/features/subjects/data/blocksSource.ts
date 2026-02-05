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
    type: 'intro' | 'code' | 'accordion' | 'checklist' | 'pitfalls' | 'resources'
    data: Record<string, unknown>
  }>
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

const mapBlocks = (response: BlocksApiResponse): TopicBlock[] =>
  response.blocks.reduce<TopicBlock[]>((acc, block) => {
    if (block.type === 'intro') {
      const data = block.data as { title?: string; description?: string }
      if (data.title && data.description) {
        acc.push({ type: 'intro', data: { title: data.title, description: data.description } })
      }
      return acc
    }

    if (block.type === 'code') {
      const data = block.data as { language?: string; code?: string }
      if (data.language && data.code) {
        acc.push({ type: 'code', data: { language: data.language, code: data.code } })
      }
      return acc
    }

    if (block.type === 'accordion' || block.type === 'checklist' || block.type === 'pitfalls') {
      const data = block.data as { items?: Array<{ title?: string; description?: string }> }
      const items = data.items?.filter((item) => item.title) ?? []
      if (items.length > 0) {
        acc.push({
          type: block.type,
          data: {
            items: items.map((item) => ({
              title: item.title as string,
              description: item.description as string | undefined
            }))
          }
        })
      }
      return acc
    }

    if (block.type === 'resources') {
      const data = block.data as { items?: Array<{ title?: string; url?: string }> }
      const items = data.items?.filter((item) => item.title && item.url) ?? []
      if (items.length > 0) {
        acc.push({
          type: 'resources',
          data: { items: items as { title: string; url: string }[] }
        })
      }
      return acc
    }

    return acc
  }, [])

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
