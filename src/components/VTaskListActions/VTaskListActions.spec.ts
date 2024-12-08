import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FooterActions from './VTaskListActions.vue'
import { useTaskStore } from '@/stores/task'
import VButton from '@/components/ui/VButton.vue'


vi.mock('@/stores/task', () => {
  return {
    useTaskStore: vi.fn(),
  }
})

describe('FooterActions', () => {
  let taskStore: any

  beforeEach(() => {
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

  it('should render buttons with the correct classes', async () => {
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

  it('should call completeAllTasks when "Check all" is clicked', async () => {
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

  it('should call getAllTasksHandler when you click on "All"', async () => {
    const wrapper = mount(FooterActions)

    await wrapper.findAllComponents(VButton)[1].trigger('click')

    expect(wrapper.findAllComponents(VButton)[1].emitted('click')).toHaveLength(1)
  })

  it('should call getCompletedTasksHandler when you click on "Completed"', async () => {
    const wrapper = mount(FooterActions)

    await wrapper.findAllComponents(VButton)[3].trigger('click')

    expect(taskStore.setTasks).toHaveBeenCalledWith(expect.arrayContaining([]))
  })

  it('should call getNotCompletedTasksHandler when clicking on "Active"', async () => {
    const wrapper = mount(FooterActions)

    await wrapper.findAllComponents(VButton)[2].trigger('click')

    expect(taskStore.setTasks).toHaveBeenCalled()
  })

  it('should call deleteCompletedTasks when you click on “Clear completed”', async () => {
    taskStore.completedTasks = [
      { id: '1', title: 'Task 1', isCompleted: true },
      { id: '2', title: 'Task 2', isCompleted: true },
    ]

    const wrapper = mount(FooterActions)

    await wrapper.findAllComponents(VButton)[4].trigger('click')

    expect(taskStore.deleteCompletedTasks).toHaveBeenCalled()
  })
})
