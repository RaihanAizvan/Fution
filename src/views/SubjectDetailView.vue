<template>
  <section class="subject-detail">
    <p v-if="isContentLoading">Loading subject…</p>
    <p v-else-if="hasContentError">Unable to load subject.</p>
    <p v-else-if="!subject">Subject not found.</p>

    <SubjectLayout v-else>
      <template #sidebar>
        <SubjectSidebar />
      </template>
      <SubjectMainContent
        :title="subject.title"
        :blocks="selectedBlocks"
        :isLoading="blocksLoading"
        :hasError="blocksHasError"
      />
    </SubjectLayout>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SubjectMainContent from '../features/subjects/components/SubjectMainContent.vue'
import SubjectSidebar from '../features/subjects/components/SubjectSidebar.vue'
import SubjectLayout from '../features/subjects/layouts/SubjectLayout.vue'
import { useSubjectDetail } from '../composables/useSubjectDetail'
import { useTopicBlocks } from '../composables/useTopicBlocks'

const route = useRoute()
const { subject, isLoading, hasError } = useSubjectDetail()

const selectedTopicSlug = computed(() => route.params.topicSlug as string | null)
const {
  blocks: selectedBlocks,
  isLoading: blocksLoading,
  hasError: blocksHasError
} = useTopicBlocks(() => selectedTopicSlug.value)

const isContentLoading = computed(() => isLoading.value || blocksLoading.value)
const hasContentError = computed(() => hasError.value || blocksHasError.value)
</script>
