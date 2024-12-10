<template>
  <div class="list-actions__footer-actions">
    <VButton v-for="(button, index) in buttons" :key="index" :color="(button.color as ButtonColor)"
      :class="button.visible ? 'button-visible' : 'button-hidden'" @click="button.action">
      {{ button.label }}
    </VButton>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import VButton from '@/components/ui/VButton.vue'
import type { Task, TaskType } from '@/types/task'
import type { ButtonColor } from '@/types/button';

const props = defineProps<{
  tasks: Task[]
  completedTasksLength: number
  notCompletedTasksLength: number
  activeType: TaskType
}>()

const emit = defineEmits(['delete-completed-tasks', 'complete-all-tasks', 'filter-tasks'])

const tasksLength = computed(() => props.tasks.length)

const buttons = computed(() => [
  {
    label: 'Check all',
    color: 'colorless',
    visible: (props.notCompletedTasksLength === tasksLength.value) || (props.notCompletedTasksLength > 0 && props.completedTasksLength > 0),
    action: () => emit('complete-all-tasks'),
  },
  {
    label: 'All',
    color: props.activeType === 'all' ? 'primary' : 'colorless',
    visible: true,
    action: () => emit('filter-tasks', 'all'),
  },
  {
    label: 'Active',
    color: props.activeType === 'active' ? 'primary' : 'colorless',
    visible: (props.notCompletedTasksLength > 0 && props.completedTasksLength > 0) || (props.notCompletedTasksLength === tasksLength.value),
    action: () => emit('filter-tasks', 'active'),
  },
  {
    label: 'Completed',
    color: props.activeType === 'completed' ? 'primary' : 'colorless',
    visible: (props.notCompletedTasksLength > 0 && props.completedTasksLength > 0) || (props.completedTasksLength === tasksLength.value),
    action: () => emit('filter-tasks', 'completed'),
  },
  {
    label: 'Clear completed',
    color: 'colorless',
    visible: (props.completedTasksLength === tasksLength.value) || (props.notCompletedTasksLength > 0 && props.completedTasksLength > 0),
    action: () => emit('delete-completed-tasks'),
  },
])
</script>

<style scoped>
.list-actions__footer-actions {
  display: flex;
}

.button-hidden {
  pointer-events: none;
  cursor: default;
  opacity: 0;
}

.button-visible {
  pointer-events: all;
  cursor: pointer;
  opacity: 1;
}

@media screen and (max-width: 768px) {
  .list-actions__footer-actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
}
</style>
