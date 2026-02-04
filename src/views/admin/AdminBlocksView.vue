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
        <div v-else-if="newBlock.type === 'accordion'">
          <div v-for="(item, index) in newBlock.data.items" :key="index">
            <label>
              Item Title
              <input v-model="item.title" type="text" />
            </label>
            <label>
              Item Content
              <textarea v-model="item.content" />
            </label>
            <button type="button" @click="removeAccordionItem(newBlock.data.items, index)">
              Remove item
            </button>
          </div>
          <button type="button" @click="addAccordionItem(newBlock.data.items)">
            Add item
          </button>
        </div>
        <div v-else-if="newBlock.type === 'checklist' || newBlock.type === 'pitfalls'">
          <div v-for="(item, index) in newBlock.data.items" :key="index">
            <input v-model="newBlock.data.items[index]" type="text" />
            <button type="button" @click="removeStringItem(newBlock.data.items, index)">
              Remove
            </button>
          </div>
          <button type="button" @click="addStringItem(newBlock.data.items)">
            Add item
          </button>
        </div>
        <div v-else-if="newBlock.type === 'resources'">
          <div v-for="(link, index) in newBlock.data.links" :key="index">
            <label>
              Label
              <input v-model="link.label" type="text" />
            </label>
            <label>
              URL
            	<input v-model="link.url" type="text" />
            </label>
            <button type="button" @click="removeResource(newBlock.data.links, index)">
              Remove link
            </button>
          </div>
          <button type="button" @click="addResource(newBlock.data.links)">
            Add link
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
            <div v-else-if="block.type === 'accordion'">
              <div v-for="(item, itemIndex) in block.data.items" :key="itemIndex">
                <input v-model="item.title" type="text" />
                <textarea v-model="item.content" />
                <button type="button" @click="removeAccordionItem(block.data.items, itemIndex)">
                  Remove item
                </button>
              </div>
              <button type="button" @click="addAccordionItem(block.data.items)">
                Add item
              </button>
            </div>
            <div v-else-if="block.type === 'checklist' || block.type === 'pitfalls'">
              <div v-for="(item, itemIndex) in block.data.items" :key="itemIndex">
                <input v-model="block.data.items[itemIndex]" type="text" />
                <button type="button" @click="removeStringItem(block.data.items, itemIndex)">
                  Remove
                </button>
              </div>
              <button type="button" @click="addStringItem(block.data.items)">
                Add item
              </button>
            </div>
            <div v-else-if="block.type === 'resources'">
              <div v-for="(link, linkIndex) in block.data.links" :key="linkIndex">
                <input v-model="link.label" type="text" />
                <input v-model="link.url" type="text" />
                <button type="button" @click="removeResource(block.data.links, linkIndex)">
                  Remove link
                </button>
              </div>
              <button type="button" @click="addResource(block.data.links)">
                Add link
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
    items: [{ title: '', content: '' }],
    links: [{ label: '', url: '' }]
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
  if (block.type === 'accordion') {
    return {
      items: (block.data as any).items ?? [{ title: '', content: '' }]
    }
  }
  if (block.type === 'resources') {
    return {
      links: (block.data as any).links ?? [{ label: '', url: '' }]
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
    blocks.value.map((block) => block.id)
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
  if (type === 'accordion') {
    return { type, data: { items: data.items } }
  }
  if (type === 'resources') {
    return { type, data: { links: data.links } }
  }
  return { type, data: { items: data.items } }
}

const addAccordionItem = (items: Array<{ title: string; content: string }>) => {
  items.push({ title: '', content: '' })
}

const removeAccordionItem = (items: Array<{ title: string; content: string }>, index: number) => {
  items.splice(index, 1)
}

const addStringItem = (items: string[]) => {
  items.push('')
}

const removeStringItem = (items: string[], index: number) => {
  items.splice(index, 1)
}

const addResource = (links: Array<{ label: string; url: string }>) => {
  links.push({ label: '', url: '' })
}

const removeResource = (links: Array<{ label: string; url: string }>, index: number) => {
  links.splice(index, 1)
}

onMounted(() => {
  void loadBlocks()
})
</script>
