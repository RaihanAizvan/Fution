import { adminClient } from './adminClient'

export interface TopicRecord {
  id: string
  subjectId: string
  slug: string
  title: string
}

export interface TopicPayload {
  slug: string
  title: string
}

export const topicsApi = {
  listBySubject: (subjectId: string) =>
    adminClient.get<TopicRecord[]>(`/admin/subjects/${subjectId}/topics`),
  create: (subjectId: string, payload: TopicPayload) =>
    adminClient.post<TopicRecord>(`/admin/subjects/${subjectId}/topics`, payload),
  update: (topicId: string, payload: TopicPayload) =>
    adminClient.put<TopicRecord>(`/admin/topics/${topicId}`, payload)
}
