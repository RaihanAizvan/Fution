<template>
  <section class="min-h-screen w-full px-6 py-10">
    <div class="mx-auto w-full max-w-7xl">


      <!-- Header -->
      <div class="mb-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">

        <!-- Left -->
        <div>
          <RouterLink to="/"
            class="mb-5 inline-flex items-center gap-2 text-sm text-[var(--app-muted)] transition hover:text-[var(--app-text)]">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>

            Back to Home
          </RouterLink>


          <h1 class="text-5xl font-bold tracking-tight text-[var(--app-text)]">
            Explore Subjects
          </h1>

          <p class="mt-4 max-w-2xl text-base leading-relaxed text-[var(--app-muted)]">
            Wander through disciplines. Pick a path. Build mastery one layer at a time.
          </p>
        </div>

        <!-- Right -->
        <div class="flex items-center gap-3">

          <!-- Search -->
          <div class="relative w-[340px]">
            <svg class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--app-muted)]"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>

            <input v-model="query" type="search" placeholder="Search subjects..."
              class="h-12 w-full rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] pl-12 pr-4 text-sm text-[var(--app-text)] placeholder:text-[var(--app-muted)] outline-none transition focus:border-blue-400" />
          </div>

          <!-- Settings -->
          <button
            class="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] text-[var(--app-muted)] transition hover:border-blue-400 hover:text-[var(--app-text)]">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0-6v2m0 16v2m10-10h-2M4 12H2" />
            </svg>
          </button>

        </div>
      </div>

      <!-- Stats -->
      <div class="mb-8">
        <div
          class="inline-flex items-center gap-4 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] px-5 py-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
            <svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.483 9.246 5 7.5 5 4.462 5 2 6.79 2 9v11c0-2.21 2.462-4 5.5-4 1.746 0 3.332.483 4.5 1.253m0-13C13.168 5.483 14.754 5 16.5 5c3.038 0 5.5 1.79 5.5 4v11c0-2.21-2.462-4-5.5-4-1.746 0-3.332.483-4.5 1.253" />
            </svg>
          </div>

          <div>
            <p class="text-2xl font-bold text-[var(--app-text)]">
              {{ filteredSubjects.length }}
            </p>

            <p class="text-sm text-[var(--app-muted)]">
              Subjects Available
            </p>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <div v-for="n in 8" :key="n"
          class="h-64 animate-pulse rounded-3xl border border-[var(--panel-border)] bg-[var(--panel-bg)]" />
      </div>

      <!-- Error -->
      <div v-else-if="hasError"
        class="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/5 text-center">
        <h2 class="text-2xl font-semibold text-[var(--app-text)]">
          Failed to load subjects
        </h2>

        <p class="mt-2 text-sm text-[var(--app-muted)]">
          Something collapsed in the background.
        </p>
      </div>

      <!-- Empty -->
      <div v-else-if="filteredSubjects.length === 0"
        class="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-[var(--panel-border)] bg-[var(--panel-bg)] text-center">
        <h2 class="text-2xl font-semibold text-[var(--app-text)]">
          No subjects found
        </h2>

        <p class="mt-2 text-sm text-[var(--app-muted)]">
          Your search drifted into empty territory.
        </p>
      </div>

      <!-- Subjects -->
      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <SubjectListItem v-for="subject in filteredSubjects" :key="subject.slug" :slug="subject.slug"
              :label="subject.title" :description="(subject.description) ? subject.description : 'No description yet'" />
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import SubjectListItem from './SubjectListItem.vue'
import { useSubjects } from '../../../composables/useSubjects'

const query = ref('')

const {
  subjects,
  isLoading,
  hasError,
  loadSubjects
} = useSubjects()

const filteredSubjects = computed(() => {
  const q = query.value.trim().toLowerCase()

  if (!q) return subjects.value

  return subjects.value.filter(subject => {
    return (
      subject.title.toLowerCase().includes(q) ||
      subject.slug.toLowerCase().includes(q)
    )
  })
})

onMounted(() => {
  void loadSubjects()
})

// Debug: log subjects payload from server for inspection
watch(subjects, (val) => {
  // eslint-disable-next-line no-console
  console.log('Subjects payload:', val)
}, { immediate: true })
</script>