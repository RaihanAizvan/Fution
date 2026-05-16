import { createSubjectsRepository } from './subjectsRepository'
import { subjectsApi } from './subjectsApi'
import type { SubjectsSource } from './subjectsSource'

export const createSubjectsSource = (): SubjectsSource => {
  const repository = createSubjectsRepository(subjectsApi)

  return {
    listSubjects: repository.getSubjects,
    getSubject: repository.getSubjectBySlug
  }
}
