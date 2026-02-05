<template>
  <AdminLayout>
    <section class="grid gap-6">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Admin</p>
          <h2 class="text-2xl font-semibold">Topics</h2>
        </div>
        <RouterLink
          to="/admin/subjects"
          class="rounded-full border border-[var(--sidebar-active)] px-4 py-2 text-sm"
        >
          Back to Subjects
        </RouterLink>
      </header>

      <div class="grid gap-6 rounded-2xl bg-[var(--panel-bg)] p-6">
        <h3 class="text-lg font-semibold">Add new topic</h3>
        <form class="grid gap-4" @submit.prevent="createTopic">
          <label class="grid gap-1 text-sm">
            Title
            <input v-model="newTopic.title" type="text" required class="rounded-xl bg-[var(--app-bg)] px-3 py-2" />
            <span v-for="error in fieldErrors.title" :key="error" class="text-xs text-rose-300">
              {{ error }}
            </span>
          </label>
          <label class="grid gap-1 text-sm">
            Slug
            <input v-model="newTopic.slug" type="text" required class="rounded-xl bg-[var(--app-bg)] px-3 py-2" />
            <span v-for="error in fieldErrors.slug" :key="error" class="text-xs text-rose-300">
              {{ error }}
            </span>
          </label>
          <label class="grid gap-1 text-sm">
            Level
            <select v-model="newTopic.level" required class="rounded-xl bg-[var(--app-bg)] px-3 py-2">
              <option value="">Select a level...</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <span v-for="error in fieldErrors.level" :key="error" class="text-xs text-rose-300">
              {{ error }}
            </span>
          </label>
          <button type="submit" class="w-fit rounded-full bg-[var(--sidebar-active)] px-4 py-2 text-sm">Create topic</button>
        </form>
      </div>

      <div class="grid gap-4 rounded-2xl bg-[var(--panel-bg)] p-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h3 class="text-lg font-semibold">All topics</h3>
          <div class="flex items-center gap-2">
            <button
              v-if="!isReordering && topics.length > 1"
              @click="startReorder"
              class="rounded-full border border-[var(--sidebar-active)] px-3 py-1 text-xs"
            >
              Reorder Topics
            </button>
            <div v-if="isReordering" class="flex gap-2">
              <button @click="saveReorder" class="rounded-full bg-[var(--sidebar-active)] px-3 py-1 text-xs">
                Save Order
              </button>
              <button @click="cancelReorder" class="rounded-full border border-[var(--sidebar-active)] px-3 py-1 text-xs">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <p v-if="isLoading" class="text-sm text-[var(--app-muted)]">Loading topics…</p>
        <p v-else-if="errorMessage" class="text-sm text-rose-300">{{ errorMessage }}</p>
        <ul v-else class="grid gap-3">
          <li v-for="(topic, index) in topics" :key="topic.id" class="rounded-2xl bg-[var(--app-bg)] p-4">
            <div v-if="editingId !== topic.id" class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p class="text-sm font-semibold">{{ topic.title }}</p>
                <p class="text-xs text-[var(--app-muted)]">{{ topic.slug }}</p>
                <span class="mt-2 inline-flex rounded-full bg-[var(--sidebar-active)] px-3 py-1 text-xs">
                  {{ topic.level }}
                </span>
              </div>
              <div class="flex flex-wrap gap-2">
                <div v-if="isReordering" class="flex gap-1">
                  <button
                    @click="moveUp(index)"
                    :disabled="index === 0"
                    class="rounded-full bg-[var(--sidebar-active)] px-3 py-1 text-xs disabled:opacity-50"
                  >
                    ↑
                  </button>
                  <button
                    @click="moveDown(index)"
                    :disabled="index === topics.length - 1"
                    class="rounded-full bg-[var(--sidebar-active)] px-3 py-1 text-xs disabled:opacity-50"
                  >
                    ↓
                  </button>
                </div>
                <template v-else>
                  <RouterLink
                    :to="`/admin/topics/${topic.id}/versions?subjectId=${subjectId}`"
                    class="rounded-full bg-[var(--sidebar-active)] px-3 py-1 text-xs"
                  >
                    Manage Versions
                  </RouterLink>
                  <button @click="startEdit(topic)" class="rounded-full border border-[var(--sidebar-active)] px-3 py-1 text-xs">
                    Edit
                  </button>
                  <button @click="confirmDelete(topic)" class="rounded-full border border-rose-400 px-3 py-1 text-xs text-rose-200">
                    Delete
                  </button>
                </template>
              </div>
            </div>

            <form v-else class="grid gap-3" @submit.prevent="saveEdit(topic)">
              <label class="grid gap-1 text-sm">
                Title
                <input v-model="topic.title" type="text" required class="rounded-xl bg-[var(--panel-bg)] px-3 py-2" />
              </label>
              <label class="grid gap-1 text-sm">
                Slug
                <input v-model="topic.slug" type="text" required class="rounded-xl bg-[var(--panel-bg)] px-3 py-2" />
              </label>
              <label class="grid gap-1 text-sm">
                Level
                <select v-model="topic.level" required class="rounded-xl bg-[var(--panel-bg)] px-3 py-2">
                  <option value="">Select a level...</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </label>
              <div class="flex flex-wrap gap-2">
                <button type="submit" class="rounded-full bg-[var(--sidebar-active)] px-3 py-1 text-xs">Save</button>
                <button type="button" @click="cancelEdit" class="rounded-full border border-[var(--sidebar-active)] px-3 py-1 text-xs">
                  Cancel
                </button>
              </div>
              <p v-if="editError" class="text-xs text-rose-300">{{ editError }}</p>
            </form>
          </li>
        </ul>
      </div>
    </section>

    <div v-if="confirmingDelete" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" @click="cancelDelete">
      <div class="w-full max-w-md rounded-2xl bg-[var(--panel-bg)] p-6" @click.stop>
        <h3 class="text-lg font-semibold">Confirm Delete</h3>
        <p class="mt-2 text-sm text-[var(--app-muted)]">
          Are you sure you want to delete "{{ confirmingDelete.title }}"?
        </p>
        <p class="mt-3 text-sm text-amber-300">This action cannot be undone.</p>
        <div class="mt-4 flex gap-2">
          <button @click="executeDelete" class="rounded-full bg-rose-500 px-4 py-2 text-sm">
            Delete
          </button>
          <button @click="cancelDelete" class="rounded-full border border-[var(--sidebar-active)] px-4 py-2 text-sm">
            Cancel
          </button>
        </div>
        <p v-if="deleteError" class="mt-3 text-sm text-rose-300">{{ deleteError }}</p>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AdminLayout from '../../admin/AdminLayout.vue'
