<template>
  <div
    class="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)] font-sans"
    :data-theme="theme"
  >
    <Navbar @open-settings="openSettings" />
    <main
      class="min-h-screen pt-16 bg-[radial-gradient(circle_at_top_left,var(--app-bg-glow),transparent_45%)]"
    >
      <slot />
    </main>
    <SettingsModal :is-open="isSettingsOpen" @close="isSettingsOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from './theme'
import Navbar from '../components/Navbar.vue'
import SettingsModal from '../components/SettingsModal.vue'

const { theme } = useTheme()
const isSettingsOpen = ref(false)

// Expose method to open settings modal
const openSettings = () => {
  isSettingsOpen.value = true
}

defineExpose({
  openSettings
})
</script>
