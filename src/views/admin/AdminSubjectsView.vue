<template>
  <AdminLayout>
    <template #header>
      <div class="flex items-start justify-between">
        <div>
          <h2 class="text-3xl font-semibold">Subjects</h2>
          <div class="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--app-muted)]">
            ADMIN / CONTENT / SUBJECTS
          </div>
        </div>
        <button
          type="button"
          class="rounded-md bg-[var(--sidebar-active)] px-4 py-2 text-sm font-semibold text-[var(--app-text)] shadow-lg shadow-[var(--sidebar-active)]/20"
          @click="showCreate = true"
        >
          + New Subject
        </button>
      </div>
    </template>

    <section class="grid gap-6">
      <div v-if="isLoading" class="text-sm text-white/50">Loading subjects…</div>
      <div v-else-if="errorMessage" class="text-sm text-rose-300">{{ errorMessage }}</div>

      <div v-else class="grid gap-3">
        <div
          v-for="(subject, index) in subjects"
          :key="subject.id"
          class="flex flex-wrap items-center gap-4 rounded-md bg-[var(--panel-bg)] px-4 py-3 transition hover:bg-[var(--sidebar-active)]"
          :draggable="true"
          @dragstart="startDrag(index)"
          @dragover.prevent
          @drop="dropDrag(index)"
        >
          <button class="text-white/40" aria-label="Reorder">
            <span class="grid grid-cols-3 gap-0.5">
              <span v-for="n in 9" :key="n" class="h-1 w-1 rounded-sm bg-white/40"></span>
            </span>
          </button>

          <span class="grid h-9 w-9 place-items-center rounded-md bg-[var(--app-bg)] text-xs text-[var(--app-text)]/70">
            {{ subject.title?.slice(0, 2).toUpperCase() }}
          </span>

          <div class="min-w-[180px]">
            <p class="text-sm font-semibold text-[var(--app-text)]">{{ subject.title }}</p>
            <p class="text-xs text-[var(--app-muted)]">{{ subject.slug }}</p>
          </div>

          <p class="text-xs text-[var(--app-muted)]">
            {{ subject.description || 'No description yet' }}
          </p>

          <span
            class="ml-auto inline-flex w-fit rounded-full px-3 py-1 text-xs"
            :class="subject.isActive === false
              ? 'bg-[var(--app-bg)] text-[var(--app-muted)]'
              : 'bg-emerald-500/15 text-emerald-300'"
          >
            {{ subject.isActive === false ? 'Inactive' : 'Active' }}
          </span>

          <div class="flex gap-2">
            <RouterLink
              :to="`/admin/topics?subjectId=${subject.id}`"
              class="rounded-md bg-[var(--app-bg)] px-3 py-1 text-xs text-[var(--app-text)] hover:shadow-md"
            >
              Topics
            </RouterLink>
            <button
              class="rounded-md border border-[var(--sidebar-border)] px-3 py-1 text-xs text-[var(--app-text)]/70 hover:border-[var(--app-text)]/30"
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

      <div class="flex items-center justify-between text-xs text-[var(--app-muted)]">
        <span>Showing {{ subjects.length }} of {{ subjects.length }} results</span>
        <button
          type="button"
          class="rounded-md border border-[var(--sidebar-border)] px-3 py-2 text-xs"
          @click="toggleImport"
        >
          {{ showImport ? 'Hide JSON Import' : 'Import JSON' }}
        </button>
      </div>
    </section>

    <div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div class="w-full max-w-lg rounded-md bg-[var(--panel-bg)] p-6">
        <h3 class="text-lg font-semibold">Create Subject</h3>
        <p class="mt-2 text-sm text-[var(--app-muted)]">Add a new subject to the content library.</p>
        <form class="mt-6 grid gap-4" @submit.prevent="createSubject">
          <label class="grid gap-1 text-sm">
            Title
            <input
              v-model="newSubject.title"
              type="text"
              required
              class="rounded-md bg-[var(--app-bg)] px-3 py-2 text-sm text-[var(--app-text)]"
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
              class="rounded-md bg-[var(--app-bg)] px-3 py-2 text-sm text-[var(--app-text)]"
            />
            <span v-for="error in fieldErrors.slug" :key="error" class="text-xs text-rose-300">
              {{ error }}
            </span>
          </label>
          <label class="grid gap-1 text-sm">
            Description
            <textarea
              v-model="newSubject.description"
              class="rounded-md bg-[var(--app-bg)] px-3 py-2 text-sm text-[var(--app-text)]"
            />
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input v-model="newSubject.isActive" type="checkbox" class="rounded" />
            Active
          </label>
          <div class="flex justify-end gap-3">
            <button type="button" class="rounded-md border border-white/10 px-4 py-2 text-sm" @click="closeCreate">
              Cancel
            </button>
            <button type="submit" class="rounded-md bg-[var(--sidebar-active)] px-4 py-2 text-sm font-semibold text-[var(--app-text)]">
              Add Subject
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showImport" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div class="w-full max-w-2xl rounded-md bg-[var(--panel-bg)] p-6">
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
              class="min-h-[220px] rounded-md bg-[var(--app-bg)] p-3 font-mono text-xs text-[var(--app-text)]"
            />
            <span v-for="error in importErrors" :key="error" class="text-xs text-rose-300">
              {{ error }}
            </span>
          </label>
          <div class="flex justify-end gap-3">
            <button type="button" class="rounded-md border border-white/10 px-4 py-2 text-sm" @click="toggleImport">
              Cancel
            </button>
            <button type="submit" class="rounded-md bg-[var(--sidebar-active)] px-4 py-2 text-sm font-semibold text-[var(--app-text)]">
              Import
            </button>
          </div>
          <p v-if="importMessage" class="text-sm text-emerald-300">{{ importMessage }}</p>
          <p v-if="importErrorMessage" class="text-sm text-rose-300">{{ importErrorMessage }}</p>
        </form>
      </div>
    </div>

    <div v-if="showEdit" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div class="w-full max-w-lg rounded-md bg-[var(--panel-bg)] p-6">
        <h3 class="text-lg font-semibold">Edit Subject</h3>
        <p class="mt-2 text-sm text-[var(--app-muted)]">Update the subject details.</p>
        <form class="mt-6 grid gap-4" @submit.prevent="saveEdit">
          <label class="grid gap-1 text-sm">
            Title
            <input v-model="editSubject.title" type="text" required class="rounded-md bg-[var(--app-bg)] px-3 py-2 text-sm text-[var(--app-text)]" />
          </label>
          <label class="grid gap-1 text-sm">
            Slug
            <input v-model="editSubject.slug" type="text" required class="rounded-md bg-[var(--app-bg)] px-3 py-2 text-sm text-[var(--app-text)]" />
          </label>
          <label class="grid gap-1 text-sm">
            Description
            <textarea v-model="editSubject.description" class="rounded-md bg-[var(--app-bg)] px-3 py-2 text-sm text-[var(--app-text)]" />
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input v-model="editSubject.isActive" type="checkbox" class="rounded" />
            Active
          </label>
          <div class="flex justify-end gap-3">
            <button type="button" class="rounded-md border border-white/10 px-4 py-2 text-sm" @click="cancelEdit">
              Cancel
            </button>
            <button type="submit" class="rounded-md bg-[var(--sidebar-active)] px-4 py-2 text-sm font-semibold text-[var(--app-text)]">
              Save Changes
            </button>
          </div>
          <p v-if="editError" class="text-xs text-rose-300">{{ editError }}</p>
        </form>
      </div>
    </div>

    <div v-if="confirmingDelete" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6" @click="cancelDelete">
      <div class="w-full max-w-md rounded-md bg-[var(--panel-bg)] p-6" @click.stop>
        <h3 class="text-lg font-semibold">Confirm Delete</h3>
        <p class="mt-2 text-sm text-white/50">
          Are you sure you want to delete "{{ confirmingDelete.title }}"?
        </p>
        <p class="mt-3 text-sm text-amber-300">This action cannot be undone.</p>
        <div class="mt-4 flex gap-2">
          <button @click="executeDelete" class="rounded-md bg-rose-500 px-4 py-2 text-sm text-white">
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
const fieldErrors = reactive<{ title?: string[]; slug?: string[]; description?: string[] }>({})
const newSubject = reactive({ title: '', slug: '', description: '', isActive: true })

