import { adminClient } from './adminClient'

export interface SubjectRecord {
  id: string
  slug: string
  title: string
}

export interface SubjectPayload {
  slug: string
  title: string
}

export const subjectsApi = {
  list: () => adminClient.get<SubjectRecord[]>('/admin/subjects'),
  create: (payload: SubjectPayload) =>
    adminClient.post<SubjectRecord>('/admin/subjects', payload),
  update: (id: string, payload: SubjectPayload) =>
    adminClient.put<SubjectRecord>(`/admin/subjects/${id}`, payload),
  delete: (id: string) => adminClient.delete(`/admin/subjects/${id}`),
  importTree: (payload: unknown) =>
    adminClient.post<void>('/admin/subjects/import', payload)
}
