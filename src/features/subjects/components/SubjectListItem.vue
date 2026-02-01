<template>
  <RouterLink class="subject-list-item" :to="destination">
    <span class="subject-list-item__label">{{ label }}</span>
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

<style scoped>
.subject-list-item {
  display: block;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0.5rem;
  text-decoration: none;
  color: inherit;
}
</style>
