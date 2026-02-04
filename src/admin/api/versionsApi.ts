import { adminClient } from './adminClient'

export interface TopicVersionRecord {
  id: string
  topicId: string
  version: number
  isPublished: boolean
  createdAt: string
}

export const versionsApi = {
  listByTopic: (subjectId: string, topicId: string) =>
    adminClient.get<TopicVersionRecord[]>(
      `/admin/subjects/${subjectId}/topics/${topicId}/versions`
    ),
  createDraft: (subjectId: string, topicId: string, version: number) =>
    adminClient.post<TopicVersionRecord>(
      `/admin/subjects/${subjectId}/topics/${topicId}/versions`,
      { version, isPublished: false }
    ),
  update: (subjectId: string, topicId: string, versionId: string, isPublished: boolean) =>
    adminClient.patch<TopicVersionRecord>(
      `/admin/subjects/${subjectId}/topics/${topicId}/versions/${versionId}`,
      { isPublished }
    ),
  remove: (subjectId: string, topicId: string, versionId: string) =>
    adminClient.delete(
      `/admin/subjects/${subjectId}/topics/${topicId}/versions/${versionId}`
    )
}
