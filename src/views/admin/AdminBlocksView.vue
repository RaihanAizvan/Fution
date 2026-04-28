<template>
  <AdminLayout>
    <template #header>
      <div class="flex items-start justify-between">
        <div>
          <h2 class="text-3xl font-semibold">Edit Content</h2>
          <div class="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--app-muted)]">
            ADMIN / CONTENT / MARKDOWN EDITOR
          </div>
        </div>
        <div class="flex gap-3">
          <RouterLink
            :to="`/admin/subjects/${subjectId}/topics`"
            class="rounded-md border border-[var(--sidebar-border)] px-4 py-2 text-sm"
          >
            Back to Topics
          </RouterLink>
          <button
            type="button"
            class="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20"
            @click="saveContent"
            :disabled="isSaving"
          >
            {{ isSaving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>
    </template>

    <section class="grid gap-6 h-[calc(100vh-200px)] lg:grid-cols-2">
      <!-- Editor Pane -->
      <div class="flex flex-col rounded-md bg-[var(--panel-bg)] overflow-hidden border border-[var(--sidebar-border)]">
        <div class="flex items-center justify-between px-4 py-2 border-b border-[var(--sidebar-border)] bg-[var(--app-bg)]/50">
          <span class="text-xs font-bold uppercase tracking-wider text-[var(--app-muted)]">Markdown</span>
          <span v-if="saveStatus" class="text-xs text-emerald-400">{{ saveStatus }}</span>
        </div>
        <textarea
          v-model="markdown"
          class="flex-1 w-full p-4 bg-transparent font-mono text-sm leading-relaxed outline-none resize-none text-[var(--app-text)]"
          placeholder="# Your markdown here..."
          @input="handleInput"
        ></textarea>
      </div>

      <!-- Preview Pane -->
      <div class="flex flex-col rounded-md bg-[var(--panel-bg)] overflow-hidden border border-[var(--sidebar-border)]">
        <div class="flex items-center px-4 py-2 border-b border-[var(--sidebar-border)] bg-[var(--app-bg)]/50">
          <span class="text-xs font-bold uppercase tracking-wider text-[var(--app-muted)]">Live Preview (SSR)</span>
        </div>
        <div class="flex-1 overflow-auto p-8 bg-[var(--app-bg)]/20">
          <div v-if="isLoading" class="flex flex-col space-y-4 animate-pulse">
            <div class="h-8 w-3/4 bg-[var(--app-surface)] rounded"></div>
            <div class="h-4 w-full bg-[var(--app-surface)] rounded"></div>
            <div class="h-4 w-full bg-[var(--app-surface)] rounded"></div>
          </div>
          <div 
            v-else
            class="prose prose-neutral dark:prose-invert max-w-none 
                   prose-h1:text-4xl prose-h1:font-bold
                   prose-h2:text-2xl prose-h2:mt-10 prose-h2:font-semibold
                   prose-p:text-[var(--app-muted)] prose-p:leading-relaxed
                   prose-li:marker:text-orange-400
                   prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-pink-400 prose-code:font-medium
                   prose-pre:bg-black prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-xl"
            v-html="renderedHtml"
          ></div>
        </div>
      </div>
    </section>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import AdminLayout from '../../admin/AdminLayout.vue'
import { versionsApi } from '../../admin/api/versionsApi'
import { getErrorMessage } from '../../admin/api/adminErrors'

const route = useRoute()
const topicId = route.params.topicId as string
const versionId = route.params.versionId as string
const subjectId = route.query.subjectId as string

const markdown = ref('')
const renderedHtml = ref('')
const isLoading = ref(false)
const isSaving = ref(false)
const saveStatus = ref('')

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const loadContent = async () => {
  isLoading.value = true
  try {
    const version = await versionsApi.getById(topicId, versionId)
    markdown.value = version.markdown || ''
    renderedHtml.value = version.html || ''
  } catch (error) {
     console.error(getErrorMessage(error))
  } finally {
    isLoading.value = false
  }
}

const saveContent = async () => {
  isSaving.value = true
  saveStatus.value = 'Saving...'
  try {
    const updated = await versionsApi.updateContent(topicId, versionId, markdown.value)
    renderedHtml.value = updated.html
    saveStatus.value = 'All changes saved'
    setTimeout(() => { saveStatus.value = '' }, 3000)
  } catch (error) {
    saveStatus.value = 'Error saving'
  } finally {
    isSaving.value = false
  }
}

const handleInput = () => {
  saveStatus.value = 'Unsaved changes'
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    void saveContent()
  }, 1000)
}

onMounted(() => {
  void loadContent()
})
</script>

<style>
/* Modern vertical rhythm and micro-adjustments for preview */
.prose pre {
  @apply shadow-2xl;
  padding: 1.25rem !important;
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
}

.prose h2, .prose h3 {
  @apply tracking-tight font-semibold;
}

.prose code::before,
.prose code::after {
  content: "";
}

.prose p {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
</style>
