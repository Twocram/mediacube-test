import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import VTaskListActions from './VTaskListActions.vue'
import VButton from '@/components/ui/VButton.vue'

const mockTasks = [
  { id: '1', title: 'Task 1', isCompleted: true },
  { id: '2', title: 'Task 2', isCompleted: false },
  { id: '3', title: 'Task 3', isCompleted: true },
]

describe('FooterActions.vue', () => {
  const createWrapper = (props = {}) => {
    return mount(VTaskListActions, {
      props: {
        tasks: mockTasks,
        completedTasksLength: 2,
        notCompletedTasksLength: 1,
        ...props,
      },
      global: {
        components: { VButton },
      },
    })
  }

  it('renders all buttons correctly', () => {
    const wrapper = createWrapper()

    expect(wrapper.findAllComponents(VButton).length).toBe(5)
    expect(wrapper.text()).toContain('Check all')
    expect(wrapper.text()).toContain('All')
    expect(wrapper.text()).toContain('Active')
    expect(wrapper.text()).toContain('Completed')
    expect(wrapper.text()).toContain('Clear completed')
  })

  it('emits the correct event when Check all button is clicked', async () => {
    const wrapper = createWrapper()
    const button = wrapper.findAllComponents(VButton)[0]
    await button.trigger('click')
    expect(wrapper.emitted('complete-all-tasks')).toBeTruthy()
  })

  it('hides the Check all button when all tasks are completed', () => {
    const wrapper = createWrapper({ tasks: mockTasks, completedTasksLength: 3 })

    const checkAllButton = wrapper.findAllComponents(VButton)[0]

    expect(checkAllButton.classes()).toContain('button-hidden')
  })

  it('emits the correct event when Clear completed button is clicked', async () => {
    const wrapper = createWrapper()

    const button = wrapper.findAllComponents(VButton)[4]

    await button.trigger('click')

    expect(wrapper.emitted('delete-completed-tasks')).toBeTruthy()
  })

  it('emits the correct event when All button is clicked', async () => {
    const wrapper = createWrapper()

    const button = wrapper.findAllComponents(VButton)[1]

    await button.trigger('click')

    expect(wrapper.emitted('filter-tasks')).toBeTruthy()
    expect(wrapper.emitted('filter-tasks')?.[0]).toEqual(['all'])
  })

  it('emits the correct event when Active button is clicked', async () => {
    const wrapper = createWrapper()

    const button = wrapper.findAllComponents(VButton)[2]

    await button.trigger('click')

    expect(wrapper.emitted('filter-tasks')).toBeTruthy()
    expect(wrapper.emitted('filter-tasks')?.[0]).toEqual(['active'])
  })

  it('emits the correct event when Completed button is clicked', async () => {
    const wrapper = createWrapper()

    const button = wrapper.findAllComponents(VButton)[3]

    await button.trigger('click')

    expect(wrapper.emitted('filter-tasks')).toBeTruthy()
    expect(wrapper.emitted('filter-tasks')?.[0]).toEqual(['completed'])
  })

  it('hides the Active button when there are no active tasks', () => {
    const wrapper = createWrapper({ notCompletedTasksLength: 0 })

    const activeButton = wrapper.findAllComponents(VButton)[2]

    expect(activeButton.classes()).toContain('button-hidden')
  })

  it('hides the Completed button when there are no completed tasks', () => {
    const wrapper = createWrapper({ completedTasksLength: 0 })

    const completedButton = wrapper.findAllComponents(VButton)[3]

    expect(completedButton.classes()).toContain('button-hidden')
  })
})
