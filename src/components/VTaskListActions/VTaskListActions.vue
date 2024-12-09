<template>
  <div class="wrapper-content__footer-actions">
    <VButton @click="completeAllTasks" class="button-hidden"
      :class="{ 'button-visible': notCompletedTasksLength === tasksLength || (notCompletedTasksLength > 0 && completedTasksLength > 0) }"
      color="colorless">
      Check all
    </VButton>
    <VButton :color="allButtonColor" @click="filterTasks('all')"> All </VButton>
    <VButton :color="activeButtonColor" @click="filterTasks('active')" class="button-hidden"
      :class="{ 'button-visible': notCompletedTasksLength > 0 && completedTasksLength > 0 }">
      Active
    </VButton>
    <VButton class="button-hidden" :color="completedButtonColor" @click="filterTasks('completed')"
      :class="{ 'button-visible': notCompletedTasksLength > 0 && completedTasksLength > 0 }">
      Completed
    </VButton>
    <VButton class="button-hidden" @click="deleteCompletedTasks" color="colorless"
      :class="{ 'button-visible': completedTasksLength === tasksLength || (notCompletedTasksLength > 0 && completedTasksLength > 0) }">
      Clear completed
    </VButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import VButton from '@/components/ui/VButton.vue'
import type { Task } from '@/types/task'

type ButtonActiveType = 'all' | 'active' | 'completed'

const props = defineProps<{
  tasks: Task[]
  completedTasksLength: number
  notCompletedTasksLength: number
}>()

const emit = defineEmits(['delete-completed-tasks', 'complete-all-tasks', 'filter-tasks'])

const activeType = ref<ButtonActiveType>('all')

const allButtonColor = computed(() => (activeType.value === 'all' ? 'primary' : 'colorless'))
const activeButtonColor = computed(() => (activeType.value === 'active' ? 'primary' : 'colorless'))
const completedButtonColor = computed(() =>
  activeType.value === 'completed' ? 'primary' : 'colorless',
)

const tasksLength = computed(() => props.tasks.length)

const deleteCompletedTasks = () => emit('delete-completed-tasks')
const completeAllTasks = () => {
  activeType.value = 'all'
  emit('complete-all-tasks')
}
const filterTasks = (type: ButtonActiveType) => {
  activeType.value = type
  emit('filter-tasks', type)
}
</script>

<style scoped>
.wrapper-content__footer-actions {
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
  .wrapper-content__footer-actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
