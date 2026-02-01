<template>
  <section class="subject-detail">
    <p v-if="isLoading">Loading subject…</p>
    <p v-else-if="hasError">Unable to load subject.</p>
    <p v-else-if="!subject">Subject not found.</p>

    <SubjectLayout v-else>
      <template #sidebar>
        <SubjectSidebar v-model:selectedTopicId="selectedTopicId" />
      </template>
      <SubjectMainContent :title="subject.title" :blocks="selectedBlocks" />
    </SubjectLayout>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SubjectMainContent from '../features/subjects/components/SubjectMainContent.vue'
import SubjectSidebar from '../features/subjects/components/SubjectSidebar.vue'
import SubjectLayout from '../features/subjects/layouts/SubjectLayout.vue'
import { useSubjectDetail } from '../composables/useSubjectDetail'
import { topicBlocks } from '../features/subjects/data/topicBlocks'

const { subject, isLoading, hasError } = useSubjectDetail()

const selectedTopicId = ref<string | null>(null)

const selectedBlocks = computed(() => {
  if (!selectedTopicId.value) {
    return []
  }

  return topicBlocks[selectedTopicId.value] ?? []
})
</script>
