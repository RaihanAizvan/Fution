<template>
  <section class="subject-detail">
    <p v-if="isLoading">Loading subject…</p>
    <p v-else-if="hasError">Unable to load subject.</p>
    <p v-else-if="!subject">Subject not found.</p>

    <SubjectLayout v-else>
      <template #sidebar>
        <SubjectSidebar v-model:selectedTopicId="selectedTopicId" />
      </template>
      <SubjectMainContent :title="subject.title" :introBlock="introBlock" />
    </SubjectLayout>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SubjectMainContent from '../features/subjects/components/SubjectMainContent.vue'
import SubjectSidebar from '../features/subjects/components/SubjectSidebar.vue'
import SubjectLayout from '../features/subjects/layouts/SubjectLayout.vue'
import { useSubjectDetail } from '../composables/useSubjectDetail'
import { useSubjectTopics } from '../composables/useSubjectTopics'

const { subject, isLoading, hasError } = useSubjectDetail()
const { topics } = useSubjectTopics()

const selectedTopicId = ref<string | null>(null)
const selectedTopicTitle = computed(() => {
  const match = topics.value.find((topic) => topic.id === selectedTopicId.value)
  return match?.title ?? null
})

const introBlock = computed(() => {
  if (!selectedTopicTitle.value) {
    return null
  }

  return {
    type: 'intro',
    title: `${selectedTopicTitle.value} Overview`,
    description: `Intro content for ${selectedTopicTitle.value} will appear here.`
  }
})
</script>
