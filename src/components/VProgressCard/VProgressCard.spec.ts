import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ProgressCard from './VProgressCard.vue';
import VProgressBar from '../ui/VProgressBar.vue';

describe('ProgressCard.vue', () => {
  const props = {
    status: 'In Progress',
    count: 42,
    countLabel: 'Tasks',
    total: 100,
    color: '#4CAF50',
  };

  it('renders the correct status', () => {
    const wrapper = mount(ProgressCard, {
      props,
    });

    expect(wrapper.find('.progress-card__status').text()).toBe(props.status);
  });

  it('renders the correct count and count label', () => {
    const wrapper = mount(ProgressCard, {
      props,
    });

    expect(wrapper.find('.progress-card__count').text()).toBe(`${props.count} ${props.countLabel}`);
  });

  it('passes the correct props to VProgressBar', () => {
    const wrapper = mount(ProgressCard, {
      props,
    });

    const progressBar = wrapper.findComponent(VProgressBar);
    expect(progressBar.exists()).toBe(true);
    expect(progressBar.props('count')).toBe(props.count);
    expect(progressBar.props('total')).toBe(props.total);
    expect(progressBar.props('color')).toBe(props.color);
  });

});
