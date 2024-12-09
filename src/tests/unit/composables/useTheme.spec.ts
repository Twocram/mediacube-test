import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useTheme } from '@/composables/useTheme'

describe('useTheme', () => {
  let localStorageMock: any

  beforeEach(() => {
    localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
    }

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    })

    document.body.className = ''
  })

  it('initializes theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('dark')

    const { theme } = useTheme()

    expect(theme.value).toBe('dark')
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme')
  })

  it('sets theme to light in localStorage if no theme is present', () => {
    localStorageMock.getItem.mockReturnValue(null)

    const { theme, checkTheme } = useTheme()
    checkTheme()

    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light')
    expect(theme.value).toBe(null)
  })

  it('applies the dark theme class to the document body', () => {
    localStorageMock.getItem.mockReturnValue('dark')

    const { checkTheme } = useTheme()
    checkTheme()

    expect(document.body.classList.contains('dark')).toBe(true)
  })
})
