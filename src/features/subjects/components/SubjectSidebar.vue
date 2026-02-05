<template>
  <div class="subject-sidebar">
    <header class="subject-sidebar__header">
      <h2>Topics</h2>
      <RouterLink class="subject-sidebar__back" to="/subjects">Back</RouterLink>
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
.subject-sidebar {
  display: grid;
  gap: 1.5rem;
}

.subject-sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.subject-sidebar__header h2 {
  margin: 0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(230, 232, 236, 0.6);
}

.subject-sidebar__back {
  font-size: 0.8rem;
  text-decoration: none;
  color: rgba(230, 232, 236, 0.55);
  padding: 0.35rem 0.6rem;
  border-radius: 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.subject-sidebar__back:hover {
  color: rgba(230, 232, 236, 0.9);
  border-color: rgba(255, 255, 255, 0.2);
}

.subject-sidebar__content {
  display: grid;
  gap: 0.35rem;
}

.subject-sidebar__topic {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.55rem 0.75rem;
  border-radius: 0.65rem;
  border: 1px solid transparent;
  background: transparent;
  color: rgba(230, 232, 236, 0.75);
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.subject-sidebar__topic:hover {
  background: rgba(255, 255, 255, 0.04);
  color: rgba(230, 232, 236, 0.95);
}

.subject-sidebar__topic.is-selected {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: #f5f7fb;
}
</style>
