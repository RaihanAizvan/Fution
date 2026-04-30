<template>
  <section class="blank-workspace">
    <div class="blank-workspace__panel">
      <div>
        <p class="blank-workspace__eyebrow">Blank tab</p>
        <h1 class="blank-workspace__title">Open something</h1>
        <p class="blank-workspace__copy">
          Pick a topic from the sidebar or start from the subject outline below.
        </p>
      </div>

      <div class="blank-workspace__actions">
        <RouterLink
          v-for="topic in topics"
          :key="topic.id"
          class="blank-workspace__topic"
          :to="`/subjects/${subjectSlug}/${topic.id}`"
        >
          <BookOpen class="h-4 w-4" />
          <span>{{ topic.title }}</span>
          <ArrowRight class="ml-auto h-4 w-4" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight, BookOpen } from 'lucide-vue-next'
import type { TopicSummary } from '../../../services/topics/topicsMockSource'

interface Props {
  subjectSlug: string
  topics: TopicSummary[]
}

defineProps<Props>()
</script>

<style scoped>
.blank-workspace {
  margin: 0 auto;
  max-width: 48rem;
  padding: 1.5rem 1rem 0;
}

.blank-workspace__panel {
  display: grid;
  gap: 1.5rem;
  border: 1px solid var(--panel-border);
  border-radius: 0.75rem;
  background: var(--panel-bg);
  padding: 1.5rem;
}

.blank-workspace__eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--app-muted);
}

.blank-workspace__title {
  margin-top: 0.5rem;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 750;
  color: var(--app-text);
}

.blank-workspace__copy {
  margin-top: 0.75rem;
  max-width: 34rem;
  color: var(--app-muted);
}

.blank-workspace__actions {
  display: grid;
  gap: 0.5rem;
}

.blank-workspace__topic {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid var(--panel-border);
  border-radius: 0.5rem;
  background: var(--app-bg);
  padding: 0.875rem 1rem;
  color: var(--app-muted);
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.blank-workspace__topic:hover {
  border-color: var(--accent);
  background: var(--sidebar-active);
  color: var(--app-text);
  transform: translateY(-1px);
}
</style>
