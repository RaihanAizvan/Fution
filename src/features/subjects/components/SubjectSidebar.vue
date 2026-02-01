<template>
  <div class="subject-sidebar">
    <header class="subject-sidebar__header">
      <h2>Topics</h2>
    </header>
    <div class="subject-sidebar__content">
      <p v-if="isLoading">Loading topics…</p>
      <p v-else-if="hasError">Unable to load topics.</p>
      <p v-else-if="topics.length === 0">No topics available.</p>
      <button
        v-else
        v-for="topic in topics"
        :key="topic.id"
        class="subject-sidebar__topic"
        type="button"
      >
        {{ topic.title }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubjectTopics } from '../../../composables/useSubjectTopics'

const { topics, isLoading, hasError } = useSubjectTopics()
</script>
