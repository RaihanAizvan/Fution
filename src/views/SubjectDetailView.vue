<template>
  <section class="subject-detail">
    <p v-if="isLoading">Loading subject…</p>
    <p v-else-if="hasError">Unable to load subject.</p>
    <p v-else-if="!subject">Subject not found.</p>

    <SubjectLayout v-else>
      <template #sidebar>
        <SubjectSidebar />
      </template>
      <SubjectMainContent
        :title="content?.topic.title || subject.title"
        :html="content?.html || null"
        :isLoading="blocksLoading"
        :hasError="blocksHasError"
        :errorMessage="blocksError"
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
import { useTopicContent } from '../composables/useTopicContent'

const route = useRoute()
const { subject, isLoading, hasError } = useSubjectDetail()

const selectedTopicSlug = computed(() => route.params.topicSlug as string | null)
const {
  content,
  isLoading: blocksLoading,
  error: blocksError,
  hasError: blocksHasError
} = useTopicContent(() => selectedTopicSlug.value)
</script>
