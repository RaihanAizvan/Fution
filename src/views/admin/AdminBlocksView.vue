<template>
  <AdminLayout>
    <template #header>
      <div class="flex items-start justify-between">
        <div>
          <h2 class="text-3xl font-semibold">Blocks</h2>
          <div class="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--app-muted)]">
            ADMIN / CONTENT / BLOCKS
          </div>
        </div>
      </div>
    </template>

    <section class="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside class="rounded-md bg-[var(--panel-bg)] p-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--app-muted)]">Blocks</h3>
          <button
            type="button"
            class="rounded-md bg-[var(--sidebar-active)] px-3 py-1 text-xs text-[var(--app-text)]"
            @click="startCreate"
          >
            + New Block
          </button>
        </div>
        <div class="mt-4 grid gap-2">
          <button
            v-for="(block, index) in blocks"
            :key="block.id"
            class="flex items-center justify-between rounded-md px-3 py-2 text-left text-sm text-[var(--app-text)]/70 hover:bg-[var(--sidebar-active)]"
            :class="{ 'bg-[var(--sidebar-active)] text-[var(--app-text)]': block.id === selectedBlockId }"
            :draggable="true"
            @dragstart="startDrag(index)"
            @dragover.prevent
            @drop="dropDrag(index)"
            @click="selectBlock(block)"
          >
            <span class="capitalize">{{ block.type }}</span>
            <span class="text-xs text-[var(--app-muted)]">#{{ index + 1 }}</span>
          </button>
        </div>
      </aside>

      <main class="rounded-md bg-[var(--panel-bg)] p-6">
        <div v-if="!selectedBlock && !isCreating" class="grid place-items-center py-20 text-center">
          <p class="text-lg font-semibold">Select a block to edit</p>
          <button
            type="button"
            class="mt-4 rounded-md bg-[var(--sidebar-active)] px-4 py-2 text-sm"
            @click="startCreate"
          >
            Create New Block
          </button>
        </div>

        <div v-else class="grid gap-6">
          <header class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 class="text-2xl font-semibold capitalize">{{ currentType }}</h3>
              <p class="text-sm text-[var(--app-muted)]">Edit block content and preview below.</p>
            </div>
            <div class="flex gap-2">
              <button
                v-if="isCreating"
                type="button"
                class="rounded-md border border-[var(--sidebar-border)] px-3 py-1 text-xs"
                @click="createBlock"
              >
                Add Block
              </button>
              <button
                v-if="isCreating"
                type="button"
                class="rounded-md border border-[var(--sidebar-border)] px-3 py-1 text-xs"
                @click="cancelCreate"
              >
                Cancel
              </button>
              <button
                v-if="selectedBlock"
                type="button"
                class="rounded-md border border-rose-500/30 px-3 py-1 text-xs text-rose-300"
                @click="deleteBlock(selectedBlock.id)"
              >
                Delete
              </button>
            </div>
          </header>

          <form class="grid gap-4" @submit.prevent="selectedBlock ? updateBlock(selectedBlock) : createBlock()">
            <label class="grid gap-1 text-sm">
              Type
              <select v-model="currentType" class="rounded-md bg-[var(--app-bg)] px-3 py-2">
                <option value="intro">Intro</option>
                <option value="code">Code</option>
                <option value="accordion">Accordion</option>
                <option value="checklist">Checklist</option>
                <option value="pitfalls">Pitfalls</option>
                <option value="resources">Resources</option>
              </select>
            </label>

            <div v-if="currentType === 'intro'" class="grid gap-3">
              <input v-model="currentData.title" type="text" class="rounded-md bg-[var(--app-bg)] px-3 py-2" placeholder="Title" />
              <textarea v-model="currentData.description" class="rounded-md bg-[var(--app-bg)] px-3 py-2" placeholder="Description" />
            </div>

            <div v-else-if="currentType === 'code'" class="grid gap-3">
              <input v-model="currentData.language" type="text" class="rounded-md bg-[var(--app-bg)] px-3 py-2" placeholder="Language" />
              <textarea v-model="currentData.code" class="rounded-md bg-[var(--app-bg)] px-3 py-2" placeholder="Code" />
            </div>

            <div v-else-if="['accordion', 'checklist', 'pitfalls'].includes(currentType)" class="grid gap-4">
              <div v-for="(item, index) in currentData.items" :key="index" class="grid gap-3 rounded-md bg-[var(--app-bg)] p-4">
                <input v-model="item.title" type="text" class="rounded-md bg-[var(--panel-bg)] px-3 py-2" placeholder="Title" />
                <textarea v-model="item.description" class="rounded-md bg-[var(--panel-bg)] px-3 py-2" placeholder="Description" />
                <button type="button" class="w-fit rounded-md border border-[var(--sidebar-border)] px-3 py-1 text-xs" @click="removeListItem(currentData.items, index)">
                  Remove item
                </button>
              </div>
              <button type="button" class="w-fit rounded-md bg-[var(--sidebar-active)] px-3 py-1 text-xs" @click="addListItem(currentData.items)">
                Add item
              </button>
            </div>

            <div v-else-if="currentType === 'resources'" class="grid gap-4">
              <div v-for="(item, index) in currentData.resourceItems" :key="index" class="grid gap-3 rounded-md bg-[var(--app-bg)] p-4">
                <input v-model="item.title" type="text" class="rounded-md bg-[var(--panel-bg)] px-3 py-2" placeholder="Title" />
                <input v-model="item.url" type="text" class="rounded-md bg-[var(--panel-bg)] px-3 py-2" placeholder="URL" />
                <button type="button" class="w-fit rounded-md border border-[var(--sidebar-border)] px-3 py-1 text-xs" @click="removeResource(currentData.resourceItems, index)">
                  Remove resource
                </button>
              </div>
              <button type="button" class="w-fit rounded-md bg-[var(--sidebar-active)] px-3 py-1 text-xs" @click="addResource(currentData.resourceItems)">
                Add resource
              </button>
            </div>
            <p v-for="message in formErrors" :key="message" class="text-xs text-rose-300">
              {{ message }}
            </p>
            <button v-if="selectedBlock" type="submit" class="w-fit rounded-md bg-[var(--sidebar-active)] px-4 py-2 text-sm">
              Save Changes
            </button>
          </form>

          <div class="mt-6 border-t border-[var(--sidebar-border)] pt-6">
            <h4 class="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--app-muted)]">Preview</h4>
            <div class="mt-4">
              <BlockRenderer :block="previewBlock" :isLoading="false" />
            </div>
          </div>
        </div>
      </main>
    </section>
  </AdminLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import AdminLayout from '../../admin/AdminLayout.vue'
