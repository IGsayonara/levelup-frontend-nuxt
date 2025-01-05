import { computed, onMounted } from 'vue'
import { useState, useCookie } from '#app'

export enum Theme {
  light = 'light',
  dark = 'dark',
}

export function useTheme() {
  const theme = useState<Theme>('theme', () => {
    // Initialize theme from cookies or fallback to light
    const themeCookie = useCookie<Theme>('theme')
    return themeCookie.value || Theme.light
  })

  useHead({
    htmlAttrs: {
      'data-theme': theme.value,
    },
  })

  const isDark = computed(() => theme.value === Theme.dark)

  const toggleTheme = () => {
    const newTheme = theme.value === Theme.dark ? Theme.light : Theme.dark
    setTheme(newTheme)
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme

    // Update the HTML `data-theme` attribute
    document.documentElement.setAttribute('data-theme', newTheme)

    // Persist the theme in a cookie
    const themeCookie = useCookie<Theme>('theme')
    themeCookie.value = newTheme
  }

  // Set the theme attribute when the component is mounted
  onMounted(() => {
    const savedTheme = theme.value
  })

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  }
}
