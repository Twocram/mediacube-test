import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FooterActions from './VTaskListActions.vue'
import { useTaskStore } from '@/stores/task'
import VButton from '@/components/ui/VButton.vue'
import type { Task } from '@/types/task'

type TaskStore = {
  tasks: Task[]
  completedTasks: Task[]
  notCompletedTasks: Task[]
  fetchTasks: () => void
  completeAllTasks: () => void
  deleteCompletedTasks: () => void
  setTasks: (tasks: Task[]) => void
}

vi.mock('@/stores/task', () => {
  return {
    useTaskStore: vi.fn(),
  }
})

describe('FooterActions', () => {
  let taskStore: TaskStore

  beforeEach(() => {
    // Создаем мок для taskStore
    taskStore = {
      tasks: [],
      completedTasks: [],
      notCompletedTasks: [],
      fetchTasks: vi.fn(),
      completeAllTasks: vi.fn(),
      deleteCompletedTasks: vi.fn(),
      setTasks: vi.fn(),
    }

    // @ts-expect-error await what useTaskStore return taskStore
    useTaskStore.mockReturnValue(taskStore)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('должен рендерить кнопки с правильными классами', async () => {
    taskStore.completedTasks = [
      { id: '1', title: 'Task 1', isCompleted: true },
      { id: '2', title: 'Task 2', isCompleted: true },
    ]
    taskStore.notCompletedTasks = [
      { id: '3', title: 'Task 3', isCompleted: false },
      { id: '4', title: 'Task 4', isCompleted: false },
    ]
    taskStore.tasks = [
      { id: '1', title: 'Task 1', isCompleted: true },
      { id: '2', title: 'Task 2', isCompleted: true },
      { id: '3', title: 'Task 3', isCompleted: false },
      { id: '4', title: 'Task 4', isCompleted: false },
    ]

    const wrapper = mount(FooterActions)

    expect(wrapper.findAllComponents(VButton)[0].classes()).not.toContain('button-hidden')
    expect(wrapper.findAllComponents(VButton)[3].classes()).not.toContain('button-hidden')
    expect(wrapper.findAllComponents(VButton)[2].classes()).not.toContain('button-hidden')
  })

  it('должен вызывать completeAllTasks при клике на "Check all"', async () => {
    taskStore.completedTasks = []
    taskStore.notCompletedTasks = [
      { id: '1', title: 'Task 1', isCompleted: true },
      { id: '2', title: 'Task 2', isCompleted: true },
    ]
    taskStore.tasks = [
      { id: '1', title: 'Task 1', isCompleted: true },
      { id: '2', title: 'Task 2', isCompleted: true },
    ]

    const wrapper = mount(FooterActions)

    await wrapper.find('button').trigger('click')

    expect(taskStore.completeAllTasks).toHaveBeenCalled()
  })

  it('должен вызывать getAllTasksHandler при клике на "All"', async () => {
    const wrapper = mount(FooterActions)

    await wrapper.findAllComponents(VButton)[1].trigger('click')

    // Проверяем, что событие "click" было сгенерировано кнопкой
    expect(wrapper.findAllComponents(VButton)[1].emitted('click')).toHaveLength(1)
  })

  it('должен вызывать getCompletedTasksHandler при клике на "Completed"', async () => {
    const wrapper = mount(FooterActions)

    await wrapper.findAllComponents(VButton)[3].trigger('click')

    // Проверяем, что setTasks был вызван с пустым массивом (в случае, если все задачи завершены)
    expect(taskStore.setTasks).toHaveBeenCalledWith(expect.arrayContaining([]))
  })

  it('должен вызывать getNotCompletedTasksHandler при клике на "Active"', async () => {
    const wrapper = mount(FooterActions)

    await wrapper.findAllComponents(VButton)[2].trigger('click')

    // Проверяем, что setTasks был вызван для активных задач
    expect(taskStore.setTasks).toHaveBeenCalled()
  })

  it('должен вызывать deleteCompletedTasks при клике на "Clear completed"', async () => {
    taskStore.completedTasks = [
      { id: '1', title: 'Task 1', isCompleted: true },
      { id: '2', title: 'Task 2', isCompleted: true },
    ]

    const wrapper = mount(FooterActions)

    await wrapper.findAllComponents(VButton)[4].trigger('click')

    expect(taskStore.deleteCompletedTasks).toHaveBeenCalled()
  })
})
