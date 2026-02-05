<template>
  <div class="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)]">
    <div class="mx-auto flex w-full max-w-7xl gap-8 px-6 py-10">
      <aside class="hidden w-64 shrink-0 lg:block">
        <div class="sticky top-10 flex min-h-[calc(100vh-5rem)] flex-col rounded-2xl bg-[var(--panel-bg)] p-6">
          <div>
            <h1 class="text-lg font-semibold">Admin Console</h1>
            <p class="text-xs text-[var(--app-muted)]">Content operations</p>
          </div>
          <nav class="mt-6 grid gap-2 text-sm">
            <RouterLink
              to="/admin/subjects"
              class="rounded-xl px-3 py-2 text-[var(--app-text)]/70 transition hover:bg-[var(--sidebar-active)]"
              active-class="bg-[var(--sidebar-active)] text-[var(--app-text)]"
            >
              Subjects
            </RouterLink>
          </nav>
          <div class="mt-auto rounded-xl bg-[var(--app-bg)] p-4 text-xs text-[var(--app-muted)]">
            Keep changes focused. Use the lists to manage subject trees.
          </div>
        </div>
      </aside>

      <div class="flex-1">
        <header class="mb-6 flex flex-wrap items-center justify-between gap-4 lg:hidden">
          <div>
            <h1 class="text-2xl font-semibold">Admin Console</h1>
            <p class="text-sm text-[var(--app-muted)]">Manage subjects, topics, and content.</p>
          </div>
          <RouterLink
            to="/admin/subjects"
            class="rounded-full bg-[var(--sidebar-active)] px-4 py-2 text-sm"
          >
            Subjects
          </RouterLink>
        </header>
        <main class="pb-16">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
