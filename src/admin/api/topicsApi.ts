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
  update: (subjectId: string, topicId: string, payload: TopicPayload) =>
    adminClient.patch<TopicRecord>(
      `/admin/subjects/${subjectId}/topics/${topicId}`,
      payload
    ),
  delete: (subjectId: string, topicId: string) =>
    adminClient.delete(`/admin/subjects/${subjectId}/topics/${topicId}`),
  reorder: (subjectId: string, topics: Array<{ topicId: string; orderIndex: number }>) =>
    adminClient.put<void>(`/admin/subjects/${subjectId}/topics/reorder`, { topics })
}
