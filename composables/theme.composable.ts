import { computed } from 'vue'
import { useState, useCookie } from '#app'

export enum Theme {
  light = 'light',
  dark = 'dark',
}

export function useTheme() {
  const theme = useState<Theme>('theme', () => {
    // Initialize theme from cookies or fallback to light
    const themeCookie = useCookie<Theme>('theme')
    useHead({
      htmlAttrs: {
        'data-theme': themeCookie.value || Theme.light,
      },
    })
    return themeCookie.value || Theme.light
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

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  }
}
