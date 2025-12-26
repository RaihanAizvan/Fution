import { computed } from 'vue'

/**
 * Progress circle calculations
 * Used for both main progress and sidebar progress
 */
export function useProgressCircle(radius: number) {
  const circumference = computed(() => 2 * Math.PI * radius)

  const getStrokeDashoffset = (percentage: number) => {
    return (1 - percentage / 100) * circumference.value
  }

  return {
    circumference,
    getStrokeDashoffset
  }
}
