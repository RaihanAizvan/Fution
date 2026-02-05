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
        class="rounded-xl border border-transparent px-3 py-2 text-sm text-[var(--app-text)]/70 transition hover:bg-[var(--panel-bg)] hover:text-[var(--app-text)]"
        :class="{
          'border-[var(--panel-border)] bg-[var(--panel-bg)] text-[var(--app-text)]':
            topic.id === selectedTopicSlug
        }"
        :to="getTopicLink(topic.id)"
      >
        {{ topic.title }}
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
