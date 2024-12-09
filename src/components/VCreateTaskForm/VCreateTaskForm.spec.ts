import { flushPromises, mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import VCreateTaskForm from './VCreateTaskForm.vue'
import VInput from '../ui/VInput.vue'
import VButton from '../ui/VButton.vue'

describe('TodoForm.vue', () => {
  it('renders the input field and does not show the button initially', () => {
    const wrapper = mount(VCreateTaskForm, {
      props: {
        isEditMode: false,
      },
    })

    const input = wrapper.findComponent(VInput)
    expect(input.exists()).toBe(true)

    const button = wrapper.findComponent(VButton)
    expect(button.exists()).toBe(false)
  })

  it('shows the submit button when input has a value', async () => {
    const wrapper = mount(VCreateTaskForm, {
      props: {
        isEditMode: false,
      },
    })
    const input = wrapper.findComponent(VInput)

    input.vm.$emit('update:modelValue', 'New Todo')

    await flushPromises()

    const button = wrapper.findComponent(VButton)
    expect(button.exists()).toBe(true)
  })

  it('emits the submit event with the correct value and clears the input', async () => {
    const wrapper = mount(VCreateTaskForm, {
      props: {
        isEditMode: false,
      },
    })
    const input = wrapper.findComponent(VInput)

    input.vm.$emit('update:modelValue', 'New Todo')

    await flushPromises()

    const button = wrapper.findComponent(VButton)

    expect(button.exists()).toBe(true)

    await button.trigger('submit')

    expect(wrapper.emitted('submit')).toHaveLength(1)

    expect(wrapper.findComponent(VInput).vm.modelValue).toBe('')
  })

  it('does not emit the submit event when input is empty', async () => {
    const wrapper = mount(VCreateTaskForm, {
      props: {
        isEditMode: false,
      },
    })

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('shows edit button when isEditMode is true', async () => {
    const wrapper = mount(VCreateTaskForm, {
      props: {
        isEditMode: true,
      },
    })

    const input = wrapper.findComponent(VInput)

    expect(input.exists()).toBe(true)

    input.setValue('New Todo')

    await flushPromises()

    const button = wrapper.findComponent(VButton)

    expect(button.exists()).toBe(true)

    expect(button.text()).toBe('Edit')
  })
})
