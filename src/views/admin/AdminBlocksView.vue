<template>
  <AdminLayout>
    <section>
      <h2>Blocks</h2>
      <RouterLink :to="`/admin/topics/${topicId}/versions?subjectId=${subjectId}`">
        Back to versions
      </RouterLink>

      <form class="admin-form" @submit.prevent="createBlock">
        <h3>Add block</h3>
        <label>
          Type
          <select v-model="newBlock.type">
            <option value="intro">Intro</option>
            <option value="code">Code</option>
            <option value="accordion">Accordion</option>
            <option value="checklist">Checklist</option>
            <option value="pitfalls">Pitfalls</option>
            <option value="resources">Resources</option>
          </select>
        </label>
        <div v-if="newBlock.type === 'intro'">
          <label>
            Title
            <input v-model="newBlock.data.title" type="text" />
          </label>
          <label>
            Description
            <textarea v-model="newBlock.data.description" />
          </label>
        </div>
        <div v-else-if="newBlock.type === 'code'">
          <label>
            Language
            <input v-model="newBlock.data.language" type="text" />
          </label>
          <label>
            Code
            <textarea v-model="newBlock.data.code" />
          </label>
        </div>
        <div v-else-if="['accordion', 'checklist', 'pitfalls'].includes(newBlock.type)">
          <div v-for="(item, index) in newBlock.data.items" :key="index">
            <label>
              Title
              <input v-model="item.title" type="text" />
            </label>
            <label>
              Description
              <textarea v-model="item.description" />
            </label>
            <button type="button" @click="removeListItem(newBlock.data.items, index)">
              Remove item
            </button>
          </div>
          <button type="button" @click="addListItem(newBlock.data.items)">
            Add item
          </button>
        </div>
        <div v-else-if="newBlock.type === 'resources'">
          <div v-for="(item, index) in newBlock.data.resourceItems" :key="index">
            <label>
              Title
              <input v-model="item.title" type="text" />
            </label>
            <label>
              URL
              <input v-model="item.url" type="text" />
            </label>
            <button type="button" @click="removeResource(newBlock.data.resourceItems, index)">
              Remove resource
            </button>
          </div>
          <button type="button" @click="addResource(newBlock.data.resourceItems)">
            Add resource
          </button>
        </div>
        <p v-for="message in createErrors" :key="message" class="error">{{ message }}</p>
        <button type="submit">Create block</button>
      </form>

      <p v-if="isLoading">Loading blocks…</p>
      <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>
      <ul v-else>
        <li v-for="(block, index) in blocks" :key="block.id">
          <div>
            <strong>{{ block.type }}</strong>
            <button type="button" @click="moveBlock(index, -1)">Up</button>
            <button type="button" @click="moveBlock(index, 1)">Down</button>
          </div>
          <form class="admin-form" @submit.prevent="updateBlock(block)">
            <div v-if="block.type === 'intro'">
              <input v-model="block.data.title" type="text" />
              <textarea v-model="block.data.description" />
            </div>
            <div v-else-if="block.type === 'code'">
              <input v-model="block.data.language" type="text" />
              <textarea v-model="block.data.code" />
            </div>
            <div v-else-if="['accordion', 'checklist', 'pitfalls'].includes(block.type)">
              <div v-for="(item, itemIndex) in block.data.items" :key="itemIndex">
                <input v-model="item.title" type="text" />
                <textarea v-model="item.description" />
                <button type="button" @click="removeListItem(block.data.items, itemIndex)">
                  Remove item
                </button>
              </div>
              <button type="button" @click="addListItem(block.data.items)">
                Add item
              </button>
            </div>
            <div v-else-if="block.type === 'resources'">
              <div v-for="(item, itemIndex) in block.data.items" :key="itemIndex">
                <input v-model="item.title" type="text" />
                <input v-model="item.url" type="text" />
                <button type="button" @click="removeResource(block.data.items, itemIndex)">
                  Remove resource
                </button>
              </div>
              <button type="button" @click="addResource(block.data.items)">
                Add resource
              </button>
            </div>
            <p v-for="message in updateErrors[block.id] ?? []" :key="message" class="error">
              {{ message }}
            </p>
            <button type="submit">Save</button>
            <button type="button" @click="deleteBlock(block.id)">Delete</button>
          </form>
        </li>
      </ul>
    </section>
  </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AdminLayout from '../../admin/AdminLayout.vue'
import { getErrorMessage, mapValidationErrors } from '../../admin/api/adminErrors'
import { blocksApi, type BlockRecord, type BlockType } from '../../admin/api/blocksApi'

