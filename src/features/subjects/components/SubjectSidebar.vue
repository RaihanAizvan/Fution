<template>
  <div class="subject-sidebar">
    <header class="subject-sidebar__header">
      <h2>Topics</h2>
    </header>
    <div class="subject-sidebar__content">
      <p v-if="isLoading">Loading topics…</p>
      <p v-else-if="hasError">Unable to load topics.</p>
      <p v-else-if="topics.length === 0">No topics available.</p>
      <RouterLink
        v-else
        v-for="topic in topics"
        :key="topic.id"
        class="subject-sidebar__topic"
        :class="{ 'is-selected': topic.id === selectedTopicSlug }"
        :to="getTopicLink(topic.id)"
      >
        {{ topic.title }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useSubjectTopics } from '../../../composables/useSubjectTopics'

const route = useRoute()
const { topics, isLoading, hasError } = useSubjectTopics()

const selectedTopicSlug = computed(() => route.params.topicSlug as string | undefined)
const subjectSlug = computed(() => route.params.slug as string)

const getTopicLink = (topicId: string) => `/subjects/${subjectSlug.value}/${topicId}`
</script>

<style scoped>
.subject-sidebar__topic {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  background: transparent;
}

.subject-sidebar__topic.is-selected {
  border-color: rgba(37, 99, 235, 0.4);
  background: rgba(37, 99, 235, 0.08);
}
</style>
