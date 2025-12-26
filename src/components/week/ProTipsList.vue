<script setup lang="ts">
import type { ProTip } from '../../data/types'

defineProps<{
  proTips: ProTip[]
}>()

const getColorClasses = (color: string) => {
  const colorMap = {
    green: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      circle: 'bg-green-500'
    },
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      circle: 'bg-blue-500'
    },
    red: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      circle: 'bg-red-500'
    }
  }
  return colorMap[color as keyof typeof colorMap] || colorMap.blue
}
</script>

<template>
  <div class="border border-gray-700 border-opacity-70 rounded-2xl p-6 slide-right lg:overflow-y-auto h-[calc(100vh-220px)] scrollbar-thin-gray">
    <div class="flex items-center space-x-3 mb-6">
      <div class="w-10 h-10 bg-blue-500 bg-opacity-20 border border-blue-500 border-opacity-40 rounded-lg flex items-center justify-center">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      </div>
      <h2 class="text-xl font-bold">Pro Tips</h2>
    </div>
    
    <div class="space-y-4">
      <div
        v-for="(tip, index) in proTips"
        :key="index"
        class="px-4 py-3 cursor-pointer rounded-lg border transition-all duration-200"
        :class="[
          getColorClasses(tip.color).bg,
          getColorClasses(tip.color).border,
          'hover:bg-opacity-80'
        ]"
      >
        <div class="flex items-start space-x-3">
          <div 
            class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            :class="getColorClasses(tip.color).circle"
          >
            <span class="text-white text-sm font-bold">{{ index + 1 }}</span>
          </div>
          <p class="text-white/90 text-sm" v-html="tip.text"></p>
        </div>
      </div>
    </div>
  </div>
</template>
