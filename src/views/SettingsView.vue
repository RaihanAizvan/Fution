<template>
  <section class="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)]">
    <div class="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 lg:flex-row">
      <aside class="w-full max-w-xs rounded-2xl bg-[var(--panel-bg)] p-4">
        <h2 class="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Settings</h2>
        <nav class="grid gap-2 text-sm">
          <button
            type="button"
            class="rounded-xl px-3 py-2 text-left transition"
            :class="activeTab === 'appearance'
              ? 'bg-[var(--sidebar-active)] text-[var(--app-text)]'
              : 'text-[var(--app-muted)] hover:bg-[var(--sidebar-active)]'"
            @click="activeTab = 'appearance'"
          >
            Appearance
          </button>
          <button
            type="button"
            class="rounded-xl px-3 py-2 text-left transition"
            :class="activeTab === 'language'
              ? 'bg-[var(--sidebar-active)] text-[var(--app-text)]'
              : 'text-[var(--app-muted)] hover:bg-[var(--sidebar-active)]'"
            @click="activeTab = 'language'"
          >
            Language
          </button>
          <button
            type="button"
            class="rounded-xl px-3 py-2 text-left transition"
            :class="activeTab === 'notifications'
              ? 'bg-[var(--sidebar-active)] text-[var(--app-text)]'
              : 'text-[var(--app-muted)] hover:bg-[var(--sidebar-active)]'"
            @click="activeTab = 'notifications'"
          >
            Notifications
          </button>
          <button
            type="button"
            class="rounded-xl px-3 py-2 text-left transition"
            :class="activeTab === 'shortcuts'
              ? 'bg-[var(--sidebar-active)] text-[var(--app-text)]'
              : 'text-[var(--app-muted)] hover:bg-[var(--sidebar-active)]'"
            @click="activeTab = 'shortcuts'"
          >
            Shortcuts
          </button>
        </nav>
      </aside>

      <main class="flex-1 rounded-2xl bg-[var(--panel-bg)] p-6">
        <template v-if="activeTab === 'appearance'">
          <header class="mb-6">
            <p class="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Appearance</p>
            <h1 class="mt-2 text-2xl font-semibold">Choose a theme</h1>
            <p class="mt-2 text-sm text-[var(--app-muted)]">
              Match the mood of your learning space. Preview and apply instantly.
            </p>
          </header>

          <div class="grid gap-4 sm:grid-cols-3">
            <button
              v-for="themeOption in themes"
              :key="themeOption"
              type="button"
              class="rounded-2xl border border-transparent p-4 text-left transition"
              :class="themeOption === theme
                ? 'border-[var(--accent)] bg-[var(--sidebar-active)]'
                : 'bg-[var(--app-bg)]/50 hover:border-[var(--accent)]'"
              @click="setTheme(themeOption)"
            >
              <div class="mb-4 h-24 w-full rounded-xl bg-[var(--panel-bg)] p-3">
                <div class="h-3 w-1/2 rounded-full bg-[var(--sidebar-active)]" />
                <div class="mt-3 space-y-2">
                  <div class="h-2 w-full rounded-full bg-[var(--app-muted)]/30" />
                  <div class="h-2 w-4/5 rounded-full bg-[var(--app-muted)]/30" />
                  <div class="h-2 w-2/3 rounded-full bg-[var(--app-muted)]/30" />
                </div>
              </div>
              <p class="text-sm font-medium capitalize">{{ themeOption }}</p>
              <p class="text-xs text-[var(--app-muted)]">Preview</p>
            </button>
          </div>
        </template>

        <div v-else class="text-sm text-[var(--app-muted)]">
          Placeholder settings content coming soon.
        </div>
      </main>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '../app/theme'

const activeTab = ref<'appearance' | 'language' | 'notifications' | 'shortcuts'>('appearance')
const { theme, themes, setTheme } = useTheme()
</script>
