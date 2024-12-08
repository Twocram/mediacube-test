import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest'
import VTaskListItem from './VTaskListItem.vue';
import VCheckbox from '../ui/VCheckbox.vue';
import VPencilIcon from '../icons/VPencilIcon.vue';
import VBinIcon from '../icons/VBinIcon.vue';
import VDragIcon from '../icons/VDragIcon.vue';
import { createPinia, setActivePinia } from 'pinia'


vi.mock('../../services/taskService.ts', () => ({
  taskService: {
    getTasks: vi.fn(),
    createTask: vi.fn(),
    deleteTask: vi.fn(),
    updateTask: vi.fn(),
    updateTasks: vi.fn(),
  },
}))

vi.mock('@/stores/task.ts', () => ({
  useTaskStore: () => ({
    deleteTask: vi.fn(),
    updateTask: vi.fn(),
  }),
}));

describe('TodoItem.vue', () => {
  const props = {
    id: '1',
    title: 'Test Task',
    isCompleted: false,
    isFiltered: false,
  };

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders correctly with given props', () => {
    const wrapper = mount(VTaskListItem, {
      props,
      global: {
        plugins: [createPinia()]
      }
    });

    expect(wrapper.text()).toContain(props.title);
    expect(wrapper.findComponent(VCheckbox).props('value')).toBe(props.isCompleted);
    expect(wrapper.findComponent(VDragIcon).exists()).toBe(true);
    expect(wrapper.findComponent(VPencilIcon).exists()).toBe(true);
    expect(wrapper.findComponent(VBinIcon).exists()).toBe(true);
  });

  it('applies completed class when task is completed', async () => {
    const wrapper = mount(VTaskListItem, {
      props: { ...props, isCompleted: true },
      global: {
        plugins: [createPinia()]
      }
    });

    const label = wrapper.find('.todo-list__item-label');
    expect(label.classes()).toContain('todo-list__item-label--completed');
  });

  it('hides drag handle when filtered', () => {
    const wrapper = mount(VTaskListItem, {
      props: { ...props, isFiltered: true },
      global: {
        plugins: [createPinia()]
      }
    });

    const handle = wrapper.find('.todo-list__item-handle');
    expect(handle.classes()).toContain('hidden');
  });

  it('emits edit event with correct payload when edit icon is clicked', async () => {
    const wrapper = mount(VTaskListItem, {
      props,
      global: {
        plugins: [createPinia()]
      }
    });

    const pencilIcon = wrapper.findComponent(VPencilIcon);
    await pencilIcon.trigger('click');

    expect(wrapper.emitted('edit')).toHaveLength(1);
  });

});
