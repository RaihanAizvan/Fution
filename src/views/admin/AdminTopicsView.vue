<template>
  <AdminLayout>
    <section>
      <h2>Topics</h2>
      <RouterLink to="/admin/subjects">Back to subjects</RouterLink>
      <form class="admin-form" @submit.prevent="createTopic">
        <div>
          <label>
            Title
            <input v-model="newTopic.title" type="text" />
          </label>
          <p v-for="error in fieldErrors.title" :key="error" class="error">{{ error }}</p>
        </div>
        <div>
          <label>
            Slug
            <input v-model="newTopic.slug" type="text" />
          </label>
          <p v-for="error in fieldErrors.slug" :key="error" class="error">{{ error }}</p>
        </div>
        <button type="submit">Create Topic</button>
      </form>

      <p v-if="isLoading">Loading topics…</p>
      <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>
      <ul v-else>
        <li v-for="topic in topics" :key="topic.id">
          <form class="admin-form" @submit.prevent="updateTopic(topic)">
            <input v-model="topic.title" type="text" />
            <input v-model="topic.slug" type="text" />
            <RouterLink
              :to="`/admin/topics/${topic.id}/versions?subjectId=${subjectId}`"
            >
              Manage versions
            </RouterLink>
            <button type="submit">Save</button>
          </form>
        </li>
      </ul>
    </section>
  </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AdminLayout from '../../admin/AdminLayout.vue'
import { getErrorMessage, mapValidationErrors } from '../../admin/api/adminErrors'
import { topicsApi } from '../../admin/api/topicsApi'

const route = useRoute()
const subjectId = route.params.subjectId as string

const topics = ref([] as Awaited<ReturnType<typeof topicsApi.listBySubject>>)
const isLoading = ref(false)
const errorMessage = ref('')
const fieldErrors = reactive<{ title?: string[]; slug?: string[] }>({})
const newTopic = reactive({ title: '', slug: '' })

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
}

const createTopic = async () => {
  resetFormErrors()
  errorMessage.value = ''

  try {
    const created = await topicsApi.create(subjectId, { ...newTopic })
    topics.value.push(created)
    newTopic.title = ''
    newTopic.slug = ''
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
    const validation = mapValidationErrors(error)
    fieldErrors.title = validation['title'] ?? []
    fieldErrors.slug = validation['slug'] ?? []
  }
}

const updateTopic = async (topic: { id: string; title: string; slug: string }) => {
  errorMessage.value = ''

  try {
    await topicsApi.update(topic.id, {
      title: topic.title,
      slug: topic.slug
    })
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  }
}

onMounted(() => {
  void loadTopics()
})
</script>
