<template>
  <nav class="flex min-w-0 items-center gap-1 text-sm text-[var(--app-muted)]" aria-label="Breadcrumb">
    <RouterLink
      to="/"
      class="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2 transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)]"
    >
      <Home class="h-4 w-4" />
      Home
    </RouterLink>
    <ChevronRight class="h-4 w-4 shrink-0 text-[var(--app-muted)]/60" />
    <RouterLink
      to="/subjects"
      class="hidden h-8 shrink-0 items-center rounded-lg px-2 transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)] sm:inline-flex"
    >
      Subjects
    </RouterLink>
    <ChevronRight class="hidden h-4 w-4 shrink-0 text-[var(--app-muted)]/60 sm:block" />
    <RouterLink
      v-if="subjectSlug"
      :to="`/subjects/${subjectSlug}`"
      class="inline-flex h-8 min-w-0 items-center rounded-lg px-2 transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)]"
    >
      <span class="truncate">{{ subjectTitle || 'Subject' }}</span>
    </RouterLink>
    <ChevronRight v-if="topicSlug" class="h-4 w-4 shrink-0 text-[var(--app-muted)]/60" />
    <span
      v-if="topicSlug"
      class="inline-flex h-8 min-w-0 items-center rounded-lg bg-[var(--sidebar-active)] px-2 font-medium text-[var(--app-text)]"
      aria-current="page"
    >
      <span class="truncate">{{ topicTitle || 'Topic' }}</span>
    </span>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ChevronRight, Home } from 'lucide-vue-next'

const route = useRoute()

const subjectSlug = computed(() => route.params.slug as string | undefined)
const topicSlug = computed(() => route.params.topicSlug as string | undefined)

interface Props {
  subjectTitle?: string
  topicTitle?: string
}

defineProps<Props>()
</script>
