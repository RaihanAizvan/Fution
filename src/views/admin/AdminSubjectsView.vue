<template>
  <AdminLayout>
    <section class="grid gap-6">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Admin</p>
          <h2 class="text-2xl font-semibold">Subjects</h2>
        </div>
        <button
          type="button"
          class="rounded-full bg-[var(--sidebar-active)] px-4 py-2 text-sm text-[var(--app-text)]"
          @click="toggleImport"
        >
          {{ showImport ? 'Close JSON Upload' : 'Upload JSON' }}
        </button>
      </header>

      <div class="grid gap-6 rounded-2xl bg-[var(--panel-bg)] p-6">
        <h3 class="text-lg font-semibold">Add new subject</h3>
        <form class="grid gap-4" @submit.prevent="createSubject">
          <label class="grid gap-1 text-sm">
            Title
            <input
              v-model="newSubject.title"
              type="text"
              required
              class="rounded-xl bg-[var(--app-bg)] px-3 py-2 text-[var(--app-text)]"
            />
            <span v-for="error in fieldErrors.title" :key="error" class="text-xs text-rose-300">
              {{ error }}
            </span>
          </label>
          <label class="grid gap-1 text-sm">
            Slug
            <input
              v-model="newSubject.slug"
              type="text"
              required
              class="rounded-xl bg-[var(--app-bg)] px-3 py-2 text-[var(--app-text)]"
            />
            <span v-for="error in fieldErrors.slug" :key="error" class="text-xs text-rose-300">
              {{ error }}
            </span>
          </label>
          <button type="submit" class="w-fit rounded-full bg-[var(--sidebar-active)] px-4 py-2 text-sm">
            Create subject
          </button>
        </form>

        <div v-if="showImport" class="grid gap-4 rounded-2xl bg-[var(--app-bg)] p-5">
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--app-muted)]">
              Upload subject JSON
            </h4>
            <p class="mt-2 text-sm text-[var(--app-muted)]">
              Paste a full subject tree JSON payload. List-style blocks (accordion/checklist/pitfalls)
              must use data.items with { title, description? }. Resources remain { title, url }.
            </p>
          </div>
          <form class="grid gap-4" @submit.prevent="submitImport">
            <label class="grid gap-1 text-sm">
              JSON Payload
              <textarea
                v-model="importPayload"
                rows="10"
                placeholder="{ ... }"
                required
                class="min-h-[200px] rounded-xl bg-[var(--app-bg)] p-3 font-mono text-xs"
              />
              <span v-for="error in importErrors" :key="error" class="text-xs text-rose-300">
                {{ error }}
              </span>
            </label>
            <div class="flex flex-wrap gap-3">
              <button type="submit" class="rounded-full bg-[var(--sidebar-active)] px-4 py-2 text-sm">
                Import JSON
              </button>
              <button
                type="button"
                class="rounded-full border border-[var(--sidebar-active)] px-4 py-2 text-sm"
                @click="resetImport"
              >
                Clear
              </button>
            </div>
            <p v-if="importMessage" class="text-sm text-emerald-300">{{ importMessage }}</p>
            <p v-if="importErrorMessage" class="text-sm text-rose-300">{{ importErrorMessage }}</p>
          </form>
        </div>
      </div>

      <div class="grid gap-4 rounded-2xl bg-[var(--panel-bg)] p-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">All subjects</h3>
          <span v-if="isLoading" class="text-sm text-[var(--app-muted)]">Loading…</span>
        </div>
        <p v-if="errorMessage" class="text-sm text-rose-300">{{ errorMessage }}</p>
        <ul v-else class="grid gap-3">
          <li v-for="subject in subjects" :key="subject.id" class="rounded-2xl bg-[var(--app-bg)] p-4">
            <div v-if="editingId !== subject.id" class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p class="text-sm font-semibold">{{ subject.title }}</p>
                <p class="text-xs text-[var(--app-muted)]">{{ subject.slug }}</p>
              </div>
              <div class="flex flex-wrap gap-2">
                <RouterLink
                  :to="`/admin/subjects/${subject.id}/topics`"
                  class="rounded-full bg-[var(--sidebar-active)] px-3 py-1 text-xs"
                >
                  Manage Topics
                </RouterLink>
                <button @click="startEdit(subject)" class="rounded-full border border-[var(--sidebar-active)] px-3 py-1 text-xs">
                  Edit
                </button>
                <button @click="confirmDelete(subject)" class="rounded-full border border-rose-400 px-3 py-1 text-xs text-rose-200">
                  Delete
                </button>
              </div>
            </div>

            <form v-else class="grid gap-3" @submit.prevent="saveEdit(subject)">
              <label class="grid gap-1 text-sm">
                Title
                <input v-model="subject.title" type="text" required class="rounded-xl bg-[var(--panel-bg)] px-3 py-2" />
              </label>
              <label class="grid gap-1 text-sm">
                Slug
                <input v-model="subject.slug" type="text" required class="rounded-xl bg-[var(--panel-bg)] px-3 py-2" />
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
import { RouterLink } from 'vue-router'
import AdminLayout from '../../admin/AdminLayout.vue'
import { getErrorMessage, mapValidationErrors } from '../../admin/api/adminErrors'
import { subjectsApi, type SubjectRecord } from '../../admin/api/subjectsApi'

