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
  max-height: 92px;
  height: 100%;
  overflow: auto;
}

.task-list::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: transparent;
}

.task-list::-webkit-scrollbar-thumb {
  background-color: rgba(32, 36, 39, 0.1);
  border-radius: 4px;
}

.task-list::-webkit-scrollbar-thumb:hover {
  background-color: rgba(32, 36, 39, 0.2);
}

.task-list::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 4px;
}
</style>
