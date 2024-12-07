import { ref } from 'vue'

type Theme = 'light' | 'dark'

export const useTheme = () => {
  const theme = ref<Theme>(localStorage.getItem('theme') as Theme)

  const checkTheme = () => {
    if (!theme.value) {
      localStorage.setItem('theme', 'light')
    }
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    if (theme.value === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return { theme, checkTheme, setTheme, toggleTheme }
}
