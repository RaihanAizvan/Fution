<template>
  <section class="subject-detail">
    <p v-if="isLoading">Loading subject…</p>
    <p v-else-if="hasError">Unable to load subject.</p>
    <p v-else-if="!subject">Subject not found.</p>

    <SubjectLayout v-else>
      <template #sidebar>
        <SubjectSidebar />
      </template>
      <SubjectMainContent :title="subject.title" />
    </SubjectLayout>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SubjectMainContent from '../features/subjects/components/SubjectMainContent.vue'
import SubjectSidebar from '../features/subjects/components/SubjectSidebar.vue'
import SubjectLayout from '../features/subjects/layouts/SubjectLayout.vue'
import { useSubjects } from '../composables/useSubjects'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { subject, isLoading, hasError, loadSubject } = useSubjects()

onMounted(() => {
  if (slug.value) {
    void loadSubject(slug.value)
  }
})
</script>
