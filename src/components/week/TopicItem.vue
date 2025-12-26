<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Topic } from '../../data/types'

const props = defineProps<{
  topic: Topic
  topicKey: string
  isChecked: boolean
  isUserTopic?: boolean
}>()

const emit = defineEmits<{
  toggle: [topicKey: string]
  delete: [topicKey: string]
}>()

const isExpanded = ref(false)
const hasDetails = computed(() => !!props.topic.details)

const difficultyColors: Record<string, string> = {
  'Beginner': 'bg-green-500',
  'Intermediate': 'bg-orange-500',
  'Advanced': 'bg-red-500',
  'Beginner → Intermediate': 'bg-gradient-to-r from-green-500 to-orange-500',
  'Intermediate → Advanced': 'bg-gradient-to-r from-orange-500 to-red-500'
}

const difficultyColor = computed(() => 
  difficultyColors[props.topic.difficulty || ''] || 'bg-gray-400'
)

const toggleExpand = () => {
  if (hasDetails.value) {
    isExpanded.value = !isExpanded.value
  }
}
</script>

<template>
  <!-- Heading type -->
  <div v-if="topic.type === 'heading'" class="text-md uppercase tracking-wider text-white px-2 py-4 font-bold">
    {{ topic.title }}
  </div>

  <!-- Regular topic -->
  <div v-else class="accordion-item border-b border-gray-700/30 last:border-b-0" :data-topic-key="topicKey">
    <!-- Heading -->
    <div class="accordion-heading flex items-center justify-between p-2 cursor-pointer hover:bg-gray-700/20 transition-all duration-200">
      <div class="flex items-center space-x-3 flex-1" @click="toggleExpand">
        <!-- Checkbox -->
        <label class="relative cursor-pointer flex items-center" @click.stop>
          <input type="checkbox" class="hidden" :checked="isChecked" @change="emit('toggle', topicKey)" />
          <div 
            class="w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200"
            :class="isChecked ? 'bg-blue-500 border-blue-500' : 'border-gray-500 bg-white/10 backdrop-blur-sm'"
          >
            <svg 
              v-show="isChecked"
              class="w-3 h-3 text-white" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </label>

        <!-- Title and difficulty dot -->
        <div class="flex items-center space-x-2">
          <p class="text-white/90">{{ topic.title }}</p>
          <span class="w-1 h-1 rounded-full" :class="difficultyColor"></span>
        </div>

        <!-- Delete button for user topics -->
        <button
          v-if="isUserTopic"
          @click.stop="emit('delete', topicKey)"
          class="relative w-6 h-6 rounded-full border border-white/60 bg-transparent hover:bg-red-500/20 hover:border-red-400 flex items-center justify-center transition-all duration-200 ml-auto flex-shrink-0"
          type="button"
          :aria-label="`Delete topic: ${topic.title}`"
        >
          <span class="text-white/80 hover:text-red-400 text-sm font-bold leading-none" style="font-size: 12px; line-height: 1">−</span>
        </button>
      </div>

      <!-- Chevron for expandable topics -->
      <span v-if="hasDetails">
        <svg 
          class="w-4 h-4 text-gray-400 transition-transform duration-300" 
          :class="{ 'rotate-180': isExpanded }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>

    <!-- Expandable details panel -->
    <transition name="accordion">
      <div v-if="hasDetails && isExpanded" class="accordion-panel overflow-hidden">
        <div class="p-4 lg:ml-8 border border-gray-800 rounded-lg text-gray-300" v-html="topic.details"></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 1000px;
  opacity: 1;
}
</style>