import BlockRenderer from '../../features/subjects/components/BlockRenderer.vue'
import { getErrorMessage } from '../../admin/api/adminErrors'
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

const selectedBlock = ref<EditableBlock | null>(null)
const isCreating = ref(false)
const dragIndex = ref<number | null>(null)

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

const currentType = computed({
  get: () => (selectedBlock.value ? selectedBlock.value.type : newBlock.type),
  set: (value: BlockType) => {
    if (selectedBlock.value) {
      selectedBlock.value.type = value
    } else {
      newBlock.type = value
    }
  }
})

const currentData = computed(() => (selectedBlock.value ? selectedBlock.value.data : newBlock.data))

const formErrors = computed(() => {
  if (selectedBlock.value) {
    return updateErrors[selectedBlock.value.id] ?? []
  }
  return createErrors.value
})

const previewBlock = computed(() => {
  const data = currentData.value
  if (currentType.value === 'intro') {
    return { type: 'intro', data: { title: data.title, description: data.description } }
  }
  if (currentType.value === 'code') {
    return { type: 'code', data: { language: data.language, code: data.code } }
  }
  if (currentType.value === 'resources') {
    return { type: 'resources', data: { items: data.resourceItems } }
  }
  return { type: currentType.value, data: { items: data.items } }
})

const selectedBlockId = computed(() => selectedBlock.value?.id)

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
  if (block.type === 'resources') {
    return {
      ...base,
      resourceItems: (block.data as any).items ?? [{ title: '', url: '' }]
    }
  }
  return {
    ...base,
    items: (block.data as any).items ?? [{ title: '', description: '' }]
  }
}

const buildPayload = (type: BlockType, data: BlockFormData) => {
  if (type === 'resources') {
    return { type, data: { items: data.resourceItems } }
  }
  if (type === 'intro') {
    return { type, data: { title: data.title, description: data.description } }
  }
  if (type === 'code') {
    return { type, data: { language: data.language, code: data.code } }
  }
  return { type, data: { items: data.items } }
}

const startCreate = () => {
  isCreating.value = true
  selectedBlock.value = null
}

const cancelCreate = () => {
  isCreating.value = false
}

const selectBlock = (block: EditableBlock) => {
  selectedBlock.value = block
  isCreating.value = false
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
    isCreating.value = false
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  }
}

const updateBlock = async (block: EditableBlock) => {
  errorMessage.value = ''

  try {
    const payload = buildPayload(block.type, block.data)
    const updated = await blocksApi.update(topicId, versionId, block.id, payload)
    blocks.value = blocks.value.map(entry =>
      entry.id === updated.id ? { ...updated, data: normalizeBlockData(updated) } : entry
    )
  } catch (error) {
    updateErrors[block.id] = [getErrorMessage(error)]
  }
}

const deleteBlock = async (blockId: string) => {
  try {
    await blocksApi.remove(topicId, versionId, blockId)
    blocks.value = blocks.value.filter(block => block.id !== blockId)
    if (selectedBlock.value?.id === blockId) {
      selectedBlock.value = null
    }
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  }
}

const startDrag = (index: number) => {
  dragIndex.value = index
}

const dropDrag = async (index: number) => {
  if (dragIndex.value === null || dragIndex.value === index) {
    dragIndex.value = null
    return
  }

  const updated = [...blocks.value]
  const [moved] = updated.splice(dragIndex.value, 1)
  updated.splice(index, 0, moved)
  blocks.value = updated
  dragIndex.value = null

  try {
    await blocksApi.reorder(
      topicId,
      versionId,
      blocks.value.map((block, orderIndex) => ({
        blockId: block.id,
        orderIndex: orderIndex + 1
      }))
    )
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  }
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
