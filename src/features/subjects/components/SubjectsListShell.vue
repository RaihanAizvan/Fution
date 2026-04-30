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
      <RouterLink
        to="/settings"
        class="rounded-lg border border-[var(--panel-border)] bg-[var(--panel-bg)] p-2 transition hover:bg-[var(--sidebar-active)]"
        title="Settings"
      >
        <svg class="h-6 w-6 text-[var(--app-text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </RouterLink>
    </div>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
