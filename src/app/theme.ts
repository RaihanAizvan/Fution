import { computed, ref } from 'vue'

const themes = ['dark', 'light', 'blue'] as const
export type ThemeName = (typeof themes)[number]

const currentTheme = ref<ThemeName>('dark')

export const useTheme = () => {
  const theme = computed(() => currentTheme.value)

  const setTheme = (value: ThemeName) => {
    currentTheme.value = value
  }

  return {
    theme,
    themes,
    setTheme
  }
}
