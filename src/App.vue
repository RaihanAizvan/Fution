<template>
  <AppShell ref="appShellRef" @open-settings="openSettings">
    <RouterView @open-settings="openSettings" />
  </AppShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import AppShell from './app/AppShell.vue'

const appShellRef = ref()

// Listen for settings open event from navbar
const openSettings = () => {
  appShellRef.value?.openSettings()
}

// Expose to global scope for navbar
;(window as any).openSettings = openSettings
</script>
