import { computed, ref } from 'vue'

const themes = ['dark', 'light', 'blue', 'purple', 'green'] as const
export type ThemeName = (typeof themes)[number]

const currentTheme = ref<ThemeName>('dark')

export const useTheme = () => {
  const theme = computed(() => currentTheme.value)

  const setTheme = (value: ThemeName) => {
    currentTheme.value = value
    // Update document class for theme-specific styling
    document.documentElement.setAttribute('data-theme', value)
    // Store in localStorage
    localStorage.setItem('fution-theme', value)
  }

  // Load theme from localStorage on initialization
  const loadTheme = () => {
    const saved = localStorage.getItem('fution-theme') as ThemeName
    if (saved && themes.includes(saved)) {
      setTheme(saved)
    }
  }

  return {
    theme,
    themes,
    setTheme,
    loadTheme
  }
}
