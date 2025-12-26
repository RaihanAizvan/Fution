<script setup lang="ts">
import { computed } from 'vue'
import { useProgressCircle } from '../../composables/useProgressCircle'

const props = defineProps<{
  weekNumber: number
  title: string
  subtitle: string
  progressPercentage: number
  completedTopics: number
  totalTopics: number
}>()

const { circumference, getStrokeDashoffset } = useProgressCircle(40)

const strokeDashoffset = computed(() => getStrokeDashoffset(props.progressPercentage))
</script>

<template>
  <div class="grid lg:grid-cols-3 gap-6 text-center mb-8 sm:mt-10 fade-up lg:pr-24">
    <!-- Week Header - takes 2 columns on large screens -->
    <div class="lg:col-span-2">
      <div class="inline-flex items-center space-x-4 border border-gray-700 border-opacity-70 px-6 py-4 rounded-2xl mb-6">
        <div class="w-16 h-16 bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-70 rounded-xl flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
          </svg>
        </div>
        <div class="text-left">
          <h1 class="text-3xl lg:text-4xl font-bold">WEEK {{ String(weekNumber).padStart(2, '0') }}</h1>
          <p class="text-gray-400 text-lg">{{ title }} {{ subtitle }}</p>
        </div>
      </div>
    </div>

    <!-- Progress Tracker - takes 1 column on large screens -->
    <div class="flex items-center pr-12 justify-center gap-6">
      <div class="relative">
        <svg class="w-24 h-24" viewBox="0 0 96 96">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.25" />
              <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
            </radialGradient>
          </defs>
          <g transform="rotate(-90 48 48)">
            <circle cx="48" cy="48" r="40" fill="url(#glow)" />
            <circle cx="48" cy="48" r="44" stroke="currentColor" stroke-width="1" fill="transparent" class="text-gray-700/10" />
            <circle cx="48" cy="48" r="34" stroke="currentColor" stroke-width="1.5" fill="transparent" class="text-gray-700/30" />
            <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="6" fill="transparent" class="text-gray-700/60" />
            <circle 
              cx="48" 
              cy="48" 
              r="40" 
              stroke="currentColor" 
              stroke-width="6" 
              fill="transparent"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="strokeDashoffset"
              class="text-blue-500 transition-all duration-600"
              style="transition: stroke-dashoffset 0.6s cubic-bezier(.4,2,.6,1);"
              stroke-linecap="round"
            />
          </g>
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-2xl font-extrabold text-white drop-shadow">{{ progressPercentage }}%</span>
          <span class="text-xs text-gray-400 mt-1 tracking-wide">{{ completedTopics }} / {{ totalTopics }}</span>
        </div>
      </div>
      <div class="flex flex-col justify-center">
        <div class="text-lg font-semibold text-white/90 tracking-tight flex items-center gap-2">
          Progress Tracker
        </div>
        <div class="text-sm text-gray-400 mt-1">Track your weekly mastery</div>
        <div class="flex items-center gap-2 mt-2">
          <div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span class="text-xs text-gray-500">Auto-saves progress</span>
        </div>
      </div>
    </div>
  </div>
</template>
