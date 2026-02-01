import { topicBlocks } from './topicBlocks'
import type { TopicBlock } from './topicBlocks'

export interface BlocksSource {
  getBlocksByTopic: (slug: string) => Promise<TopicBlock[]>
}

export const createBlocksSource = (): BlocksSource => ({
  async getBlocksByTopic(slug: string) {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve(topicBlocks[slug] ?? [])
      }, 0)
    })
  }
})
