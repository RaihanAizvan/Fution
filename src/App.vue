<template>
  <AppShell ref="appShellRef" @open-settings="openSettings">
    <RouterView @open-settings="openSettings" />
  </AppShell>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppShell from './app/AppShell.vue'
import { useTheme } from './app/theme'

const { loadTheme } = useTheme()
const appShellRef = ref()

// Listen for settings open event from navbar
const openSettings = () => {
  appShellRef.value?.openSettings()
}

// Load theme on app initialization
onMounted(() => {
  loadTheme()
})

// Expose to global scope for navbar
;(window as any).openSettings = openSettings
</script>

