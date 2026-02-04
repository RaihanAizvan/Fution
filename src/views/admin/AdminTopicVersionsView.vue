<template>
  <AdminLayout>
    <section>
      <h2>Topic Versions</h2>
      <RouterLink :to="`/admin/subjects/${subjectId}/topics`">Back to topics</RouterLink>
      <button type="button" @click="createDraft">Create Draft</button>

      <p v-if="isLoading">Loading versions…</p>
      <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>
      <ul v-else>
        <li v-for="version in versions" :key="version.id">
          <span>
            v{{ version.version }}
            <span v-if="version.isPublished">(published)</span>
            <span v-else>(draft)</span>
            — {{ version.createdAt }}
          </span>
          <RouterLink
            :to="`/admin/topics/${topicId}/versions/${version.id}?subjectId=${subjectId}`"
          >
            Manage blocks
          </RouterLink>
          <button
            v-if="!version.isPublished"
            type="button"
            @click="publishVersion(version)"
          >
            Publish
          </button>
        </li>
      </ul>
    </section>
  </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AdminLayout from '../../admin/AdminLayout.vue'
import { getErrorMessage } from '../../admin/api/adminErrors'
import { versionsApi } from '../../admin/api/versionsApi'

const route = useRoute()
const topicId = route.params.topicId as string
const subjectId = route.query.subjectId as string

const versions = ref([] as Awaited<ReturnType<typeof versionsApi.listByTopic>>)
const isLoading = ref(false)
const errorMessage = ref('')

const loadVersions = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    versions.value = await versionsApi.listByTopic(subjectId, topicId)
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    isLoading.value = false
  }
}

const createDraft = async () => {
  errorMessage.value = ''
  try {
    const nextVersion = versions.value.length
      ? Math.max(...versions.value.map((entry) => Number(entry.version ?? 0))) + 1
      : 1
    const created = await versionsApi.createDraft(subjectId, topicId, nextVersion)
    versions.value.unshift(created)
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  }
}

const publishVersion = async (version: { id: string }) => {
  errorMessage.value = ''
  try {
    const updated = await versionsApi.update(subjectId, topicId, version.id, true)
    versions.value = versions.value.map((entry) =>
      entry.id === updated.id ? updated : entry
    )
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  }
}

onMounted(() => {
  void loadVersions()
})
</script>
