<template>
  <div
    class="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)] font-sans"
    :data-theme="theme"
  >
    <div class="flex justify-end px-6 pt-6">
      <button
        type="button"
        class="rounded-full border border-[var(--panel-border)] bg-[var(--panel-bg)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--app-text)]/70 transition hover:text-[var(--app-text)]"
        @click="cycleTheme"
      >
        {{ themeLabel }} theme
      </button>
    </div>
    <main
      class="min-h-screen bg-[radial-gradient(circle_at_top_left,var(--app-bg-glow),transparent_45%)]"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const themes = ['dark', 'light', 'blue'] as const
const themeIndex = ref(0)

const theme = computed(() => themes[themeIndex.value])
const themeLabel = computed(() => theme.value)

const cycleTheme = () => {
  themeIndex.value = (themeIndex.value + 1) % themes.length
}
</script>
