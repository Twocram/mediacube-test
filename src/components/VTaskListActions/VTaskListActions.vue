<template>
  <div class="list-actions__footer-actions">
    <VButton @click="completeAllTasks" class="button-hidden" :class="{ 'button-visible': checkAllButtonVisible }"
      color="colorless">
      Check all
    </VButton>
    <VButton :color="allButtonColor" @click="filterTasks('all')"> All </VButton>
    <VButton :color="activeButtonColor" @click="filterTasks('active')" class="button-hidden"
      :class="{ 'button-visible': activeButtonVisible }">
      Active
    </VButton>
    <VButton class="button-hidden" :color="completedButtonColor" @click="filterTasks('completed')"
      :class="{ 'button-visible': completedButtonVisible }">
      Completed
    </VButton>
    <VButton class="button-hidden" @click="deleteCompletedTasks" color="colorless"
      :class="{ 'button-visible': clearCompletedButtonVisible }">
      Clear completed
    </VButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VButton from '@/components/ui/VButton.vue'
import type { Task, TaskType } from '@/types/task'


const props = defineProps<{
  tasks: Task[]
  completedTasksLength: number
  notCompletedTasksLength: number
  activeType: TaskType
}>()

const emit = defineEmits(['delete-completed-tasks', 'complete-all-tasks', 'filter-tasks'])


const allButtonColor = computed(() => (props.activeType === 'all' ? 'primary' : 'colorless'))
const activeButtonColor = computed(() => (props.activeType === 'active' ? 'primary' : 'colorless'))
const completedButtonColor = computed(() =>
  props.activeType === 'completed' ? 'primary' : 'colorless',
)

const checkAllButtonVisible = computed(() => {
  return (props.notCompletedTasksLength === tasksLength.value) || (props.notCompletedTasksLength > 0 && props.completedTasksLength > 0)
})

const activeButtonVisible = computed(() => {
  return (props.notCompletedTasksLength > 0 && props.completedTasksLength > 0) || (props.notCompletedTasksLength === tasksLength.value)
})

const completedButtonVisible = computed(() => {
  return (props.notCompletedTasksLength > 0 && props.completedTasksLength > 0) || (props.completedTasksLength === tasksLength.value)
})

const clearCompletedButtonVisible = computed(() => {
  return (props.completedTasksLength === tasksLength.value) || (props.notCompletedTasksLength > 0 && props.completedTasksLength > 0)
})

const tasksLength = computed(() => props.tasks.length)

const deleteCompletedTasks = () => emit('delete-completed-tasks')
const completeAllTasks = () => {
  emit('complete-all-tasks')
}
const filterTasks = (type: TaskType) => {
  emit('filter-tasks', type)
}
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
  }
}
</style>
