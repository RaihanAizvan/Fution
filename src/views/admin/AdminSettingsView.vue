<template>
  <AdminLayout>
    <template #header>
      <div class="flex items-start justify-between">
        <div>
          <h2 class="text-3xl font-semibold">Settings</h2>
          <div class="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--app-muted)]">
            ADMIN / SETTINGS / APPEARANCE
          </div>
        </div>
      </div>
    </template>

    <section class="grid gap-6">
      <div class="grid gap-4 rounded-md bg-[var(--panel-bg)] p-6">
        <header>
          <p class="text-xs uppercase tracking-[0.3em] text-[var(--app-muted)]">Appearance</p>
          <h3 class="mt-2 text-xl font-semibold">Theme</h3>
          <p class="mt-2 text-sm text-[var(--app-muted)]">
            Choose the admin console theme.
          </p>
        </header>

        <div class="grid gap-4 sm:grid-cols-3">
          <button
            v-for="themeOption in themes"
            :key="themeOption"
            type="button"
            class="rounded-md border border-transparent p-4 text-left transition"
            :class="themeOption === theme
              ? 'border-[var(--accent)] bg-[var(--sidebar-active)]'
              : 'bg-[var(--app-bg)]/60 hover:border-[var(--accent)]'"
            @click="setTheme(themeOption)"
          >
            <div class="mb-4 h-24 w-full rounded-md bg-[var(--panel-bg)] p-3">
              <div class="h-3 w-1/2 rounded-md bg-[var(--sidebar-active)]" />
              <div class="mt-3 space-y-2">
                <div class="h-2 w-full rounded-md bg-[var(--app-muted)]/30" />
                <div class="h-2 w-4/5 rounded-md bg-[var(--app-muted)]/30" />
                <div class="h-2 w-2/3 rounded-md bg-[var(--app-muted)]/30" />
              </div>
            </div>
            <p class="text-sm font-medium capitalize">{{ themeOption }}</p>
            <p class="text-xs text-[var(--app-muted)]">Preview</p>
          </button>
        </div>
      </div>
    </section>
  </AdminLayout>
</template>

<script setup lang="ts">
import { useTheme } from '../../app/theme'
import AdminLayout from '../../admin/AdminLayout.vue'

const { theme, themes, setTheme } = useTheme()
</script>
