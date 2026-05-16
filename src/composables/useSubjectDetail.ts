import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSubjects } from './useSubjects'

export const useSubjectDetail = () => {
  const route = useRoute()
  const slug = computed(() => route.params.slug as string)

  const { subject, isLoading, hasError, loadSubject } = useSubjects()

  onMounted(() => {
    if (slug.value) {
      void loadSubject(slug.value)
    }
  })

  return {
    subject,
    isLoading,
    hasError
  }
}
