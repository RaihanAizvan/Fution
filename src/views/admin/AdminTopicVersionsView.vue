<template>
  <AdminLayout>
    <section class="grid gap-6">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Admin</p>
          <h2 class="text-2xl font-semibold">Topic Versions</h2>
        </div>
        <RouterLink
          :to="`/admin/subjects/${subjectId}/topics`"
          class="rounded-full border border-[var(--sidebar-active)] px-4 py-2 text-sm"
        >
          Back to topics
        </RouterLink>
      </header>

      <div class="flex flex-wrap items-center gap-3 rounded-2xl bg-[var(--panel-bg)] p-6">
        <button type="button" @click="createDraft" class="rounded-full bg-[var(--sidebar-active)] px-4 py-2 text-sm">
          Create Draft
        </button>
        <p v-if="errorMessage" class="text-sm text-rose-300">{{ errorMessage }}</p>
      </div>

      <div class="grid gap-4 rounded-2xl bg-[var(--panel-bg)] p-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Versions</h3>
          <span v-if="isLoading" class="text-sm text-[var(--app-muted)]">Loading…</span>
        </div>
        <ul v-if="versions.length" class="grid gap-3">
          <li v-for="version in versions" :key="version.id" class="rounded-2xl bg-[var(--app-bg)] p-4">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p class="text-sm font-semibold">
                  v{{ version.version }}
                  <span v-if="version.isPublished" class="text-emerald-300">(published)</span>
                  <span v-else class="text-[var(--app-muted)]">(draft)</span>
                </p>
                <p class="text-xs text-[var(--app-muted)]">{{ version.createdAt }}</p>
              </div>
              <div class="flex flex-wrap gap-2">
                <RouterLink
                  :to="`/admin/topics/${topicId}/versions/${version.id}?subjectId=${subjectId}`"
                  class="rounded-full bg-[var(--sidebar-active)] px-3 py-1 text-xs"
                >
                  Edit Content
                </RouterLink>
                <button
                  v-if="!version.isPublished"
                  type="button"
                  @click="publishVersion(version)"
                  class="rounded-full border border-[var(--sidebar-active)] px-3 py-1 text-xs"
                >
                  Publish
                </button>
              </div>
            </div>
          </li>
        </ul>
        <p v-else class="text-sm text-[var(--app-muted)]">No versions yet.</p>
      </div>
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
    versions.value = await versionsApi.listByTopic(topicId)
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
    const created = await versionsApi.createDraft(topicId, nextVersion)
    versions.value.unshift(created)
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  }
}

const publishVersion = async (version: { id: string }) => {
  errorMessage.value = ''
  try {
    const updated = await versionsApi.publish(topicId, version.id)
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
