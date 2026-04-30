<template>
  <nav class="sticky top-0 z-50 border-b border-[var(--panel-border)] bg-[var(--panel-bg)]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <RouterLink
          to="/"
          class="group flex items-center gap-3 text-[var(--app-text)] transition hover:text-blue-300"
        >
          <span class="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--panel-border)] bg-[var(--sidebar-active)]">
            <Layers3 class="h-5 w-5 text-blue-400" />
          </span>
          <span class="text-lg font-semibold">Fution</span>
        </RouterLink>

        <div class="hidden items-center gap-1 md:flex">
          <RouterLink
            to="/"
            class="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-[var(--app-muted)] transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)]"
            :class="{ 'bg-[var(--sidebar-active)] text-[var(--app-text)]': $route.path === '/' }"
          >
            <Home class="h-4 w-4" />
            Home
          </RouterLink>
          <RouterLink
            to="/subjects"
            class="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-[var(--app-muted)] transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)]"
            :class="{ 'bg-[var(--sidebar-active)] text-[var(--app-text)]': $route.path.startsWith('/subjects') }"
          >
            <BookOpen class="h-4 w-4" />
            Subjects
          </RouterLink>
          <RouterLink
            to="/admin"
            class="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-[var(--app-muted)] transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)]"
            :class="{ 'bg-[var(--sidebar-active)] text-[var(--app-text)]': $route.path.startsWith('/admin') }"
          >
            <LayoutDashboard class="h-4 w-4" />
            Admin
          </RouterLink>
          <button
            type="button"
            @click="$emit('open-settings')"
            class="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-[var(--app-muted)] transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)]"
          >
            <Settings class="h-4 w-4" />
            Settings
          </button>
        </div>

        <button
          type="button"
          @click="isMenuOpen = !isMenuOpen"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--app-muted)] transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)] md:hidden"
          :aria-label="isMenuOpen ? 'Close navigation' : 'Open navigation'"
          :aria-expanded="isMenuOpen"
        >
          <X v-if="isMenuOpen" class="h-5 w-5" />
          <Menu v-else class="h-5 w-5" />
        </button>
      </div>

      <div
        v-if="isMenuOpen"
        class="border-t border-[var(--panel-border)] py-3 md:hidden"
      >
        <div class="grid gap-1">
          <RouterLink
            to="/"
            @click="isMenuOpen = false"
            class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[var(--app-muted)] transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)]"
            :class="{ 'bg-[var(--sidebar-active)] text-[var(--app-text)]': $route.path === '/' }"
          >
            <Home class="h-4 w-4" />
            Home
          </RouterLink>
          <RouterLink
            to="/subjects"
            @click="isMenuOpen = false"
            class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[var(--app-muted)] transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)]"
            :class="{ 'bg-[var(--sidebar-active)] text-[var(--app-text)]': $route.path.startsWith('/subjects') }"
          >
            <BookOpen class="h-4 w-4" />
            Subjects
          </RouterLink>
          <RouterLink
            to="/admin"
            @click="isMenuOpen = false"
            class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[var(--app-muted)] transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)]"
            :class="{ 'bg-[var(--sidebar-active)] text-[var(--app-text)]': $route.path.startsWith('/admin') }"
          >
            <LayoutDashboard class="h-4 w-4" />
            Admin
          </RouterLink>
          <button
            type="button"
            @click="$emit('open-settings'); isMenuOpen = false"
            class="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--app-muted)] transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)]"
          >
            <Settings class="h-4 w-4" />
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
import { BookOpen, Home, Layers3, LayoutDashboard, Menu, Settings, X } from 'lucide-vue-next'

defineEmits<{
  'open-settings': []
}>()

const isMenuOpen = ref(false)
</script>
