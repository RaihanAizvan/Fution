<template>
  <nav class="subjects-navigation" aria-label="Subjects">
    <p v-if="isLoading">Loading subjects…</p>
    <p v-else-if="hasError">Unable to load subjects.</p>
    <p v-else-if="subjects.length === 0">No subjects available.</p>
    <SubjectListItem
      v-else
      v-for="subject in subjects"
      :key="subject.slug"
      :slug="subject.slug"
      :label="subject.title"
    />
  </nav>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSubjects } from '../../../composables/useSubjects'
import SubjectListItem from './SubjectListItem.vue'

const { subjects, isLoading, hasError, loadSubjects } = useSubjects()

onMounted(() => {
  void loadSubjects()
})
</script>
