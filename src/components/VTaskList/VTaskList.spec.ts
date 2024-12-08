import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskList from './VTaskList.vue'
import VTaskListItem from '@/components/VTastListItem/VTaskListItem.vue'
import { createPinia, setActivePinia } from 'pinia'

describe('TaskList', () => {
  let tasks: any[]
  let wrapper: any

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    tasks = [
      { id: "1", title: 'Task 1', isCompleted: false },
      { id: "2", title: 'Task 2', isCompleted: true },
    ]
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('должен отображать элементы из пропса tasks', async () => {
    wrapper = mount(TaskList, {
      props: {
        tasks,
        isFiltered: false,
      },
    })

    const taskItems = wrapper.findAll('div')

    expect(taskItems.length).toBe(tasks.length)
  })

  it('должен обновлять localTasks при изменении пропса tasks', async () => {
    wrapper = mount(TaskList, {
      props: {
        tasks,
        isFiltered: false,
      },
    })

    const newTasks = [
      { id: "3", title: 'Task 3', isCompleted: false },
      { id: "4", title: 'Task 4', isCompleted: true },
    ]
    await wrapper.setProps({ tasks: newTasks })

    const taskItems = wrapper.findAllComponents(VTaskListItem)
    expect(taskItems.length).toBe(newTasks.length)
    expect(taskItems[0].props().id).toBe(newTasks[0].id)
    expect(taskItems[1].props().id).toBe(newTasks[1].id)
  })

})
