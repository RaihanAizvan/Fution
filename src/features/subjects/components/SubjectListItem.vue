<template>
  <RouterLink
    class="block rounded-md border border-[var(--panel-border)] bg-[var(--panel-bg)] px-4 py-3 text-[var(--app-text)] transition hover:border-[var(--accent)]"
    :to="destination"
  >
    <span class="text-sm font-medium">{{ label }}</span>
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
