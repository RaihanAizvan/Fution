<template>
  <section class="subjects-view">
    <header class="subjects-view__header">
      <h1>Subjects</h1>
    </header>
    <p v-if="isLoading">Loading subjects…</p>
    <p v-else-if="hasError">Unable to load subjects.</p>
    <p v-else-if="subjects.length === 0">No subjects available yet.</p>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSubjects } from '../composables/useSubjects'

const { subjects, isLoading, hasError, loadSubjects } = useSubjects()

onMounted(() => {
  void loadSubjects()
})
</script>
