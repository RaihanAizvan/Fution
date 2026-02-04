<template>
  <AdminLayout>
    <section>
      <div class="header-section">
        <h2>Topics</h2>
        <RouterLink to="/admin/subjects" class="btn-link">← Back to Subjects</RouterLink>
      </div>
      
      <div class="admin-section">
        <h3>Add New Topic</h3>
        <form class="admin-form" @submit.prevent="createTopic">
          <div class="form-field">
            <label>
              Title
              <input v-model="newTopic.title" type="text" required />
            </label>
            <p v-for="error in fieldErrors.title" :key="error" class="error">{{ error }}</p>
          </div>
          <div class="form-field">
            <label>
              Slug
              <input v-model="newTopic.slug" type="text" required />
            </label>
            <p v-for="error in fieldErrors.slug" :key="error" class="error">{{ error }}</p>
          </div>
          <div class="form-field">
            <label>
              Level
              <select v-model="newTopic.level" required>
                <option value="">Select a level...</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </label>
            <p v-for="error in fieldErrors.level" :key="error" class="error">{{ error }}</p>
          </div>
          <button type="submit" class="btn-primary">Create Topic</button>
        </form>
      </div>

      <div class="admin-section">
        <div class="section-header">
          <h3>All Topics</h3>
          <button 
            v-if="!isReordering && topics.length > 1" 
            @click="startReorder" 
            class="btn-secondary"
          >
            Reorder Topics
          </button>
          <div v-if="isReordering" class="reorder-actions">
            <button @click="saveReorder" class="btn-primary">Save Order</button>
            <button @click="cancelReorder" class="btn-secondary">Cancel</button>
          </div>
        </div>
        
        <p v-if="isLoading">Loading topics…</p>
        <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>
        <ul v-else class="topics-list">
          <li v-for="(topic, index) in topics" :key="topic.id" class="topic-item">
            <div v-if="editingId !== topic.id" class="topic-view">
              <div class="topic-info">
                <strong>{{ topic.title }}</strong>
                <span class="slug">{{ topic.slug }}</span>
                <span class="level-badge" :class="`level-${topic.level}`">{{ topic.level }}</span>
              </div>
              <div class="topic-actions">
                <div v-if="isReordering" class="reorder-controls">
                  <button 
                    @click="moveUp(index)" 
                    :disabled="index === 0"
                    class="btn-reorder"
                  >
                    ↑
                  </button>
                  <button 
                    @click="moveDown(index)" 
                    :disabled="index === topics.length - 1"
                    class="btn-reorder"
                  >
                    ↓
                  </button>
                </div>
                <template v-else>
                  <RouterLink
                    :to="`/admin/topics/${topic.id}/versions?subjectId=${subjectId}`"
                    class="btn-link btn-link-small"
                  >
                    Manage Versions
                  </RouterLink>
                  <button @click="startEdit(topic)" class="btn-secondary">Edit</button>
                  <button @click="confirmDelete(topic)" class="btn-danger">Delete</button>
                </template>
              </div>
            </div>
            
            <form v-else class="admin-form" @submit.prevent="saveEdit(topic)">
              <div class="form-field">
                <label>
                  Title
                  <input v-model="topic.title" type="text" required />
                </label>
              </div>
              <div class="form-field">
                <label>
                  Slug
                  <input v-model="topic.slug" type="text" required />
                </label>
              </div>
              <div class="form-field">
                <label>
                  Level
                  <select v-model="topic.level" required>
                    <option value="">Select a level...</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
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
    await topicsApi.update(topic.id, {
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
    const orderedIds = topics.value.map(t => t.id)
    await topicsApi.reorder(subjectId, orderedIds)
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

<style scoped>
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h3 {
  margin: 0;
}

.reorder-actions {
  display: flex;
  gap: 0.5rem;
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

.form-field input,
.form-field select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.form-field select {
  background-color: white;
  cursor: pointer;
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

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
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
  display: inline-block;
}

.btn-link:hover {
  background-color: #218838;
}

.btn-link-small {
  padding: 0.375rem 0.75rem;
  font-size: 0.8rem;
}

.btn-reorder {
  padding: 0.25rem 0.5rem;
  background-color: #17a2b8;
  color: white;
  font-weight: bold;
  min-width: 32px;
}

.btn-reorder:hover:not(:disabled) {
  background-color: #138496;
}

.topics-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.topic-item {
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.topic-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.topic-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.slug {
  font-size: 0.875rem;
  color: #666;
  font-family: monospace;
}

.level-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.level-beginner {
  background-color: #d4edda;
  color: #155724;
}

.level-intermediate {
  background-color: #fff3cd;
  color: #856404;
}

.level-advanced {
  background-color: #f8d7da;
  color: #721c24;
}

.topic-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.reorder-controls {
  display: flex;
  gap: 0.25rem;
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
