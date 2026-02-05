<template>
  <div
    class="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)] font-sans"
    :data-theme="theme"
  >
    <main
      class="min-h-screen bg-[radial-gradient(circle_at_top_left,var(--app-bg-glow),transparent_45%)]"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from './theme'

const { theme } = useTheme()
</script>
