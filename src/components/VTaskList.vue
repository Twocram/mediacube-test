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
  margin-bottom: 32px;
}
</style>
