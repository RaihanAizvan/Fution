<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { sidebarConfig, motivationalQuotes } from '../../data'

// Get current route to determine active week
const route = useRoute()

// Random motivational quote
const randomQuote = computed(() => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
  return motivationalQuotes[randomIndex]
})

// Check if Fution Space is active
const isFutionSpaceActive = computed(() => route.name === 'fution-space')

// Check if specific week is active
const isWeekActive = (weekId: number) => {
  return route.name === 'week' && Number(route.params.id) === weekId
}

// Mobile menu visibility handled by parent
const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <!-- Sidebar overlay for mobile -->
  <div 
    id="sidebar-overlay" 
    class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden lg:hidden"
    @click="emit('close')"
  ></div>

  <!-- Sidebar -->
  <nav 
    id="sidebar" 
    class="flex flex-col h-screen fixed top-0 left-0 w-64 lg:w-96 bluue border-r border-gray-700/70 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-50"
  >
    <!-- Header -->
    <div class="p-6 flex-shrink-0">
      <button 
        id="close-sidebar-button" 
        class="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
        @click="emit('close')"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <router-link :to="sidebarConfig.weeks[0].href">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
            <img :src="sidebarConfig.logo.src" :alt="sidebarConfig.logo.alt" class="w-8 h-8 rounded" />
          </div>
          <div>
            <h1 class="text-xl font-bold">{{ sidebarConfig.logo.title }}</h1>
            <p class="text-sm text-gray-400">{{ sidebarConfig.logo.subtitle }}</p>
          </div>
        </div>
      </router-link>

      <!-- Fution Space Link -->
      <div class="space-y-2">
        <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Fution Space</h2>
        <router-link 
          to="/fution-space" 
          class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
          :class="isFutionSpaceActive ? 'bg-gray-700/50 border border-blue-500' : 'hover:bg-gray-700/50'"
        >
          <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
            <div class="w-5 h-5 bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-70 rounded-xl flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M2.93 19.07A10 10 0 1 1 19.07 5.93 10 10 0 0 1 2.93 19.07zm1.41-1.41A8 8 0 1 0 18.59 4.42 8 8 0 0 0 4.34 17.66"/>
              </svg>
            </div>
          </div>
          <div>
            <div class="font-medium">Fution Space</div>
            <div class="text-xs text-gray-400">Your personal learning hub</div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Weeks List -->
    <div class="px-6 flex-grow overflow-y-auto scrollbar-thin-gray">
      <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Weeks</h2>
      <div class="space-y-2">
        <router-link
          v-for="week in sidebarConfig.weeks"
          :key="week.id"
          :to="week.href"
          class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 week-item"
          :class="{ 'active-week': isWeekActive(week.id) }"
        >
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            :class="isWeekActive(week.id) ? 'bg-blue-500 text-white' : 'bg-gray-600'"
          >
            {{ week.id }}
          </div>
          <div>
            <div class="font-medium">{{ week.title }}</div>
            <div class="text-xs text-gray-400">{{ week.subtitle }}</div>
          </div>
          <div v-if="isWeekActive(week.id)" class="ml-auto">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Footer -->
    <div class="p-6 flex-shrink-0">
      <div class="text-xs p-4 border border-gray-700/70 rounded-lg mb-4">
        <h3 class="text-sm font-semibold mb-3 flex items-center gap-2">
          <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M7 17a4 4 0 0 1 4-4h1V7a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h2zm10 0a4 4 0 0 1 4-4h1V7a4 4 0 0 0-4-4h-2a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h2z"/>
          </svg>
          Random Quote
        </h3>
        <blockquote class="italic text-gray-300">
          "{{ randomQuote.text }}"<br>
          <span class="text-xs text-gray-500">— {{ randomQuote.category }}</span>
        </blockquote>
      </div>

      <div class="border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        <div class="flex items-center justify-center space-x-2">
          <img :src="sidebarConfig.footer.img" :alt="sidebarConfig.logo.alt" class="w-6 h-6" />
          <div>
            <p>{{ sidebarConfig.footer.copyright }}</p>
            <p>
              {{ sidebarConfig.footer.author.text }} 
              <a :href="sidebarConfig.footer.author.url" class="hover:text-white hover:underline" target="_blank">
                {{ sidebarConfig.footer.author.name }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.active-week {
  @apply bg-gray-700/30;
}
</style>
