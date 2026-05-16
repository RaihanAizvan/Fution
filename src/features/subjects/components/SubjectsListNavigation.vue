<template>
  <nav class="subjects-navigation" aria-label="Subjects">
    <p v-if="isLoading">Loading subjects…</p>
    <p v-else-if="hasError">Unable to load subjects.</p>
    <p v-else-if="filteredSubjects.length === 0" class="text-[var(--app-muted)]">No subjects found.</p>

    <SubjectListItem
      v-else
      v-for="subject in filteredSubjects"
      :key="subject.slug"
      :slug="subject.slug"
      :label="subject.title"
    />
  </nav>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useSubjects } from '../../../composables/useSubjects'
import SubjectListItem from './SubjectListItem.vue'

interface Props {
  query?: string
}

const props = defineProps<Props>()

const { subjects, isLoading, hasError, loadSubjects } = useSubjects()

const filteredSubjects = computed(() => {
  const q = (props.query || '').trim().toLowerCase()
  if (!q) return subjects.value
  return subjects.value.filter(s => {
    return s.title.toLowerCase().includes(q) || s.slug.toLowerCase().includes(q)
  })
})

onMounted(() => {
  void loadSubjects()
})
</script>
