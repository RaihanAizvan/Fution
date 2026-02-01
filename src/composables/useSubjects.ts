import { computed, ref } from 'vue'
import { createSubjectsRepository, subjectsApi } from '../services/subjects'
import type { SubjectDetail, SubjectSummary } from '../services/subjects'

const repository = createSubjectsRepository(subjectsApi)

export const useSubjects = () => {
  const subjects = ref<SubjectSummary[]>([])
  const subject = ref<SubjectDetail | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const hasError = computed(() => error.value !== null)

  const loadSubjects = async () => {
    isLoading.value = true
    error.value = null

    try {
      subjects.value = await repository.getSubjects()
    } catch (err) {
      error.value = err as Error
    } finally {
      isLoading.value = false
    }
  }

  const loadSubject = async (slug: string) => {
    isLoading.value = true
    error.value = null

    try {
      subject.value = await repository.getSubjectBySlug(slug)
    } catch (err) {
      error.value = err as Error
    } finally {
      isLoading.value = false
    }
  }

  return {
    subjects,
    subject,
    isLoading,
    hasError,
    error,
    loadSubjects,
    loadSubject
  }
}
