<template>
  <AdminLayout>
    <section class="grid gap-6">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Admin</p>
          <h2 class="text-2xl font-semibold">Blocks</h2>
        </div>
        <RouterLink
          :to="`/admin/topics/${topicId}/versions?subjectId=${subjectId}`"
          class="rounded-full border border-[var(--sidebar-active)] px-4 py-2 text-sm"
        >
          Back to versions
        </RouterLink>
      </header>

      <form class="grid gap-4 rounded-2xl bg-[var(--panel-bg)] p-6" @submit.prevent="createBlock">
        <h3 class="text-lg font-semibold">Add block</h3>
        <label class="grid gap-1 text-sm">
          Type
          <select v-model="newBlock.type" class="rounded-xl bg-[var(--app-bg)] px-3 py-2">
            <option value="intro">Intro</option>
            <option value="code">Code</option>
            <option value="accordion">Accordion</option>
            <option value="checklist">Checklist</option>
            <option value="pitfalls">Pitfalls</option>
            <option value="resources">Resources</option>
          </select>
        </label>
        <div v-if="newBlock.type === 'intro'" class="grid gap-3">
          <label class="grid gap-1 text-sm">
            Title
            <input v-model="newBlock.data.title" type="text" class="rounded-xl bg-[var(--app-bg)] px-3 py-2" />
          </label>
          <label class="grid gap-1 text-sm">
            Description
            <textarea v-model="newBlock.data.description" class="rounded-xl bg-[var(--app-bg)] px-3 py-2" />
          </label>
        </div>
        <div v-else-if="newBlock.type === 'code'" class="grid gap-3">
          <label class="grid gap-1 text-sm">
            Language
            <input v-model="newBlock.data.language" type="text" class="rounded-xl bg-[var(--app-bg)] px-3 py-2" />
          </label>
          <label class="grid gap-1 text-sm">
            Code
            <textarea v-model="newBlock.data.code" class="rounded-xl bg-[var(--app-bg)] px-3 py-2" />
          </label>
        </div>
        <div v-else-if="['accordion', 'checklist', 'pitfalls'].includes(newBlock.type)" class="grid gap-4">
          <div v-for="(item, index) in newBlock.data.items" :key="index" class="grid gap-3 rounded-xl bg-[var(--app-bg)] p-4">
            <label class="grid gap-1 text-sm">
              Title
              <input v-model="item.title" type="text" class="rounded-xl bg-[var(--panel-bg)] px-3 py-2" />
            </label>
            <label class="grid gap-1 text-sm">
              Description
              <textarea v-model="item.description" class="rounded-xl bg-[var(--panel-bg)] px-3 py-2" />
            </label>
            <button type="button" class="w-fit rounded-full border border-[var(--sidebar-active)] px-3 py-1 text-xs" @click="removeListItem(newBlock.data.items, index)">
              Remove item
            </button>
          </div>
          <button type="button" class="w-fit rounded-full bg-[var(--sidebar-active)] px-3 py-1 text-xs" @click="addListItem(newBlock.data.items)">
            Add item
          </button>
        </div>
        <div v-else-if="newBlock.type === 'resources'" class="grid gap-4">
          <div v-for="(item, index) in newBlock.data.resourceItems" :key="index" class="grid gap-3 rounded-xl bg-[var(--app-bg)] p-4">
            <label class="grid gap-1 text-sm">
              Title
              <input v-model="item.title" type="text" class="rounded-xl bg-[var(--panel-bg)] px-3 py-2" />
            </label>
            <label class="grid gap-1 text-sm">
              URL
              <input v-model="item.url" type="text" class="rounded-xl bg-[var(--panel-bg)] px-3 py-2" />
            </label>
            <button type="button" class="w-fit rounded-full border border-[var(--sidebar-active)] px-3 py-1 text-xs" @click="removeResource(newBlock.data.resourceItems, index)">
              Remove resource
            </button>
          </div>
          <button type="button" class="w-fit rounded-full bg-[var(--sidebar-active)] px-3 py-1 text-xs" @click="addResource(newBlock.data.resourceItems)">
            Add resource
          </button>
        </div>
        <p v-for="message in createErrors" :key="message" class="text-sm text-rose-300">{{ message }}</p>
        <button type="submit" class="w-fit rounded-full bg-[var(--sidebar-active)] px-4 py-2 text-sm">Create block</button>
      </form>

      <div class="grid gap-4 rounded-2xl bg-[var(--panel-bg)] p-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Blocks list</h3>
          <span v-if="isLoading" class="text-sm text-[var(--app-muted)]">Loading…</span>
        </div>
        <p v-if="errorMessage" class="text-sm text-rose-300">{{ errorMessage }}</p>
        <ul v-else class="grid gap-3">
          <li v-for="(block, index) in blocks" :key="block.id" class="rounded-2xl bg-[var(--app-bg)] p-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <strong class="text-sm uppercase tracking-[0.2em] text-[var(--app-muted)]">{{ block.type }}</strong>
              <div class="flex gap-2">
                <button type="button" class="rounded-full bg-[var(--sidebar-active)] px-3 py-1 text-xs" @click="moveBlock(index, -1)">Up</button>
                <button type="button" class="rounded-full bg-[var(--sidebar-active)] px-3 py-1 text-xs" @click="moveBlock(index, 1)">Down</button>
              </div>
            </div>
            <form class="mt-4 grid gap-3" @submit.prevent="updateBlock(block)">
              <div v-if="block.type === 'intro'" class="grid gap-3">
                <input v-model="block.data.title" type="text" class="rounded-xl bg-[var(--panel-bg)] px-3 py-2" />
                <textarea v-model="block.data.description" class="rounded-xl bg-[var(--panel-bg)] px-3 py-2" />
              </div>
              <div v-else-if="block.type === 'code'" class="grid gap-3">
                <input v-model="block.data.language" type="text" class="rounded-xl bg-[var(--panel-bg)] px-3 py-2" />
                <textarea v-model="block.data.code" class="rounded-xl bg-[var(--panel-bg)] px-3 py-2" />
              </div>
              <div v-else-if="['accordion', 'checklist', 'pitfalls'].includes(block.type)" class="grid gap-3">
                <div v-for="(item, itemIndex) in block.data.items" :key="itemIndex" class="grid gap-3 rounded-xl bg-[var(--panel-bg)] p-4">
                  <input v-model="item.title" type="text" class="rounded-xl bg-[var(--app-bg)] px-3 py-2" />
                  <textarea v-model="item.description" class="rounded-xl bg-[var(--app-bg)] px-3 py-2" />
                  <button type="button" class="w-fit rounded-full border border-[var(--sidebar-active)] px-3 py-1 text-xs" @click="removeListItem(block.data.items, itemIndex)">
                    Remove item
                  </button>
                </div>
                <button type="button" class="w-fit rounded-full bg-[var(--sidebar-active)] px-3 py-1 text-xs" @click="addListItem(block.data.items)">
                  Add item
                </button>
              </div>
              <div v-else-if="block.type === 'resources'" class="grid gap-3">
                <div v-for="(item, itemIndex) in block.data.resourceItems" :key="itemIndex" class="grid gap-3 rounded-xl bg-[var(--panel-bg)] p-4">
                  <input v-model="item.title" type="text" class="rounded-xl bg-[var(--app-bg)] px-3 py-2" />
                  <input v-model="item.url" type="text" class="rounded-xl bg-[var(--app-bg)] px-3 py-2" />
                  <button type="button" class="w-fit rounded-full border border-[var(--sidebar-active)] px-3 py-1 text-xs" @click="removeResource(block.data.resourceItems, itemIndex)">
                    Remove resource
                  </button>
                </div>
                <button type="button" class="w-fit rounded-full bg-[var(--sidebar-active)] px-3 py-1 text-xs" @click="addResource(block.data.resourceItems)">
                  Add resource
                </button>
              </div>
              <p v-for="message in updateErrors[block.id] ?? []" :key="message" class="text-xs text-rose-300">
                {{ message }}
              </p>
              <div class="flex flex-wrap gap-2">
                <button type="submit" class="rounded-full bg-[var(--sidebar-active)] px-3 py-1 text-xs">Save</button>
                <button type="button" class="rounded-full border border-rose-400 px-3 py-1 text-xs text-rose-200" @click="deleteBlock(block.id)">
                  Delete
                </button>
              </div>
            </form>
          </li>
        </ul>
      </div>
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