const subjects = ref([] as Awaited<ReturnType<typeof subjectsApi.list>>)
const isLoading = ref(false)
const errorMessage = ref('')
const fieldErrors = reactive<{ title?: string[]; slug?: string[] }>({})
const newSubject = reactive({ title: '', slug: '' })

const showImport = ref(false)
const importPayload = ref('')
const importErrors = ref<string[]>([])
const importErrorMessage = ref('')
const importMessage = ref('')

const editingId = ref<string | null>(null)
const editingOriginal = ref<SubjectRecord | null>(null)
const editError = ref('')

const confirmingDelete = ref<SubjectRecord | null>(null)
const deleteError = ref('')

const loadSubjects = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    subjects.value = await subjectsApi.list()
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    isLoading.value = false
  }
}

const resetFormErrors = () => {
  fieldErrors.title = []
  fieldErrors.slug = []
}

const createSubject = async () => {
  resetFormErrors()
  errorMessage.value = ''

  try {
    const created = await subjectsApi.create({ ...newSubject })
    subjects.value.push(created)
    newSubject.title = ''
    newSubject.slug = ''
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
    const validation = mapValidationErrors(error)
    fieldErrors.title = validation['title'] ?? []
    fieldErrors.slug = validation['slug'] ?? []
  }
}

const toggleImport = () => {
  showImport.value = !showImport.value
  importErrorMessage.value = ''
  importMessage.value = ''
}

const resetImport = () => {
  importPayload.value = ''
  importErrors.value = []
  importErrorMessage.value = ''
  importMessage.value = ''
}

const submitImport = async () => {
  importErrors.value = []
  importErrorMessage.value = ''
  importMessage.value = ''

  try {
    const parsed = JSON.parse(importPayload.value)
    await subjectsApi.importTree(parsed)
    importMessage.value = 'Import completed successfully.'
    importPayload.value = ''
    await loadSubjects()
  } catch (error) {
    if (error instanceof SyntaxError) {
      importErrorMessage.value = 'Invalid JSON. Please check the syntax.'
      return
    }

    importErrorMessage.value = getErrorMessage(error)
    const validation = mapValidationErrors(error)
    importErrors.value = Object.values(validation).flat()
  }
}

const startEdit = (subject: SubjectRecord) => {
  editingId.value = subject.id
  editingOriginal.value = { ...subject }
  editError.value = ''
}

const cancelEdit = () => {
  if (editingOriginal.value) {
    const index = subjects.value.findIndex(s => s.id === editingId.value)
    if (index !== -1) {
      subjects.value[index] = editingOriginal.value
    }
  }
  editingId.value = null
  editingOriginal.value = null
  editError.value = ''
}

const saveEdit = async (subject: SubjectRecord) => {
  editError.value = ''

  try {
    await subjectsApi.update(subject.id, {
      title: subject.title,
      slug: subject.slug
    })
    editingId.value = null
    editingOriginal.value = null
  } catch (error) {
    editError.value = getErrorMessage(error)
  }
}

const confirmDelete = (subject: SubjectRecord) => {
  confirmingDelete.value = subject
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
    await subjectsApi.delete(confirmingDelete.value.id)
    subjects.value = subjects.value.filter(s => s.id !== confirmingDelete.value!.id)
    confirmingDelete.value = null
  } catch (error) {
    deleteError.value = getErrorMessage(error)
  }
}

onMounted(() => {
  void loadSubjects()
})
</script>
