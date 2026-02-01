import { computed, ref } from 'vue'
import { createMockSubjectsSource } from '../services/subjects'
import type { SubjectDetail, SubjectSummary, SubjectsSource } from '../services/subjects'

const defaultSource = createMockSubjectsSource()

export const useSubjects = (source: SubjectsSource = defaultSource) => {
  const subjects = ref<SubjectSummary[]>([])
  const subject = ref<SubjectDetail | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const hasError = computed(() => error.value !== null)

  const loadSubjects = async () => {
    isLoading.value = true
    error.value = null

    try {
      subjects.value = await source.listSubjects()
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
      subject.value = await source.getSubject(slug)
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
