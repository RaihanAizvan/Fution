<template>
  <nav class="fixed inset-x-0 top-0 z-50 border-b border-[var(--panel-border)] bg-[var(--panel-bg)]">
    <div class="flex h-16 w-full items-center px-6">

      <!-- Logo -->
      <RouterLink
        to="/"
        class="group flex shrink-0 items-center gap-3 text-[var(--app-text)] transition hover:text-blue-300"
      >
        <img
          src="/logo/logo.png"
          alt="Fution Logo"
          class="h-10 w-10 rounded-xl object-cover"
        />

        <div class="flex flex-col leading-none">
          <span class="text-lg font-semibold tracking-tight">
            Fution
          </span>

          <span class="text-[10px] uppercase tracking-[0.28em] text-[var(--app-muted)]">
            <span class="font-bold text-[var(--app-text)]">Fut</span>ure of Educat<span class="font-bold text-[var(--app-text)]">ion</span>
          </span>
        </div>
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden flex-1 items-center justify-center gap-1 md:flex">
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

      <!-- Mobile Menu Button -->
      <button
        type="button"
        @click="isMenuOpen = !isMenuOpen"
        class="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--app-muted)] transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)] md:hidden"
        :aria-label="isMenuOpen ? 'Close navigation' : 'Open navigation'"
        :aria-expanded="isMenuOpen"
      >
        <X v-if="isMenuOpen" class="h-5 w-5" />
        <Menu v-else class="h-5 w-5" />
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div
      v-if="isMenuOpen"
      class="border-t border-[var(--panel-border)] bg-[var(--panel-bg)] py-3 md:hidden"
    >
      <div class="grid gap-1 px-4">
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
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { BookOpen, Home, LayoutDashboard, Menu, Settings, X } from 'lucide-vue-next'

defineEmits<{
  'open-settings': []
}>()

const isMenuOpen = ref(false)
</script>
