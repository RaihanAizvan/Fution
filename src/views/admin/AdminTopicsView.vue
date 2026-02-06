<template>
  <AdminLayout>
    <template #header>
      <div class="flex items-start justify-between">
        <div>
          <h2 class="text-3xl font-semibold">Topics</h2>
          <div class="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--app-muted)]">
            ADMIN / CONTENT / TOPICS
          </div>
        </div>
      </div>
    </template>

    <section class="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside class="rounded-md bg-[var(--panel-bg)] p-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--app-muted)]">Topics</h3>
          <button
            type="button"
            class="rounded-md bg-[var(--sidebar-active)] px-3 py-1 text-xs text-[var(--app-text)]"
            @click="startCreate"
          >
            + New Topic
          </button>
        </div>
        <div class="mt-4 grid gap-2">
          <button
            v-for="(topic, index) in topics"
            :key="topic.id"
            class="flex items-center justify-between rounded-md px-3 py-2 text-left text-sm text-[var(--app-text)]/70 hover:bg-[var(--sidebar-active)]"
            :class="{ 'bg-[var(--sidebar-active)] text-[var(--app-text)]': topic.id === selectedTopicId }"
            @click="selectTopic(topic)"
            :draggable="true"
            @dragstart="startDrag(index)"
            @dragover.prevent
            @drop="dropDrag(index)"
          >
            <span>{{ topic.title }}</span>
            <span class="rounded-full bg-[var(--app-bg)] px-2 py-0.5 text-[10px] uppercase text-[var(--app-muted)]">
              {{ topic.level }}
            </span>
          </button>
        </div>
      </aside>

      <main class="rounded-md bg-[var(--panel-bg)] p-6">
        <div v-if="!selectedTopic && !isCreating" class="grid place-items-center py-20 text-center">
          <p class="text-lg font-semibold">Select a topic to edit</p>
          <button
            type="button"
            class="mt-4 rounded-md bg-[var(--sidebar-active)] px-4 py-2 text-sm"
            @click="startCreate"
          >
            Create New Topic
          </button>
        </div>

        <div v-else class="grid gap-6">
          <header class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 class="text-2xl font-semibold">{{ editorTitle || 'New Topic' }}</h3>
              <p class="text-sm text-[var(--app-muted)]">/{{ editorSlug || 'slug' }}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <RouterLink
                v-if="selectedTopic"
                :to="`/admin/topics/${selectedTopic.id}/versions?subjectId=${subjectId}`"
                class="rounded-md border border-[var(--sidebar-border)] px-3 py-1 text-xs"
              >
                Manage Versions
              </RouterLink>
              <button
                v-if="selectedTopic"
                type="button"
                class="rounded-md border border-rose-500/30 px-3 py-1 text-xs text-rose-300"
                @click="confirmDelete(selectedTopic)"
              >
                Delete
              </button>
              <button
                v-if="isCreating"
                type="button"
                class="rounded-md border border-[var(--sidebar-border)] px-3 py-1 text-xs"
                @click="createTopic"
              >
                Add Topic
              </button>
              <button
                v-if="isCreating"
                type="button"
                class="rounded-md border border-[var(--sidebar-border)] px-3 py-1 text-xs"
                @click="isCreating = false"
              >
                Cancel
              </button>
            </div>
          </header>

          <div class="grid gap-4">
            <label class="grid gap-1 text-sm">
              Title
              <input v-model="editorTitle" type="text" class="rounded-md bg-[var(--app-bg)] px-3 py-2" @blur="saveEditor" />
            </label>
            <label class="grid gap-1 text-sm">
              Slug
              <input v-model="editorSlug" type="text" class="rounded-md bg-[var(--app-bg)] px-3 py-2" @blur="saveEditor" />
            </label>
            <label class="grid gap-1 text-sm">
              Level
              <select v-model="editorLevel" class="rounded-md bg-[var(--app-bg)] px-3 py-2" @change="saveEditor">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </label>
            <p v-if="saveStatus" class="text-xs text-[var(--app-muted)]">{{ saveStatus }}</p>
          </div>

          <div class="mt-6 border-t border-[var(--sidebar-border)] pt-6">
            <div class="flex items-center justify-between">
              <h4 class="text-lg font-semibold">Versions</h4>
              <button
                type="button"
                class="rounded-md bg-[var(--sidebar-active)] px-3 py-1 text-xs"
                @click="createVersion"
              >
                + New Version
              </button>
            </div>
            <div class="mt-4 grid gap-3">
              <div
                v-for="version in versions"
                :key="version.id"
                class="flex items-center justify-between rounded-md bg-[var(--app-bg)] px-4 py-3"
              >
                <div>
                  <p class="text-sm font-semibold">v{{ version.version }}</p>
                  <p class="text-xs text-[var(--app-muted)]">{{ version.createdAt }}</p>
                </div>
                <div class="flex gap-2">
                  <RouterLink
                    :to="`/admin/topics/${selectedTopic?.id}/versions/${version.id}?subjectId=${subjectId}`"
                    class="rounded-md border border-[var(--sidebar-border)] px-3 py-1 text-xs"
                  >
                    Edit
                  </RouterLink>
                  <button
                    v-if="!version.isPublished"
                    type="button"
                    class="rounded-md border border-[var(--sidebar-border)] px-3 py-1 text-xs"
                    @click="publishVersion(version)"
                  >
                    Publish
                  </button>
                </div>
              </div>
              <p v-if="!versions.length" class="text-xs text-[var(--app-muted)]">No versions yet.</p>
            </div>
          </div>
        </div>
      </main>
    </section>

    <div v-if="confirmingDelete" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6" @click="cancelDelete">
      <div class="w-full max-w-md rounded-md bg-[var(--panel-bg)] p-6" @click.stop>
        <h3 class="text-lg font-semibold">Confirm Delete</h3>
        <p class="mt-2 text-sm text-[var(--app-muted)]">
          Are you sure you want to delete "{{ confirmingDelete.title }}"?
        </p>
        <p class="mt-3 text-sm text-amber-300">This action cannot be undone.</p>
        <div class="mt-4 flex gap-2">
          <button @click="executeDelete" class="rounded-md bg-rose-500 px-4 py-2 text-sm text-white">
            Delete
          </button>
          <button @click="cancelDelete" class="rounded-md border border-[var(--sidebar-border)] px-4 py-2 text-sm">
            Cancel
          </button>
        </div>
        <p v-if="deleteError" class="mt-3 text-sm text-rose-300">{{ deleteError }}</p>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AdminLayout from '../../admin/AdminLayout.vue'
