import { adminClient } from './adminClient'

export interface TopicVersionRecord {
  id: string
  topicId: string
  version: number
  isPublished: boolean
  markdown: string
  html: string
  createdAt: string
}

export const versionsApi = {
  listByTopic: (topicId: string) =>
    adminClient.get<TopicVersionRecord[]>(`/admin/topics/${topicId}/versions`),
  getById: (topicId: string, versionId: string) =>
    adminClient.get<TopicVersionRecord>(`/admin/topics/${topicId}/versions/${versionId}`),
  createDraft: (topicId: string, version: number) =>
    adminClient.post<TopicVersionRecord>(`/admin/topics/${topicId}/versions`, {
      version,
    }),
  updateContent: (topicId: string, versionId: string, markdown: string) =>
    adminClient.patch<TopicVersionRecord>(`/admin/topics/${topicId}/versions/${versionId}`, {
      markdown
    }),
  publish: (topicId: string, versionId: string) =>
    adminClient.post<TopicVersionRecord>(
      `/admin/topics/${topicId}/versions/${versionId}/publish`,
      {}
    )
}

