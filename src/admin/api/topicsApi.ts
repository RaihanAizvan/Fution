import { adminClient } from './adminClient'

export interface TopicRecord {
  id: string
  subjectId: string
  slug: string
  title: string
  level: string
}

export interface TopicPayload {
  slug: string
  title: string
  level: string
}

export const topicsApi = {
  listBySubject: (subjectId: string) =>
    adminClient.get<TopicRecord[]>(`/admin/subjects/${subjectId}/topics`),
  create: (subjectId: string, payload: TopicPayload) =>
    adminClient.post<TopicRecord>(`/admin/subjects/${subjectId}/topics`, payload),
  update: (topicId: string, payload: TopicPayload) =>
    adminClient.put<TopicRecord>(`/admin/topics/${topicId}`, payload),
  delete: (topicId: string) => adminClient.delete(`/admin/topics/${topicId}`),
  reorder: (subjectId: string, orderedIds: string[]) =>
    adminClient.post<void>(`/admin/subjects/${subjectId}/topics/reorder`, { orderedIds })
}
