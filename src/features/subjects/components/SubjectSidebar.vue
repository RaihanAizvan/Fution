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
        :class="{ 'is-selected': topic.id === selectedTopicId }"
        @click="selectTopic(topic.id)"
      >
        {{ topic.title }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSubjectTopics } from '../../../composables/useSubjectTopics'

interface Props {
  selectedTopicId: string | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (event: 'update:selectedTopicId', value: string | null): void
}>()

const { topics, isLoading, hasError } = useSubjectTopics()

const selectedTopicId = computed(() => props.selectedTopicId)

const selectTopic = (topicId: string) => {
  emit('update:selectedTopicId', topicId)
}
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
