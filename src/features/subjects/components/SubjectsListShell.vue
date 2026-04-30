<template>
  <section class="flex min-h-screen flex-col gap-8 px-6 py-12">
    <div class="flex items-center justify-between">
      <div>
        <RouterLink
          to="/"
          class="mb-4 inline-flex items-center gap-2 text-sm text-[var(--app-muted)] transition hover:text-[var(--app-text)]"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </RouterLink>
        <h1 class="text-4xl font-bold text-[var(--app-text)]">Explore Subjects</h1>
        <p class="mt-2 text-[var(--app-muted)]">Choose a subject to begin your learning journey</p>
      </div>
    </div>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
