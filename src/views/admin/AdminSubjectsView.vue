<template>
  <AdminLayout>
    <section>
      <h2>Subjects</h2>
      <form class="admin-form" @submit.prevent="createSubject">
        <div>
          <label>
            Title
            <input v-model="newSubject.title" type="text" />
          </label>
          <p v-for="error in fieldErrors.title" :key="error" class="error">{{ error }}</p>
        </div>
        <div>
          <label>
            Slug
            <input v-model="newSubject.slug" type="text" />
          </label>
          <p v-for="error in fieldErrors.slug" :key="error" class="error">{{ error }}</p>
        </div>
        <button type="submit">Create Subject</button>
      </form>

      <p v-if="isLoading">Loading subjects…</p>
      <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>
      <ul v-else>
        <li v-for="subject in subjects" :key="subject.id">
          <form class="admin-form" @submit.prevent="updateSubject(subject)">
            <input v-model="subject.title" type="text" />
            <input v-model="subject.slug" type="text" />
            <button type="submit">Save</button>
          </form>
        </li>
      </ul>
    </section>
  </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import AdminLayout from '../../admin/AdminLayout.vue'
import { getErrorMessage, mapValidationErrors } from '../../admin/api/adminErrors'
import { subjectsApi } from '../../admin/api/subjectsApi'

const subjects = ref([] as Awaited<ReturnType<typeof subjectsApi.list>>)
const isLoading = ref(false)
const errorMessage = ref('')
const fieldErrors = reactive<{ title?: string[]; slug?: string[] }>({})
const newSubject = reactive({ title: '', slug: '' })

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

const updateSubject = async (subject: { id: string; title: string; slug: string }) => {
  errorMessage.value = ''

  try {
    await subjectsApi.update(subject.id, {
      title: subject.title,
      slug: subject.slug
    })
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  }
}

onMounted(() => {
  void loadSubjects()
})
</script>
