<template>
  <div class="task-list">
    <VueDraggableNext v-model="localTasks">
      <TransitionGroup>
        <VTaskListItem @edit="emits('edit', $event)" v-for="task in localTasks" :key="task.id"
          :isCompleted="task.isCompleted" :id="task.id" :title="task.title" />
      </TransitionGroup>
    </VueDraggableNext>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task';
import VTaskListItem from './VTaskListItem.vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { ref, watch } from 'vue';
type Props = {
  tasks: Task[]
}

const props = defineProps<Props>()

const emits = defineEmits(['edit'])

const localTasks = ref<Task[]>([])

watch(() => props.tasks, (newTasks) => {
  localTasks.value = newTasks
})

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
