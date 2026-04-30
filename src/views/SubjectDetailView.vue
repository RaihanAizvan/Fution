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
        :title="selectedTopicTitle || subject.title"
        :html="topicContent?.html || null"
        :isLoading="contentLoading"
        :hasError="contentHasError"
        :errorMessage="contentError"
        :subjectTitle="subject.title"
        :topicTitle="selectedTopicTitle"
        @back="goBack"
      />
      <template #toc>
        <TableOfContents :html="topicContent?.html || null" />
      </template>
    </SubjectLayout>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'  
import { useRoute, useRouter } from 'vue-router'
import SubjectMainContent from '../features/subjects/components/SubjectMainContent.vue'
import SubjectSidebar from '../features/subjects/components/SubjectSidebar.vue'
import TableOfContents from '../features/subjects/components/TableOfContents.vue'
import SubjectLayout from '../features/subjects/layouts/SubjectLayout.vue'
import { useSubjectDetail } from '../composables/useSubjectDetail'
import { useTopicContent } from '../composables/useTopicContent'

const route = useRoute()
const router = useRouter()
const { subject, isLoading, hasError } = useSubjectDetail()

const selectedTopicSlug = computed(() => route.params.topicSlug as string | null)
const {
  content: topicContent,
  isLoading: contentLoading,
  hasError: contentHasError,
  error: contentError
} = useTopicContent(() => selectedTopicSlug.value)

const selectedTopicTitle = computed(() => topicContent.value?.topic.title || null)

const goBack = () => {
  router.back()
}
</script>
