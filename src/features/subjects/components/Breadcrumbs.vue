<template>
  <nav class="flex items-center gap-2 text-sm text-[var(--app-muted)]">
    <RouterLink
      to="/"
      class="transition hover:text-[var(--app-text)]"
    >
      Home
    </RouterLink>
    <span>/</span>
    <RouterLink
      v-if="subjectSlug"
      :to="`/subjects/${subjectSlug}`"
      class="transition hover:text-[var(--app-text)]"
    >
      {{ subjectTitle || 'Subject' }}
    </RouterLink>
    <span v-if="topicSlug">/</span>
    <span v-if="topicSlug" class="text-[var(--app-text)]">
      {{ topicTitle || 'Topic' }}
    </span>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'

const route = useRoute()

const subjectSlug = computed(() => route.params.slug as string | undefined)
const topicSlug = computed(() => route.params.topicSlug as string | undefined)

interface Props {
  subjectTitle?: string
  topicTitle?: string
}

defineProps<Props>()
</script>
