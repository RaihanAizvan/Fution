<template>
  <div class="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)]">
    <header class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
      <div>
        <h1 class="text-2xl font-semibold">Admin Console</h1>
        <p class="text-sm text-[var(--app-muted)]">Manage subjects, topics, and content.</p>
      </div>
      <nav class="flex items-center gap-3 text-sm">
        <RouterLink
          to="/admin/subjects"
          class="rounded-full bg-[var(--sidebar-active)] px-4 py-2 text-[var(--app-text)]"
        >
          Subjects
        </RouterLink>
      </nav>
    </header>
    <main class="mx-auto w-full max-w-6xl px-6 pb-16">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
