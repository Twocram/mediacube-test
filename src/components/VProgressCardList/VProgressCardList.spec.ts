import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import VProgressCardList from './VProgressCardList.vue'
import VProgressCard from '@/components/VProgressCard/VProgressCard.vue'
import { pluralizeText } from '@/utils/textUtils'

vi.mock('@/utils/textUtils', () => ({
  pluralizeText: vi.fn((count, text) => `${count} ${text}${count === 1 ? '' : 's'}`),
}))

describe('ProgressCardList.vue', () => {
  const createWrapper = (props = {}) => {
    return mount(VProgressCardList, {
      props: {
        completedTasksLength: 2,
        notCompletedTasksLength: 3,
        tasksLength: 5,
        ...props,
      },
      global: {
        components: { VProgressCard },
      },
    })
  }

  it('renders two VProgressCard components', () => {
    const wrapper = createWrapper()
    const progressCards = wrapper.findAllComponents(VProgressCard)

    expect(progressCards.length).toBe(2)
  })

  it('passes correct props to the In progress VProgressCard', () => {
    const wrapper = createWrapper()
    const inProgressCard = wrapper.findAllComponents(VProgressCard)[0]

    expect(inProgressCard.props()).toMatchObject({
      countLabel: '3 tasks',
      count: 3,
      total: 5,
      color: '#2578F4',
      status: 'In progress',
    })
  })

  it('passes correct props to the Completed VProgressCard', () => {
    const wrapper = createWrapper()
    const completedCard = wrapper.findAllComponents(VProgressCard)[1]

    expect(completedCard.props()).toMatchObject({
      countLabel: '2 tasks',
      count: 2,
      total: 5,
      color: 'rgba(239, 93, 168, 1)',
      status: 'Completed',
    })
  })

  it('calls pluralizeText with correct arguments for In progress tasks', () => {
    createWrapper()

    expect(pluralizeText).toHaveBeenCalledWith(3, 'task')
  })

  it('calls pluralizeText with correct arguments for Completed tasks', () => {
    createWrapper()

    expect(pluralizeText).toHaveBeenCalledWith(2, 'task')
  })

  it('updates VProgressCard props dynamically when props change', async () => {
    const wrapper = createWrapper({
      completedTasksLength: 1,
      notCompletedTasksLength: 4,
      tasksLength: 5,
    })

    await wrapper.setProps({
      completedTasksLength: 3,
      notCompletedTasksLength: 2,
      tasksLength: 5,
    })

    const inProgressCard = wrapper.findAllComponents(VProgressCard)[0]
    const completedCard = wrapper.findAllComponents(VProgressCard)[1]

    expect(inProgressCard.props()).toMatchObject({
      countLabel: '2 tasks',
      count: 2,
      total: 5,
    })

    expect(completedCard.props()).toMatchObject({
      countLabel: '3 tasks',
      count: 3,
      total: 5,
    })
  })
})
