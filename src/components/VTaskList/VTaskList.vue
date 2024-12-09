<template>
  <div class="task-list">
    <VueDraggableNext handle=".task-list__item-handle" v-model="localTasks">
      <TransitionGroup>
        <VTaskListItem @edit="emits('edit', $event)" v-for="task in localTasks" :key="task.id"
          :isCompleted="task.isCompleted" :id="task.id" :title="task.title" :isFiltered="isFilteredMode" />
      </TransitionGroup>
    </VueDraggableNext>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task.ts'
import VTaskListItem from '@/components/VTastListItem/VTaskListItem.vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { ref, watch } from 'vue'
type Props = {
  tasks: Task[]
  isFiltered: boolean
}

const props = defineProps<Props>()

const emits = defineEmits(['edit'])

const localTasks = ref<Task[]>([])

const isFilteredMode = ref(false)

watch(
  () => props.tasks,
  (newTasks) => {
    localTasks.value = newTasks
  },
)

watch(
  () => props.isFiltered,
  (newValue) => {
    isFilteredMode.value = newValue
  },
)
</script>

<style scoped>
.task-list {
  width: 100%;
  margin-bottom: 25px;
  padding-right: 16px;
  max-height: 92px;
  height: 100%;
  overflow: auto;
}

.task-list::-webkit-scrollbar {
  width: 4px;
  height: 80px;
  background-color: transparent;
}

.task-list::-webkit-scrollbar-thumb {
  background-color: var(--main-prelow-color);
  border-radius: 4px;
}

.task-list::-webkit-scrollbar-thumb:hover {
  background-color: var(--main-prelow-color-hover);
}

.task-list::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 4px;
}
</style>
