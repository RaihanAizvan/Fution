import { ref, watch, computed } from 'vue'
import { fetchTopicContent, type TopicContent } from '../services/topics'

export function useTopicContent(slugProvider: () => string | null) {
    const content = ref<TopicContent | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const hasError = computed(() => error.value !== null)

    const loadContent = async (slug: string) => {
        isLoading.value = true
        error.value = null
        try {
            content.value = await fetchTopicContent(slug)
        } catch (err: any) {
            if (err.message === 'Content not found') {
                error.value = 'Topic not found'
            } else {
                error.value = 'Failed to load content'
            }
            content.value = null
        } finally {
            isLoading.value = false
        }
    }

    watch(
        slugProvider,
        (newSlug) => {
            if (newSlug) {
                loadContent(newSlug)
            } else {
                content.value = null
            }
        },
        { immediate: true }
    )

    return {
        content,
        isLoading,
        error,
        hasError
    }
}