import { getErrorMessage, mapValidationErrors } from '../../admin/api/adminErrors'
import { topicsApi, type TopicRecord } from '../../admin/api/topicsApi'

const route = useRoute()
const subjectId = route.params.subjectId as string

const topics = ref([] as Awaited<ReturnType<typeof topicsApi.listBySubject>>)
const isLoading = ref(false)
const errorMessage = ref('')
const fieldErrors = reactive<{ title?: string[]; slug?: string[]; level?: string[] }>({})
const newTopic = reactive({ title: '', slug: '', level: '' })

const editingId = ref<string | null>(null)
const editingOriginal = ref<TopicRecord | null>(null)
const editError = ref('')

const confirmingDelete = ref<TopicRecord | null>(null)
const deleteError = ref('')

const isReordering = ref(false)
const originalOrder = ref<TopicRecord[]>([])

const loadTopics = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    topics.value = await topicsApi.listBySubject(subjectId)
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    isLoading.value = false
  }
}

const resetFormErrors = () => {
  fieldErrors.title = []
  fieldErrors.slug = []
  fieldErrors.level = []
}

const createTopic = async () => {
  resetFormErrors()
  errorMessage.value = ''

  try {
    const created = await topicsApi.create(subjectId, { ...newTopic })
    topics.value.push(created)
    newTopic.title = ''
    newTopic.slug = ''
    newTopic.level = ''
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
    const validation = mapValidationErrors(error)
    fieldErrors.title = validation['title'] ?? []
    fieldErrors.slug = validation['slug'] ?? []
    fieldErrors.level = validation['level'] ?? []
  }
}

const startEdit = (topic: TopicRecord) => {
  editingId.value = topic.id
  editingOriginal.value = { ...topic }
  editError.value = ''
}

const cancelEdit = () => {
  if (editingOriginal.value) {
    const index = topics.value.findIndex(t => t.id === editingId.value)
    if (index !== -1) {
      topics.value[index] = editingOriginal.value
    }
  }
  editingId.value = null
  editingOriginal.value = null
  editError.value = ''
}

const saveEdit = async (topic: TopicRecord) => {
  editError.value = ''

  try {
    await topicsApi.update(subjectId, topic.id, {
      title: topic.title,
      slug: topic.slug,
      level: topic.level
    })
    editingId.value = null
    editingOriginal.value = null
  } catch (error) {
    editError.value = getErrorMessage(error)
  }
}

const confirmDelete = (topic: TopicRecord) => {
  confirmingDelete.value = topic
  deleteError.value = ''
}

const cancelDelete = () => {
  confirmingDelete.value = null
  deleteError.value = ''
}

const executeDelete = async () => {
  if (!confirmingDelete.value) return
  
  deleteError.value = ''

  try {
    await topicsApi.delete(subjectId, confirmingDelete.value.id)
    topics.value = topics.value.filter(t => t.id !== confirmingDelete.value!.id)
    confirmingDelete.value = null
  } catch (error) {
    deleteError.value = getErrorMessage(error)
  }
}

const startReorder = () => {
  originalOrder.value = [...topics.value]
  isReordering.value = true
}

const cancelReorder = () => {
  topics.value = [...originalOrder.value]
  isReordering.value = false
  originalOrder.value = []
}

const moveUp = (index: number) => {
  if (index === 0) return
  const temp = topics.value[index]
  topics.value[index] = topics.value[index - 1]
  topics.value[index - 1] = temp
}

const moveDown = (index: number) => {
  if (index === topics.value.length - 1) return
  const temp = topics.value[index]
  topics.value[index] = topics.value[index + 1]
  topics.value[index + 1] = temp
}

const saveReorder = async () => {
  errorMessage.value = ''

  try {
    const ordered = topics.value.map((topic, index) => ({
      topicId: topic.id,
      orderIndex: index + 1
    }))
    await topicsApi.reorder(subjectId, ordered)
    isReordering.value = false
    originalOrder.value = []
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  }
}

onMounted(() => {
  void loadTopics()
})
</script>
