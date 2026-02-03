import { adminClient } from './adminClient'

export type BlockType =
  | 'intro'
  | 'code'
  | 'accordion'
  | 'checklist'
  | 'pitfalls'
  | 'resources'

export interface BlockRecord {
  id: string
  type: BlockType
  order: number
  data: Record<string, unknown>
}

export interface BlocksResponse {
  blocks: BlockRecord[]
}

export const blocksApi = {
  list: (topicId: string, versionId: string) =>
    adminClient.get<BlocksResponse>(
      `/admin/topics/${topicId}/versions/${versionId}`
    ),
  create: (topicId: string, versionId: string, payload: { type: BlockType; data: unknown }) =>
    adminClient.post<BlockRecord>(
      `/admin/topics/${topicId}/versions/${versionId}/blocks`,
      payload
    ),
  update: (
    topicId: string,
    versionId: string,
    blockId: string,
    payload: { type: BlockType; data: unknown }
  ) =>
    adminClient.put<BlockRecord>(
      `/admin/topics/${topicId}/versions/${versionId}/blocks/${blockId}`,
      payload
    ),
  remove: (topicId: string, versionId: string, blockId: string) =>
    adminClient.delete(`/admin/topics/${topicId}/versions/${versionId}/blocks/${blockId}`),
  reorder: (topicId: string, versionId: string, orderedIds: string[]) =>
    adminClient.post<void>(
      `/admin/topics/${topicId}/versions/${versionId}/blocks/reorder`,
      { orderedIds }
    )
}
