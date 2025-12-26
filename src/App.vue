<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'

const sidebarOpen = ref(false)
const mobileMenuToggle = () => {
  sidebarOpen.value = !sidebarOpen.value
  
  // Toggle sidebar and overlay visibility
  const sidebar = document.getElementById('sidebar')
  const overlay = document.getElementById('sidebar-overlay')
  
  if (sidebar && overlay) {
    if (sidebarOpen.value) {
      sidebar.classList.remove('-translate-x-full')
      overlay.classList.remove('hidden')
    } else {
      sidebar.classList.add('-translate-x-full')
      overlay.classList.add('hidden')
    }
  }
  
  // Animate hamburger bars
  const bar1 = document.getElementById('bar1')
  const bar2 = document.getElementById('bar2')
  const bar3 = document.getElementById('bar3')
  
  if (bar1 && bar2 && bar3) {
    if (sidebarOpen.value) {
      bar1.style.transform = 'rotate(45deg) translate(6px, 6px)'
      bar2.style.opacity = '0'
      bar3.style.transform = 'rotate(-45deg) translate(6px, -6px)'
    } else {
      bar1.style.transform = 'rotate(0) translate(0, 0)'
      bar2.style.opacity = '1'
      bar3.style.transform = 'rotate(0) translate(0, 0)'
    }
  }
}

const closeSidebar = () => {
  if (sidebarOpen.value) {
    mobileMenuToggle()
  }
}
</script>

<template>
  <div class="h-dvh overflow-hidden flex font-sans text-white bluue scrollbar-thin-gray">
    <!-- Page Loader (optional - could be a separate component) -->
    <!-- <PageLoader v-if="loading" /> -->

    <!-- Mobile Header -->
    <div class="fixed top-0 left-0 right-0 z-50 flex lg:hidden">
      <!-- Mobile menu toggle button -->
      <button
        @click="mobileMenuToggle"
        class="w-12 h-16 bg-gradient-to-t from-gray-800 to-gray-900 border-b border-gray-700 flex items-center justify-center hover:bg-gray-700/50 transition-all duration-200 bg-gray-800"
      >
        <div class="w-6 h-6 flex flex-col justify-center space-y-1">
          <span class="block w-6 h-0.5 bg-white transition-all duration-200" id="bar1"></span>
          <span class="block w-6 h-0.5 bg-white transition-all duration-200" id="bar2"></span>
          <span class="block w-6 h-0.5 bg-white transition-all duration-200" id="bar3"></span>
        </div>
      </button>

      <!-- Mobile header content -->
      <header class="flex-1 bg-gradient-to-t from-gray-800 to-gray-900 h-16 border-b border-gray-700 border-opacity-70 flex items-center justify-between px-4 rounded-r-lg">
        <div class="flex items-center gap-2">
          <img src="/logo.png" alt="Fution Logo" class="w-10 h-10 rounded-lg" />
          <h2 class="text-lg font-bold">Fution</h2>
        </div>
      </header>
    </div>

    <!-- Sidebar -->
    <Sidebar @close="closeSidebar" />

    <!-- Main Content (Router View) -->
    <router-view />

    <!-- Toast Notification (could be a separate component) -->
    <div
      id="fusionToast"
      class="fixed top-5 right-5 z-50 hidden px-6 py-4 rounded-2xl shadow-lg text-white bg-gradient-to-r from-blue-900/60 to-black animate-slide-in"
    >
      <p id="toastMessage" class="font-sans"></p>
    </div>
  </div>
</template>

<style>
/* Import Tailwind and custom styles */
@import '@/assets/styles/main.css';
</style>