const showImport = ref(false)
const showCreate = ref(false)
const showEdit = ref(false)
const importPayload = ref('')
const importErrors = ref<string[]>([])
const importErrorMessage = ref('')
const importMessage = ref('')

const editingId = ref<string | null>(null)
const editingOriginal = ref<SubjectRecord | null>(null)
const editSubject = reactive({ id: '', title: '', slug: '', description: '', isActive: true })
const editError = ref('')

const confirmingDelete = ref<SubjectRecord | null>(null)
const deleteError = ref('')
const dragIndex = ref<number | null>(null)

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
  fieldErrors.description = []
}

const createSubject = async () => {
  resetFormErrors()
  errorMessage.value = ''

  try {
    const created = await subjectsApi.create({
      title: newSubject.title,
      slug: newSubject.slug,
      description: newSubject.description,
      isActive: newSubject.isActive
    })
    subjects.value.push(created)
    newSubject.title = ''
    newSubject.slug = ''
    newSubject.description = ''
    newSubject.isActive = true
    showCreate.value = false
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
    const validation = mapValidationErrors(error)
    fieldErrors.title = validation['title'] ?? []
    fieldErrors.slug = validation['slug'] ?? []
    fieldErrors.description = validation['description'] ?? []
  }
}

const closeCreate = () => {
  showCreate.value = false
}

const startDrag = (index: number) => {
  dragIndex.value = index
}

const dropDrag = async (index: number) => {
  if (dragIndex.value === null || dragIndex.value === index) {
    dragIndex.value = null
    return
  }

  const updated = [...subjects.value]
  const [moved] = updated.splice(dragIndex.value, 1)
  updated.splice(index, 0, moved)
  subjects.value = updated
  dragIndex.value = null

  const payload = subjects.value.map((subject, orderIndex) => ({
    subjectId: subject.id,
    orderIndex: orderIndex + 1
  }))

  try {
    await subjectsApi.reorder(payload)
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  }
}

const toggleImport = () => {
  showImport.value = !showImport.value
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
  editSubject.id = subject.id
  editSubject.title = subject.title
  editSubject.slug = subject.slug
  editSubject.description = subject.description ?? ''
  editSubject.isActive = subject.isActive !== false
  editError.value = ''
  showEdit.value = true
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
  showEdit.value = false
}

const saveEdit = async () => {
  editError.value = ''

  try {
    const updated = await subjectsApi.update(editSubject.id, {
      title: editSubject.title,
      slug: editSubject.slug,
      description: editSubject.description,
      isActive: editSubject.isActive
    })
    subjects.value = subjects.value.map(subject =>
      subject.id === updated.id ? updated : subject
    )
    editingId.value = null
    editingOriginal.value = null
    showEdit.value = false
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
