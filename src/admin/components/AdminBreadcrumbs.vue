<template>
  <nav class="flex min-w-0 items-center gap-1.5 text-xs text-[var(--app-muted)]" aria-label="Breadcrumb">
    <RouterLink
      to="/admin"
      class="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2 transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)]"
    >
      <LayoutDashboard class="h-3.5 w-3.5" />
      Admin
    </RouterLink>

    <ChevronRight class="h-3.5 w-3.5 shrink-0 opacity-40" />

    <RouterLink
      to="/admin/subjects"
      class="inline-flex h-8 shrink-0 items-center rounded-lg px-2 transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)]"
    >
      Subjects
    </RouterLink>

    <template v-if="subjectId">
      <ChevronRight class="h-3.5 w-3.5 shrink-0 opacity-40" />
      <RouterLink
        :to="`/admin/topics?subjectId=${subjectId}`"
        class="inline-flex h-8 min-w-0 items-center rounded-lg px-2 transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)]"
      >
        <span class="truncate">{{ subjectTitle || 'Subject' }}</span>
      </RouterLink>
    </template>

    <template v-if="topicId">
      <ChevronRight class="h-3.5 w-3.5 shrink-0 opacity-40" />
      <span
        class="inline-flex h-8 min-w-0 items-center rounded-lg bg-[var(--sidebar-active)] px-2 font-medium text-[var(--app-text)]"
        aria-current="page"
      >
        <span class="truncate">{{ topicTitle || 'Topic' }}</span>
      </span>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ChevronRight, LayoutDashboard } from 'lucide-vue-next'

interface Props {
  subjectId?: string
  subjectTitle?: string
  topicId?: string
  topicTitle?: string
}

defineProps<Props>()
</script>
