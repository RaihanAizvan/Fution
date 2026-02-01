<template>
  <nav class="subjects-navigation" aria-label="Subjects">
    <SubjectListItem
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

const { subjects, loadSubjects } = useSubjects()

onMounted(() => {
  void loadSubjects()
})
</script>
