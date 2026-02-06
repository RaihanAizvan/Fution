import { adminClient } from './adminClient'

export interface SubjectRecord {
  id: string
  slug: string
  title: string
  description?: string
  isActive?: boolean
  orderIndex?: number
}

export interface SubjectPayload {
  slug: string
  title: string
  description?: string
  isActive?: boolean
}

export const subjectsApi = {
  list: () => adminClient.get<SubjectRecord[]>('/admin/subjects'),
  create: (payload: SubjectPayload) =>
    adminClient.post<SubjectRecord>('/admin/subjects', payload),
  update: (id: string, payload: SubjectPayload) =>
    adminClient.patch<SubjectRecord>(`/admin/subjects/${id}`, payload),
  delete: (id: string) => adminClient.delete(`/admin/subjects/${id}`),
  reorder: (subjects: Array<{ subjectId: string; orderIndex: number }>) =>
    adminClient.put<void>('/admin/subjects/reorder', { subjects }),
  importTree: (payload: unknown) =>
    adminClient.post<void>('/admin/subjects/import', payload)
}
