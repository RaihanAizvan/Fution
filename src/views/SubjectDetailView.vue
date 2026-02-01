<template>
  <section class="subject-detail">
    <header class="subject-detail__header">
      <h1>Subject</h1>
    </header>
    <p v-if="isLoading">Loading subject…</p>
    <p v-else-if="hasError">Unable to load subject.</p>
    <p v-else-if="!subject">Subject not found.</p>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
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
