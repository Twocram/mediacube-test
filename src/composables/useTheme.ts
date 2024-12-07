import { ref } from 'vue'

type Theme = 'light' | 'dark'

export const useTheme = () => {
  const theme = ref<Theme>(localStorage.getItem('theme') as Theme)

  const checkTheme = () => {
    if (!theme.value) {
      localStorage.setItem('theme', 'light')
    }
    if (theme.value === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.removeAttribute('class')
    }
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)

    if (newTheme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.removeAttribute('class')
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
