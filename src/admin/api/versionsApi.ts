import { adminClient } from './adminClient'

export interface TopicVersionRecord {
  id: string
  topicId: string
  status: 'draft' | 'published'
  createdAt: string
}

export const versionsApi = {
  listByTopic: (topicId: string) =>
    adminClient.get<TopicVersionRecord[]>(`/admin/topics/${topicId}/versions`),
  createDraft: (topicId: string) =>
    adminClient.post<TopicVersionRecord>(`/admin/topics/${topicId}/versions`, {}),
  publish: (topicId: string, versionId: string) =>
    adminClient.post<TopicVersionRecord>(
      `/admin/topics/${topicId}/versions/${versionId}/publish`,
      {}
    )
}
