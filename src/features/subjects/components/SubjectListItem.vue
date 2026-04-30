<template>
  <RouterLink
    class="group flex flex-col rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-6 transition hover:border-blue-500/50 hover:bg-[var(--sidebar-active)] hover:shadow-lg"
    :to="destination"
  >
    <div class="mb-4 inline-flex h-10 w-10 rounded-lg bg-blue-500/20 p-2">
      <svg class="h-full w-full text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
      </svg>
    </div>
    <span class="text-lg font-semibold text-[var(--app-text)] group-hover:text-white">{{ label }}</span>
    <span class="mt-2 text-xs text-[var(--app-muted)] group-hover:text-[var(--app-muted)]/80">
      Click to explore
    </span>
    <div class="mt-4 flex items-center gap-2 text-sm text-blue-400 opacity-0 transition group-hover:opacity-100">
      <span>View topics</span>
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
  slug: string
  label: string
}

const props = defineProps<Props>()

const destination = computed(() => `/subjects/${props.slug}`)
</script>
