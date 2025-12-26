<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { loadWeekData } from '../data'
import { useWeekTracker } from '../composables/useWeekTracker'
import type { WeekData } from '../data/types'

import WeekHeader from '../components/week/WeekHeader.vue'
import TopicItem from '../components/week/TopicItem.vue'
import AddTopicBar from '../components/week/AddTopicBar.vue'
import ProTipsList from '../components/week/ProTipsList.vue'

const props = defineProps<{
  id: number
}>()

const weekData = ref<WeekData | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Initialize week tracker once data is loaded
const tracker = computed(() => {
  if (!weekData.value) return null
  return useWeekTracker(weekData.value.weekKey, weekData.value.topics)
})

// Load week data
const loadWeek = async (weekId: number) => {
  loading.value = true
  error.value = null
  
  try {
    weekData.value = await loadWeekData(weekId)
  } catch (err) {
    error.value = `Week ${weekId} not found`
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Watch for route changes
watch(() => props.id, (newId) => {
  loadWeek(newId)
}, { immediate: true })

// Handle topic actions
const handleToggleTopic = (topicKey: string) => {
  tracker.value?.toggleTopic(topicKey)
}

const handleAddTopic = (title: string) => {
  try {
    tracker.value?.addTopic(title)
  } catch (err) {
    alert(err instanceof Error ? err.message : 'Failed to add topic')
  }
}

const handleDeleteTopic = (topicKey: string) => {
  const topicTitle = topicKey.split('-').slice(2).join('-')
  if (confirm(`Delete topic "${topicTitle}"?`)) {
    tracker.value?.deleteTopic(topicTitle)
  }
}

// Request topic modal handler
const showRequestModal = ref(false)
</script>

<template>
  <main class="lg:ml-96 flex-1 relative overflow-hidden">
    <div class="p-2 lg:p-8 pt-20 lg:pt-2 lg:pb-2 overflow-y-auto h-full">
      <!-- Loading state -->
      <div v-if="loading" class="flex items-center justify-center h-full">
        <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="flex items-center justify-center h-full">
        <div class="text-center">
          <p class="text-red-400 text-xl mb-4">{{ error }}</p>
          <router-link to="/week/1" class="text-blue-500 hover:underline">Go to Week 1</router-link>
        </div>
      </div>

      <!-- Week content -->
      <template v-else-if="weekData && tracker">
        <!-- Week Header -->
        <WeekHeader
          :week-number="weekData.weekNumber"
          :title="weekData.title"
          :subtitle="weekData.subtitle"
          :progress-percentage="tracker.progressPercentage.value"
          :completed-topics="tracker.completedTopics.value"
          :total-topics="tracker.totalTopics.value"
        />

        <!-- Content Grid -->
        <div class="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <!-- Topics Section -->
          <div class="lg:col-span-2 space-y-6">
            <div class="border border-gray-700 border-opacity-70 rounded-2xl lg:p-5 p-3 pt-5 slide-left lg:h-[calc(100vh-220px)] lg:w-full w-[calc(100vw-10px)]">
              <!-- Header Row -->
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-500 bg-opacity-20 border border-blue-500 border-opacity-40 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 class="text-xl lg:text-2xl font-bold">Learning Topics</h2>
                </div>

                <!-- Request Topic Button -->
                <button
                  @click="showRequestModal = true"
                  class="text-sm px-4 py-2 rounded-lg bg-transparent border border-gray-700 hover:bg-blue-700 transition text-white font-medium"
                >
                  Add Pending
                </button>
              </div>

              <!-- Topics Container -->
              <div class="lg:overflow-y-auto lg:h-[calc(100vh-350px)] lg:px-4 space-y-3 scrollbar-thin-gray">
                <!-- Render default topics -->
                <TopicItem
                  v-for="(topic, index) in weekData.topics"
                  :key="`default-${index}`"
                  :topic="topic"
                  :topic-key="tracker.getTopicKey(topic.title, index, false)"
                  :is-checked="tracker.topicsState.value[tracker.getTopicKey(topic.title, index, false)] || false"
                  @toggle="handleToggleTopic"
                />

                <!-- Render user topics -->
                <TopicItem
                  v-for="(topic, index) in tracker.userTopics.value"
                  :key="`user-${index}`"
                  :topic="topic"
                  :topic-key="tracker.getTopicKey(topic.title, index, true)"
                  :is-checked="tracker.topicsState.value[tracker.getTopicKey(topic.title, index, true)] || false"
                  :is-user-topic="true"
                  @toggle="handleToggleTopic"
                  @delete="handleDeleteTopic"
                />

                <!-- Add Topic Bar -->
                <AddTopicBar @add="handleAddTopic" />
              </div>
            </div>
          </div>

          <!-- Pro Tips Section -->
          <div class="space-y-6">
            <ProTipsList :pro-tips="weekData.proTips" />
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<style scoped>
.fade-up {
  animation: fadeUp 0.6s ease-out;
}

.slide-left {
  animation: slideLeft 0.6s ease-out;
}

.slide-right {
  animation: slideRight 0.6s ease-out;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
