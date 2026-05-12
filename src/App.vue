<template>
  <AppShell ref="appShellRef" @open-settings="openSettings">
    <RouterView @open-settings="openSettings" />
  </AppShell>
  
  <AdminAuthModal v-model="isAuthModalOpen" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppShell from './app/AppShell.vue'
import { useTheme } from './app/theme'
import AdminAuthModal from './admin/auth/AdminAuthModal.vue'

const { loadTheme } = useTheme()
const appShellRef = ref()
const isAuthModalOpen = ref(false)
const route = useRoute()

// Listen for settings open event from navbar
const openSettings = () => {
  appShellRef.value?.openSettings()
}

// Watch for auth query param to trigger admin login modal
watch(() => route.query.auth, (val) => {
  if (val === 'admin') {
    isAuthModalOpen.value = true
  }
}, { immediate: true })

// Load theme on app initialization
onMounted(() => {
  loadTheme()
})

// Expose to global scope for navbar
;(window as any).openSettings = openSettings
</script>
