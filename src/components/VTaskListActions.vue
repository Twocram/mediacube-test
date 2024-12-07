<template>
  <div class="wrapper-content__footer-actions">
    <VButton @click="completeAllTasks" :class="{ 'button-hidden': completedTasks === allTasks }" color="colorless">
      Check all
    </VButton>
    <VButton :color="allButtonColor" @click="getAllTasksHandler">
      All
    </VButton>
    <VButton :color="activeButtonColor" @click="getNotCompletedTasksHandler"
      :class="{ 'button-hidden': notCompletedTasks === 0 }">
      Active
    </VButton>
    <VButton :color="completedButtonColor" @click="getCompletedTasksHandler"
      :class="{ 'button-hidden': completedTasks === 0 }">
      Completed
    </VButton>
    <VButton @click="deleteCompletedTasks" color="colorless" :class="{ 'button-hidden': completedTasks < 1 }">
      Clear completed
    </VButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import VButton from './ui/VButton.vue';
import { useTaskStore } from '@/stores/task';
import type { Task } from '@/types/task';

type ButtonActiveType = "all" | "active" | "completed"

type Props = {
  completedTasks: number
  notCompletedTasks: number
  allTasks: number
}

const activeType = ref<ButtonActiveType>('all')

defineProps<Props>()

const taskStore = useTaskStore()
const tasks = computed<Task[]>(() => taskStore.tasks)

const allButtonColor = computed(() => {
  return activeType.value === 'all' ? 'primary' : 'colorless'
})

const activeButtonColor = computed(() => {
  return activeType.value === 'active' ? 'primary' : 'colorless'
})

const completedButtonColor = computed(() => {
  return activeType.value === 'completed' ? 'primary' : 'colorless'
})

const deleteCompletedTasks = async () => {
  await taskStore.deleteCompletedTasks()
}

const completeAllTasks = async () => {
  activeType.value = 'all'
  await taskStore.completeAllTasks()
}

const getAllTasksHandler = async () => {
  if (activeType.value === 'all') return
  activeType.value = 'all';
  await taskStore.fetchTasks()
}

const getCompletedTasksHandler = () => {
  if (activeType.value === 'completed') return
  activeType.value = 'completed';
  const completedTasks = tasks.value.filter((task) => task.isCompleted)
  taskStore.setTasks(completedTasks)
}

const getNotCompletedTasksHandler = () => {
  if (activeType.value === 'active') return
  activeType.value = 'active';
  const notCompletedTasks = tasks.value.filter((task) => !task.isCompleted)
  taskStore.setTasks(notCompletedTasks)
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

@media screen and (max-width: 768px) {
  .wrapper-content__footer-actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
