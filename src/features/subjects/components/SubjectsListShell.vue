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
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <RouterLink
            to="/"
            class="mb-3 inline-flex items-center gap-2 text-sm text-[var(--app-muted)] transition hover:text-[var(--app-text)]"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </RouterLink>
          <h1 class="text-4xl font-bold text-[var(--app-text)]">Explore Subjects</h1>
          <p class="mt-2 text-[var(--app-muted)]">Choose a subject to begin your learning journey</p>
        </div>

        <div class="flex items-center gap-3">
          <div class="hidden sm:block">
            <RouterLink
              to="/settings"
              class="rounded-lg border border-[var(--panel-border)] bg-[var(--panel-bg)] p-2 transition hover:bg-[var(--sidebar-active)]"
              title="Settings"
            >
              <svg class="h-6 w-6 text-[var(--app-text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v4m0 8v4m8-8h-4M4 12H0" />
              </svg>
            </RouterLink>
          </div>

          <div class="w-full sm:w-80">
            <div class="relative">
              <svg class="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[var(--app-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              <input
                v-model="query"
                type="search"
                placeholder="Search subjects..."
                class="w-full rounded-xl border border-[var(--panel-border)] bg-[var(--panel-bg)] py-2 pl-10 pr-4 text-[var(--app-text)] placeholder:text-[var(--app-muted)] focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Search subjects"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <slot :query="query" />
      </div>
    </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const query = ref('')
</script>