const route = useRoute()
const topicId = route.params.topicId as string
const versionId = route.params.versionId as string
const subjectId = route.query.subjectId as string

const blocks = ref<BlockRecord[]>([])
const isLoading = ref(false)
const errorMessage = ref('')
const createErrors = ref<string[]>([])
const updateErrors = reactive<Record<string, string[]>>({})

const newBlock = reactive({
  type: 'intro' as BlockType,
  data: {
    title: '',
    description: '',
    language: '',
    code: '',
    items: [{ title: '', description: '' }],
    resourceItems: [{ title: '', url: '' }]
  }
})

const loadBlocks = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await blocksApi.list(topicId, versionId)
    const blocksResponse = Array.isArray(response) ? response : response.blocks
    blocks.value = (blocksResponse ?? []).map((block) => ({
      ...block,
      data: normalizeBlockData(block)
    }))
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    isLoading.value = false
  }
}

const normalizeBlockData = (block: BlockRecord) => {
  if (block.type === 'intro') {
    return {
      title: (block.data as any).title ?? '',
      description: (block.data as any).description ?? ''
    }
  }
  if (block.type === 'code') {
    return {
      language: (block.data as any).language ?? '',
      code: (block.data as any).code ?? ''
    }
  }
  if (block.type === 'accordion' || block.type === 'checklist' || block.type === 'pitfalls') {
    return {
      items: (block.data as any).items ?? [{ title: '', description: '' }]
    }
  }
  if (block.type === 'resources') {
    return {
      items: (block.data as any).items ?? [{ title: '', url: '' }]
    }
  }
  return {
    items: (block.data as any).items ?? ['']
  }
}

const createBlock = async () => {
  createErrors.value = []
  errorMessage.value = ''

  try {
    const payload = {
      ...buildPayload(newBlock.type, newBlock.data),
      orderIndex: blocks.value.length
    }
    const created = await blocksApi.create(topicId, versionId, payload)
    blocks.value.push({
      ...created,
      data: normalizeBlockData(created)
    })
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
    createErrors.value = flattenValidationErrors(error)
  }
}

const updateBlock = async (block: BlockRecord) => {
  updateErrors[block.id] = []
  errorMessage.value = ''

  try {
    const payload = buildPayload(block.type, block.data)
    const updated = await blocksApi.update(topicId, versionId, block.id, payload)
    block.data = normalizeBlockData(updated)
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
    updateErrors[block.id] = flattenValidationErrors(error)
  }
}

const deleteBlock = async (blockId: string) => {
  errorMessage.value = ''
  try {
    await blocksApi.remove(topicId, versionId, blockId)
    blocks.value = blocks.value.filter((block) => block.id !== blockId)
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  }
}

const moveBlock = async (index: number, delta: number) => {
  const target = index + delta
  if (target < 0 || target >= blocks.value.length) {
    return
  }

  const reordered = [...blocks.value]
  const [item] = reordered.splice(index, 1)
  reordered.splice(target, 0, item)
  blocks.value = reordered

  await blocksApi.reorder(
    topicId,
    versionId,
    blocks.value.map((block, index) => ({
      blockId: block.id,
      orderIndex: index + 1
    }))
  )
}

const flattenValidationErrors = (error: unknown) => {
  const mapped = mapValidationErrors(error)
  return Object.entries(mapped).flatMap(([field, messages]) =>
    messages.map((message) => `${field}: ${message}`)
  )
}

const buildPayload = (type: BlockType, data: any) => {
  if (type === 'intro') {
    return { type, data: { title: data.title, description: data.description } }
  }
  if (type === 'code') {
    return { type, data: { language: data.language, code: data.code } }
  }
  if (type === 'accordion' || type === 'checklist' || type === 'pitfalls') {
    return { type, data: { items: data.items } }
  }
  if (type === 'resources') {
    const items = data.resourceItems ?? data.items
    return { type, data: { items } }
  }
  return { type, data: { items: data.items } }
}

const addListItem = (items: Array<{ title: string; description: string }>) => {
  items.push({ title: '', description: '' })
}

const removeListItem = (items: Array<{ title: string; description: string }>, index: number) => {
  items.splice(index, 1)
}

const addResource = (items: Array<{ title: string; url: string }>) => {
  items.push({ title: '', url: '' })
}

const removeResource = (items: Array<{ title: string; url: string }>, index: number) => {
  items.splice(index, 1)
}

onMounted(() => {
  void loadBlocks()
})
</script>
