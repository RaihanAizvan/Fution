import { ref } from 'vue'

/**
 * Generic localStorage composable with reactive state
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(defaultValue)

  // Load from localStorage
  const load = () => {
    try {
      const item = localStorage.getItem(key)
      if (item) {
        data.value = JSON.parse(item)
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
    }
  }

  // Save to localStorage
  const save = () => {
    try {
      localStorage.setItem(key, JSON.stringify(data.value))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  // Initialize
  load()

  // Auto-save on changes (use with caution for performance)
  // For manual control, just call save() explicitly
  
  return {
    data,
    load,
    save
  }
}
