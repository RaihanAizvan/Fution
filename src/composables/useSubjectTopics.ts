import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { createApiTopicsSource } from '../services/topics/topicsApiSource'
import type { TopicSummary, TopicsSource } from '../services/topics/topicsMockSource'

const defaultSource = createApiTopicsSource()

export const useSubjectTopics = (source: TopicsSource = defaultSource) => {
  const route = useRoute()
  const slug = computed(() => route.params.slug as string)

  const topics = ref<TopicSummary[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const hasError = computed(() => error.value !== null)

  const loadTopics = async () => {
    if (!slug.value) {
      topics.value = []
      return
    }

    isLoading.value = true
    error.value = null

    try {
      topics.value = await source.listTopicsBySubject(slug.value)
    } catch (err) {
      error.value = err as Error
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    void loadTopics()
  })

  return {
    topics,
    isLoading,
    hasError,
    loadTopics
  }
}