type ListItem = { title: string; description: string }

type ResourceItem = { title: string; url: string }

type BlockFormData = {
  title: string
  description: string
  language: string
  code: string
  items: ListItem[]
  resourceItems: ResourceItem[]
}

type EditableBlock = BlockRecord & { data: BlockFormData }

const blocks = ref<EditableBlock[]>([])
const isLoading = ref(false)
const errorMessage = ref('')
const createErrors = ref<string[]>([])
const updateErrors = reactive<Record<string, string[]>>({})

const newBlock = reactive<{ type: BlockType; data: BlockFormData }>({
  type: 'intro',
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

const normalizeBlockData = (block: BlockRecord): BlockFormData => {
  const base: BlockFormData = {
    title: '',
    description: '',
    language: '',
    code: '',
    items: [{ title: '', description: '' }],
    resourceItems: [{ title: '', url: '' }]
  }

  if (block.type === 'intro') {
    return {
      ...base,
      title: (block.data as any).title ?? '',
      description: (block.data as any).description ?? ''
    }
  }
  if (block.type === 'code') {
    return {
      ...base,
      language: (block.data as any).language ?? '',
      code: (block.data as any).code ?? ''
    }
  }
  if (block.type === 'accordion' || block.type === 'checklist' || block.type === 'pitfalls') {
    return {
      ...base,
      items: (block.data as any).items ?? [{ title: '', description: '' }]
    }
  }
  if (block.type === 'resources') {
    return {
      ...base,
      resourceItems: (block.data as any).items ?? [{ title: '', url: '' }]
    }
  }
  return base
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

const updateBlock = async (block: EditableBlock) => {
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

const buildPayload = (type: BlockType, data: BlockFormData) => {
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
