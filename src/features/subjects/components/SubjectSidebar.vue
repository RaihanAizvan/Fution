<template>
  <div class="grid gap-6">
    <header class="flex items-center justify-between">
      <h2 class="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Topics</h2>
      <RouterLink
        class="rounded-full border border-[var(--panel-border)] px-3 py-1 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--app-muted)] transition hover:text-[var(--app-text)]"
        to="/subjects"
      >
        Back
      </RouterLink>
    </header>
    <div class="grid gap-1">
      <p v-if="isLoading" class="text-sm text-[var(--app-muted)]">Loading topics…</p>
      <p v-else-if="hasError" class="text-sm text-[var(--app-muted)]">Unable to load topics.</p>
      <p v-else-if="topics.length === 0" class="text-sm text-[var(--app-muted)]">
        No topics available.
      </p>
      <RouterLink
        v-else
        v-for="topic in topics"
        :key="topic.id"
        class="rounded-xl px-3 py-2 text-sm text-[var(--app-text)]/70 transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)]"
        :class="{ 'bg-[var(--sidebar-active)] text-[var(--app-text)]': topic.id === selectedTopicSlug }"
        :to="getTopicLink(topic.id)"
      >
        {{ topic.title }}
      </RouterLink>
    </div>

    <div class="mt-6 border-t border-[var(--sidebar-active)] pt-4">
      <RouterLink
        to="/settings"
        class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[var(--app-text)]/70 transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)]"
      >
        <span
          class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--sidebar-active)]"
        >
          <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4" stroke="currentColor" stroke-width="1.8">
            <path
              d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 0 1-4 0v-.1a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.1a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.1a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.1a1 1 0 0 0-.9.6Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        Settings
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useSubjectTopics } from '../../../composables/useSubjectTopics'

const route = useRoute()
const { topics, isLoading, hasError } = useSubjectTopics()

const selectedTopicSlug = computed(() => route.params.topicSlug as string | undefined)
const subjectSlug = computed(() => route.params.slug as string)

const getTopicLink = (topicId: string) => `/subjects/${subjectSlug.value}/${topicId}`
</script>
