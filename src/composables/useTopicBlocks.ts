import { computed, ref, watch } from 'vue'
import { createBlocksSource } from '../features/subjects/data/blocksSource'
import type { TopicBlock } from '../features/subjects/data/topicBlocks'

const defaultSource = createBlocksSource()

export const useTopicBlocks = (topicId: () => string | null) => {
  const blocks = ref<TopicBlock[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const hasError = computed(() => error.value !== null)

  const loadBlocks = async (slug: string) => {
    isLoading.value = true
    error.value = null

    try {
      blocks.value = await defaultSource.getBlocksByTopic(slug)
    } catch (err) {
      error.value = err as Error
    } finally {
      isLoading.value = false
    }
  }

  watch(
    topicId,
    (nextId) => {
      if (!nextId) {
        blocks.value = []
        return
      }

      void loadBlocks(nextId)
    },
    { immediate: true }
  )

  return {
    blocks,
    isLoading,
    hasError
  }
}
