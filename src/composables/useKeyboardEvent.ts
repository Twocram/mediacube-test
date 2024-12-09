import { onMounted, onBeforeUnmount } from 'vue'

export const useKeyboardEvent = (eventName: string, handler: (event: KeyboardEvent) => void) => {
  onMounted(() => {
    window.addEventListener(eventName, handler as EventListener)
  })

  onBeforeUnmount(() => {
    window.removeEventListener(eventName, handler as EventListener)
  })
}
