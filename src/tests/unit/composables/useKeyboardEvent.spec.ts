import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useKeyboardEvent } from '@/composables/useKeyboardEvent.ts'
import { flushPromises, mount } from '@vue/test-utils'

globalThis.window.addEventListener = vi.fn()
globalThis.window.removeEventListener = vi.fn()

describe('useKeyboardEvent', () => {
  let handler: EventListener

  beforeEach(() => {
    handler = vi.fn() as EventListener
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('должен добавлять обработчик события при монтировании', async () => {
    const eventName = 'keydown'

    mount({
      setup() {
        useKeyboardEvent(eventName, handler)
        return {}
      },
      template: '<div></div>'
    })

    await flushPromises()

    expect(window.addEventListener).toHaveBeenCalledTimes(1)
    expect(window.addEventListener).toHaveBeenCalledWith(eventName, handler)
  })

  it('должен удалять обработчик события при размонтировании', async () => {
    const eventName = 'keydown'

    const wrapper = mount({
      setup() {
        useKeyboardEvent(eventName, handler)
        return {}
      },
      template: '<div></div>'
    })

    await flushPromises()

    wrapper.unmount()

    expect(window.removeEventListener).toHaveBeenCalledTimes(1)
    expect(window.removeEventListener).toHaveBeenCalledWith(eventName, handler)
  })
})