import { getErrorMessage, mapValidationErrors } from '../../admin/api/adminErrors'
import { topicsApi, type TopicRecord } from '../../admin/api/topicsApi'
import { versionsApi, type TopicVersionRecord } from '../../admin/api/versionsApi'

const route = useRoute()
const subjectId = route.params.subjectId as string

const topics = ref([] as Awaited<ReturnType<typeof topicsApi.listBySubject>>)
const versions = ref<TopicVersionRecord[]>([])
const isLoading = ref(false)
const errorMessage = ref('')
const fieldErrors = reactive<{ title?: string[]; slug?: string[]; level?: string[] }>({})

const selectedTopic = ref<TopicRecord | null>(null)
const selectedTopicId = computed(() => selectedTopic.value?.id)
const isCreating = ref(false)
const editorTitle = ref('')
const editorSlug = ref('')
const editorLevel = ref('beginner')
const saveStatus = ref('')

const confirmingDelete = ref<TopicRecord | null>(null)
const deleteError = ref('')
const dragIndex = ref<number | null>(null)

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

const loadVersions = async (topicId: string) => {
  try {
    versions.value = await versionsApi.listByTopic(topicId)
  } catch (error) {
    versions.value = []
  }
}

const resetFormErrors = () => {
  fieldErrors.title = []
  fieldErrors.slug = []
  fieldErrors.level = []
}

const startCreate = () => {
  isCreating.value = true
  selectedTopic.value = null
  editorTitle.value = ''
  editorSlug.value = ''
  editorLevel.value = 'beginner'
  saveStatus.value = ''
  versions.value = []
}

const selectTopic = async (topic: TopicRecord) => {
  selectedTopic.value = topic
  isCreating.value = false
  editorTitle.value = topic.title
  editorSlug.value = topic.slug
  editorLevel.value = topic.level
  saveStatus.value = ''
  await loadVersions(topic.id)
}

const createTopic = async () => {
  resetFormErrors()
  errorMessage.value = ''

  try {
    const created = await topicsApi.create(subjectId, {
      title: editorTitle.value,
      slug: editorSlug.value,
      level: editorLevel.value
    })
    topics.value.push(created)
    isCreating.value = false
    await selectTopic(created)
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
    const validation = mapValidationErrors(error)
    fieldErrors.title = validation['title'] ?? []
    fieldErrors.slug = validation['slug'] ?? []
    fieldErrors.level = validation['level'] ?? []
  }
}

const saveEditor = async () => {
  if (!selectedTopic.value) return

  saveStatus.value = 'Saving…'
  try {
    const updated = await topicsApi.update(subjectId, selectedTopic.value.id, {
      title: editorTitle.value,
      slug: editorSlug.value,
      level: editorLevel.value
    })
    topics.value = topics.value.map(topic => (topic.id === updated.id ? updated : topic))
    selectedTopic.value = updated
    saveStatus.value = 'Saved'
  } catch (error) {
    saveStatus.value = 'Failed to save'
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
    if (selectedTopic.value?.id === confirmingDelete.value.id) {
      selectedTopic.value = null
      versions.value = []
    }
    confirmingDelete.value = null
  } catch (error) {
    deleteError.value = getErrorMessage(error)
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

  const updated = [...topics.value]
  const [moved] = updated.splice(dragIndex.value, 1)
  updated.splice(index, 0, moved)
  topics.value = updated
  dragIndex.value = null

  try {
    await topicsApi.reorder(
      subjectId,
      topics.value.map((topic, orderIndex) => ({
        topicId: topic.id,
        orderIndex: orderIndex + 1
      }))
    )
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  }
}

const createVersion = async () => {
  if (!selectedTopic.value) return
  try {
    const nextVersion = versions.value.length
      ? Math.max(...versions.value.map(entry => entry.version)) + 1
      : 1
    const created = await versionsApi.createDraft(selectedTopic.value.id, nextVersion)
    versions.value.unshift(created)
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  }
}

const publishVersion = async (version: TopicVersionRecord) => {
  try {
    const updated = await versionsApi.publish(version.topicId, version.id)
    versions.value = versions.value.map(entry => (entry.id === updated.id ? updated : entry))
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  }
}

onMounted(() => {
  void loadTopics()
})
</script>
