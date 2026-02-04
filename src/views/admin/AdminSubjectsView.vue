<template>
  <AdminLayout>
    <section>
      <h2>Subjects</h2>
      
      <div class="admin-section">
        <div class="section-header">
          <h3>Add New Subject</h3>
          <button
            type="button"
            class="btn-secondary"
            @click="toggleImport"
          >
            {{ showImport ? 'Close JSON Upload' : 'Upload JSON' }}
          </button>
        </div>

        <form class="admin-form" @submit.prevent="createSubject">
          <div class="form-field">
            <label>
              Title
              <input v-model="newSubject.title" type="text" required />
            </label>
            <p v-for="error in fieldErrors.title" :key="error" class="error">{{ error }}</p>
          </div>
          <div class="form-field">
            <label>
              Slug
              <input v-model="newSubject.slug" type="text" required />
            </label>
            <p v-for="error in fieldErrors.slug" :key="error" class="error">{{ error }}</p>
          </div>
          <button type="submit" class="btn-primary">Create Subject</button>
        </form>

        <div v-if="showImport" class="import-panel">
          <h4>Upload Subject JSON</h4>
          <p class="helper-text">
            Paste a full subject tree JSON payload. List-style blocks (accordion/checklist/pitfalls)
            must use data.items with { title, description? }. Resources remain { title, url }.
          </p>
          <form class="admin-form" @submit.prevent="submitImport">
            <div class="form-field">
              <label>
                JSON Payload
                <textarea
                  v-model="importPayload"
                  rows="10"
                  placeholder="{ ... }"
                  required
                />
              </label>
              <p v-for="error in importErrors" :key="error" class="error">{{ error }}</p>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-primary">Import JSON</button>
              <button type="button" class="btn-secondary" @click="resetImport">Clear</button>
            </div>
            <p v-if="importMessage" class="success">{{ importMessage }}</p>
            <p v-if="importErrorMessage" class="error">{{ importErrorMessage }}</p>
          </form>
        </div>
      </div>

      <div class="admin-section">
        <h3>All Subjects</h3>
        <p v-if="isLoading">Loading subjects…</p>
        <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>
        <ul v-else class="subjects-list">
          <li v-for="subject in subjects" :key="subject.id" class="subject-item">
            <div v-if="editingId !== subject.id" class="subject-view">
              <div class="subject-info">
                <strong>{{ subject.title }}</strong>
                <span class="slug">{{ subject.slug }}</span>
              </div>
              <div class="subject-actions">
                <RouterLink :to="`/admin/subjects/${subject.id}/topics`" class="btn-link">
                  Manage Topics
                </RouterLink>
                <button @click="startEdit(subject)" class="btn-secondary">Edit</button>
                <button @click="confirmDelete(subject)" class="btn-danger">Delete</button>
              </div>
            </div>
            
            <form v-else class="admin-form" @submit.prevent="saveEdit(subject)">
              <div class="form-field">
                <label>
                  Title
                  <input v-model="subject.title" type="text" required />
                </label>
              </div>
              <div class="form-field">
                <label>
                  Slug
                  <input v-model="subject.slug" type="text" required />
                </label>
              </div>
              <div class="form-actions">
                <button type="submit" class="btn-primary">Save</button>
                <button type="button" @click="cancelEdit" class="btn-secondary">Cancel</button>
              </div>
              <p v-if="editError" class="error">{{ editError }}</p>
            </form>
          </li>
        </ul>
      </div>
    </section>

    <div v-if="confirmingDelete" class="modal-overlay" @click="cancelDelete">
      <div class="modal" @click.stop>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete "{{ confirmingDelete.title }}"?</p>
        <p class="warning">This action cannot be undone.</p>
        <div class="modal-actions">
          <button @click="executeDelete" class="btn-danger">Delete</button>
          <button @click="cancelDelete" class="btn-secondary">Cancel</button>
        </div>
        <p v-if="deleteError" class="error">{{ deleteError }}</p>
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

<style scoped>
.admin-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.admin-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.import-panel {
  margin-top: 1.5rem;
  padding: 1rem;
  border: 1px dashed #c0c0c0;
  border-radius: 4px;
  background-color: #fafafa;
}

.helper-text {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  color: #555;
}

textarea {
  min-height: 200px;
  resize: vertical;
  font-family: monospace;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.success {
  color: #155724;
  background-color: #d4edda;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.admin-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
}

.form-field label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-weight: 500;
}

.form-field input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-link {
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.875rem;
}

.btn-link:hover {
  background-color: #218838;
}

.subjects-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.subject-item {
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.subject-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.subject-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.slug {
  font-size: 0.875rem;
  color: #666;
  font-family: monospace;
}

.subject-actions {
  display: flex;
  gap: 0.5rem;
}

.error {
  color: #dc3545;
  font-size: 0.875rem;
  margin: 0.25rem 0;
}

.warning {
  color: #856404;
  background-color: #fff3cd;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
}

.modal h3 {
  margin-top: 0;
}

.modal-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
}
</style>
