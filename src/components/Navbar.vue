<template>
  <nav class="sticky top-0 z-50 border-b border-[var(--panel-border)] bg-[var(--panel-bg)]/95 backdrop-blur-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo/Home -->
        <RouterLink
          to="/"
          class="flex items-center gap-2 font-bold text-[var(--app-text)] hover:text-blue-400 transition"
        >
          <svg class="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span class="text-xl">Fution</span>
        </RouterLink>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center gap-8">
          <RouterLink
            to="/subjects"
            class="text-[var(--app-muted)] hover:text-[var(--app-text)] transition font-medium"
            :class="{ 'text-[var(--app-text)]': $route.path.startsWith('/subjects') }"
          >
            Subjects
          </RouterLink>
          <button
            type="button"
            @click="$emit('open-settings')"
            class="text-[var(--app-muted)] hover:text-[var(--app-text)] transition font-medium"
          >
            Settings
          </button>
        </div>

        <!-- Mobile menu button -->
        <button
          type="button"
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden rounded-lg p-2 text-[var(--app-muted)] hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)] transition"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!isMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div
        v-if="isMenuOpen"
        class="md:hidden border-t border-[var(--panel-border)] py-4"
      >
        <div class="flex flex-col gap-4">
          <RouterLink
            to="/subjects"
            @click="isMenuOpen = false"
            class="text-[var(--app-muted)] hover:text-[var(--app-text)] transition font-medium px-2 py-1"
            :class="{ 'text-[var(--app-text)] bg-[var(--sidebar-active)] rounded-lg': $route.path.startsWith('/subjects') }"
          >
            Subjects
          </RouterLink>
          <button
            type="button"
            @click="$emit('open-settings'); isMenuOpen = false"
            class="text-[var(--app-muted)] hover:text-[var(--app-text)] transition font-medium px-2 py-1 text-left"
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

defineEmits<{
  'open-settings': []
}>()

const isMenuOpen = ref(false)
</script>