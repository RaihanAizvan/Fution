import { ref, computed, watch } from 'vue'
import type { Topic, TopicsState, UserTopic } from '@/data/types'

/**
 * Core week tracking logic - replaces WeekLearningTracker class
 * Uses Vue Composition API for reactive state management
 */
export function useWeekTracker(weekKey: string, topics: Topic[]) {
  // State (replaces class properties)
  const topicsState = ref<TopicsState>({})
  const userTopics = ref<UserTopic[]>([])

  // Storage keys
  const getStorageKey = (type: string) => `weekTracker-${type}-${weekKey}`

  // Load from localStorage on mount
  const loadStoredData = () => {
    try {
      const userTopicsKey = getStorageKey('userTopics')
      const topicsStateKey = getStorageKey('topicsState')
      
      const storedUserTopics = localStorage.getItem(userTopicsKey)
      const storedTopicsState = localStorage.getItem(topicsStateKey)
      
      userTopics.value = storedUserTopics ? JSON.parse(storedUserTopics) : []
      topicsState.value = storedTopicsState ? JSON.parse(storedTopicsState) : {}
    } catch (error) {
      console.error('Error loading stored data:', error)
      userTopics.value = []
      topicsState.value = {}
    }
  }

  // Save to localStorage
  const saveToStorage = () => {
    try {
      const userTopicsKey = getStorageKey('userTopics')
      const topicsStateKey = getStorageKey('topicsState')
      
      localStorage.setItem(userTopicsKey, JSON.stringify(userTopics.value))
      localStorage.setItem(topicsStateKey, JSON.stringify(topicsState.value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  // Computed properties (no manual updates needed!)
  const allTopics = computed(() => [...topics, ...userTopics.value])
  
  const totalTopics = computed(() => allTopics.value.filter(t => t.type !== 'heading').length)
  
  const completedTopics = computed(() => 
    Object.values(topicsState.value).filter(Boolean).length
  )
  
  const progressPercentage = computed(() => 
    totalTopics.value > 0 
      ? Math.round((completedTopics.value / totalTopics.value) * 100) 
      : 0
  )

  // Generate topic key (same as original)
  const getTopicKey = (title: string, index: number, isUserTopic: boolean) => {
    return isUserTopic ? `user-${index}-${title}` : `default-${index}-${title}`
  }

  // Toggle topic completion
  const toggleTopic = (topicKey: string) => {
    topicsState.value[topicKey] = !topicsState.value[topicKey]
    saveToStorage()
  }

  // Add custom topic
  const addTopic = (title: string) => {
    const allTitles = allTopics.value.map(t => t.title)
    if (allTitles.includes(title)) {
      throw new Error('This topic already exists!')
    }
    
    userTopics.value.push({ title, details: null })
    saveToStorage()
  }

  // Delete custom topic
  const deleteTopic = (title: string) => {
    const index = userTopics.value.findIndex(t => t.title === title)
    if (index !== -1) {
      const topicKey = getTopicKey(title, index, true)
      userTopics.value.splice(index, 1)
      delete topicsState.value[topicKey]
      saveToStorage()
    }
  }

  // Export data for backup
  const exportWeekData = () => {
    return {
      weekKey,
      topics,
      userTopics: userTopics.value,
      topicsState: topicsState.value,
      progressStats: {
        totalTopics: totalTopics.value,
        completedTopics: completedTopics.value,
        progressPercentage: progressPercentage.value,
        weekKey
      }
    }
  }

  // Reset progress
  const resetProgress = () => {
    if (confirm(`Are you sure you want to reset all progress for ${weekKey}? This action cannot be undone.`)) {
      topicsState.value = {}
      saveToStorage()
    }
  }

  // Initialize on composable creation
  loadStoredData()

  return {
    // State
    topicsState,
    userTopics,
    
    // Computed
    allTopics,
    totalTopics,
    completedTopics,
    progressPercentage,
    
    // Methods
    getTopicKey,
    toggleTopic,
    addTopic,
    deleteTopic,
    exportWeekData,
    resetProgress,
    saveToStorage
  }
}
