<template>
  <div class="wrapper-content__footer-actions">
    <VButton
      @click="completeAllTasks"
      :class="{ 'button-hidden': completedTasksLength === tasksLength }"
      color="colorless"
    >
      Check all
    </VButton>
    <VButton :color="allButtonColor" @click="getAllTasksHandler"> All </VButton>
    <VButton
      :color="activeButtonColor"
      @click="getNotCompletedTasksHandler"
      :class="{ 'button-hidden': notCompletedTasksLength === 0 }"
    >
      Active
    </VButton>
    <VButton
      :color="completedButtonColor"
      @click="getCompletedTasksHandler"
      :class="{ 'button-hidden': completedTasksLength === 0 }"
    >
      Completed
    </VButton>
    <VButton
      @click="deleteCompletedTasks"
      color="colorless"
      :class="{ 'button-hidden': completedTasksLength < 1 }"
    >
      Clear completed
    </VButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import VButton from '@/components/ui/VButton.vue'
import { useTaskStore } from '@/stores/task.ts'
import type { Task } from '@/types/task.ts'

type ButtonActiveType = 'all' | 'active' | 'completed'

const activeType = ref<ButtonActiveType>('all')

const emits = defineEmits(['setFiltered'])

const taskStore = useTaskStore()
const tasks = computed<Task[]>(() => taskStore.tasks)

const allButtonColor = computed(() => {
  return activeType.value === 'all' ? 'primary' : 'colorless'
})

const completedTasksLength = computed(() => {
  return taskStore.completedTasks.length
})

const notCompletedTasksLength = computed(() => {
  return taskStore.notCompletedTasks.length
})

const tasksLength = computed(() => {
  return taskStore.tasks.length
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
  activeType.value = 'all'
  emits('setFiltered', false)
  await taskStore.fetchTasks()
}

const getCompletedTasksHandler = () => {
  if (activeType.value === 'completed') return
  activeType.value = 'completed'
  emits('setFiltered', true)
  const completedTasks = tasks.value.filter((task) => task.isCompleted)
  taskStore.setTasks(completedTasks)
}

const getNotCompletedTasksHandler = () => {
  if (activeType.value === 'active') return
  activeType.value = 'active'
  emits('setFiltered', true)
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
