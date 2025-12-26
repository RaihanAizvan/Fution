<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  add: [title: string]
}>()

const topicInput = ref('')
const isVisible = ref(true)
let inactivityTimer: number | null = null

const handleAdd = () => {
  const title = topicInput.value.trim()
  if (!title) return
  
  emit('add', title)
  topicInput.value = ''
  resetInactivityTimer()
}

const resetInactivityTimer = () => {
  isVisible.value = true
  
  if (inactivityTimer) {
    clearTimeout(inactivityTimer)
  }
  
  inactivityTimer = window.setTimeout(() => {
    // Don't hide if user is typing
    if (document.activeElement !== document.querySelector('#topicInput')) {
      isVisible.value = false
    }
  }, 3000)
}

const handleActivity = () => {
  resetInactivityTimer()
}

onMounted(() => {
  // Listen for user activity
  const events = ['scroll', 'mousemove', 'mousedown', 'keypress', 'touchstart']
  events.forEach(event => {
    window.addEventListener(event, handleActivity)
  })
  
  resetInactivityTimer()
})

onUnmounted(() => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer)
  }
  
  const events = ['scroll', 'mousemove', 'mousedown', 'keypress', 'touchstart']
  events.forEach(event => {
    window.removeEventListener(event, handleActivity)
  })
})
</script>

<template>
  <div 
    class="flex items-center sticky bottom-0 rounded-lg space-x-2 mt-4 py-2 transition-transform duration-300 ease-in-out"
    :class="{ 'translate-y-full': !isVisible }"
  >
    <input
      id="topicInput"
      v-model="topicInput"
      type="text"
      placeholder="Add your own topic..."
      class="flex-1 px-4 py-2 rounded-lg bg-gradient-to-t from-gray-900 to-gray-900 border border-gray-700 border-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
      @keypress.enter="handleAdd"
      @focus="resetInactivityTimer"
    />
    <button
      @click="handleAdd"
      class="px-4 py-2 pb-3 rounded-md bg-gradient-to-t from-black to-blue-800/30 border border-gray-700 hover:bg-blue-600/40 hover:border-blue-500 text-white text-sm font-semibold transition-all duration-200"
    >
      Add
    </button>
  </div>
</template>
