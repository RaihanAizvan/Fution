<template>
  <AdminLayout>
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-semibold">Subjects</h2>
          <p class="text-sm text-white/60">Content library • Subjects</p>
        </div>
        <button
          type="button"
          class="rounded-md bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20"
          @click="showCreate = true"
        >
          + New Subject
        </button>
      </div>
      <div class="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/40">
        <span>Admin</span>
        <span>/</span>
        <span>Content</span>
        <span>/</span>
        <span>Subjects</span>
      </div>
    </template>

    <section class="grid gap-6">
      <div class="rounded-lg bg-[#16171b] p-6">
        <div class="grid grid-cols-[40px_1.5fr_2fr_120px_140px] items-center gap-3 border-b border-white/5 pb-3 text-xs uppercase tracking-[0.2em] text-white/40">
          <div></div>
          <span>Title</span>
          <span>Description</span>
          <span>Status</span>
          <span class="text-right">Actions</span>
        </div>

        <div v-if="isLoading" class="py-6 text-sm text-white/50">Loading subjects…</div>
        <div v-else-if="errorMessage" class="py-6 text-sm text-rose-300">{{ errorMessage }}</div>
        <div v-else class="grid gap-3 pt-4">
          <div
            v-for="subject in subjects"
            :key="subject.id"
            class="grid grid-cols-[40px_1.5fr_2fr_120px_140px] items-center gap-3 rounded-md bg-[#1b1c22] px-4 py-3 transition hover:bg-[#21232b]"
          >
            <div class="flex items-center gap-2">
              <span class="grid h-8 w-8 place-items-center rounded-md bg-[#232531] text-white/60">
                <span class="text-xs">JS</span>
              </span>
              <button class="text-white/40" aria-label="Reorder">
                <span class="grid grid-cols-3 gap-0.5">
                  <span class="h-1 w-1 rounded-sm bg-white/40"></span>
                  <span class="h-1 w-1 rounded-sm bg-white/40"></span>
                  <span class="h-1 w-1 rounded-sm bg-white/40"></span>
                  <span class="h-1 w-1 rounded-sm bg-white/40"></span>
                  <span class="h-1 w-1 rounded-sm bg-white/40"></span>
                  <span class="h-1 w-1 rounded-sm bg-white/40"></span>
                  <span class="h-1 w-1 rounded-sm bg-white/40"></span>
                  <span class="h-1 w-1 rounded-sm bg-white/40"></span>
                  <span class="h-1 w-1 rounded-sm bg-white/40"></span>
                </span>
              </button>
            </div>
            <div>
              <p class="text-sm font-semibold text-white">{{ subject.title }}</p>
              <p class="text-xs text-white/40">{{ subject.slug }}</p>
            </div>
            <p class="text-xs text-white/50">No description yet.</p>
            <span class="inline-flex w-fit rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300">
              Active
            </span>
            <div class="flex justify-end gap-2">
              <button
                class="rounded-md border border-white/10 px-3 py-1 text-xs text-white/70 hover:border-white/30"
                @click="startEdit(subject)"
              >
                Edit
              </button>
              <button
                class="rounded-md border border-rose-500/30 px-3 py-1 text-xs text-rose-300 hover:border-rose-400"
                @click="confirmDelete(subject)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between text-xs text-white/40">
        <span>Showing {{ subjects.length }} of {{ subjects.length }} results</span>
        <button
          type="button"
          class="rounded-md border border-white/10 px-3 py-2 text-xs"
          @click="toggleImport"
        >
          {{ showImport ? 'Hide JSON Import' : 'Import JSON' }}
        </button>
      </div>
    </section>

    <div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div class="w-full max-w-lg rounded-lg bg-[#1a1b21] p-6">
        <h3 class="text-lg font-semibold">Create Subject</h3>
        <p class="mt-2 text-sm text-white/50">Add a new subject to the content library.</p>
        <form class="mt-6 grid gap-4" @submit.prevent="createSubject">
          <label class="grid gap-1 text-sm">
            Title
            <input
              v-model="newSubject.title"
              type="text"
              required
              class="rounded-md bg-[#101114] px-3 py-2 text-sm text-white"
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
              class="rounded-md bg-[#101114] px-3 py-2 text-sm text-white"
            />
            <span v-for="error in fieldErrors.slug" :key="error" class="text-xs text-rose-300">
              {{ error }}
            </span>
          </label>
          <div class="flex justify-end gap-3">
            <button type="button" class="rounded-md border border-white/10 px-4 py-2 text-sm" @click="closeCreate">
              Cancel
            </button>
            <button type="submit" class="rounded-md bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white">
              Add Subject
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showImport" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div class="w-full max-w-2xl rounded-lg bg-[#1a1b21] p-6">
        <h3 class="text-lg font-semibold">Import Subject JSON</h3>
        <p class="mt-2 text-sm text-white/50">
          Paste a full subject tree JSON payload. List-style blocks must use data.items with { title,
          description? }. Resources remain { title, url }.
        </p>
        <form class="mt-6 grid gap-4" @submit.prevent="submitImport">
          <label class="grid gap-1 text-sm">
            JSON Payload
            <textarea
              v-model="importPayload"
              rows="10"
              placeholder="{ ... }"
              required
              class="min-h-[220px] rounded-md bg-[#101114] p-3 font-mono text-xs text-white"
            />
            <span v-for="error in importErrors" :key="error" class="text-xs text-rose-300">
              {{ error }}
            </span>
          </label>
          <div class="flex justify-end gap-3">
            <button type="button" class="rounded-md border border-white/10 px-4 py-2 text-sm" @click="toggleImport">
              Cancel
            </button>
            <button type="submit" class="rounded-md bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white">
              Import
            </button>
          </div>
          <p v-if="importMessage" class="text-sm text-emerald-300">{{ importMessage }}</p>
          <p v-if="importErrorMessage" class="text-sm text-rose-300">{{ importErrorMessage }}</p>
        </form>
      </div>
    </div>

    <div v-if="confirmingDelete" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6" @click="cancelDelete">
      <div class="w-full max-w-md rounded-lg bg-[#1a1b21] p-6" @click.stop>
        <h3 class="text-lg font-semibold">Confirm Delete</h3>
        <p class="mt-2 text-sm text-white/50">
          Are you sure you want to delete "{{ confirmingDelete.title }}"?
        </p>
        <p class="mt-3 text-sm text-amber-300">This action cannot be undone.</p>
        <div class="mt-4 flex gap-2">
          <button @click="executeDelete" class="rounded-md bg-rose-500 px-4 py-2 text-sm">
            Delete
          </button>
          <button @click="cancelDelete" class="rounded-md border border-white/10 px-4 py-2 text-sm">
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
const showCreate = ref(false)
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
    showCreate.value = false
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
    const validation = mapValidationErrors(error)
    fieldErrors.title = validation['title'] ?? []
    fieldErrors.slug = validation['slug'] ?? []
  }
}

const closeCreate = () => {
  showCreate.value = false
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
