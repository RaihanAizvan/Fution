import { adminClient } from './adminClient'

export interface TopicRecord {
  id: string
  subjectId: string
  slug: string
  title: string
  level: string
}

export interface TopicPayload {
  subjectId?: string
  slug: string
  title: string
  level: string
  markdown?: string
}

export const topicsApi = {
  listBySubject: (subjectId: string) =>
    adminClient.get<TopicRecord[]>(`/admin/topics`, { params: { subjectId } }),
  create: (payload: TopicPayload) =>
    adminClient.post<TopicRecord>(`/admin/topics`, payload),
  update: (topicId: string, payload: Partial<TopicPayload>) =>
    adminClient.patch<TopicRecord>(`/admin/topics/${topicId}`, payload),
  delete: (topicId: string) =>
    adminClient.delete(`/admin/topics/${topicId}`),
  reorder: (subjectId: string, topics: Array<{ topicId: string; orderIndex: number }>) =>
    adminClient.put<void>(`/admin/topics/reorder`, { subjectId, topics })
}
