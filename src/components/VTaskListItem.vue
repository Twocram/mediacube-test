<template>
  <div class="todo-list__item">
    <div class="todo-list__item-handle" :class="{ 'hidden': isFiltered }">
      <VDragIcon />
    </div>
    <VCheckbox :value="isCompleted" class="todo-list__item-checkbox" @change="changeHandler($event)" />
    <span class="todo-list__item-label" :class="{ 'todo-list__item-label--completed': isCompleted }">{{ title }}</span>
    <div class="todo-list__item-actions">
      <VPencilIcon class="todo-list__item-pencil" @click="emits('edit', { id, title, isCompleted })" />
      <VBinIcon class="todo-list__item-bin" @click="deleteTaskHandler(id)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task';
import VBinIcon from './icons/VBinIcon.vue';
import VPencilIcon from './icons/VPencilIcon.vue';
import VCheckbox from './ui/VCheckbox.vue';
import VDragIcon from './icons/VDragIcon.vue';

type Props = {
  id: string
  title: string
  isCompleted: boolean
  isFiltered: boolean
}

const taskStore = useTaskStore();

const emits = defineEmits(['edit'])

const deleteTaskHandler = async (taskId: string) => {
  await taskStore.deleteTask(taskId)
}

const props = defineProps<Props>()

const changeHandler = async (value: boolean) => {
  await taskStore.updateTask(props.id, { title: props.title, isCompleted: value })
}

</script>

<style scoped>
.todo-list__item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.todo-list__item:hover .todo-list__item-handle {
  opacity: 1;
  pointer-events: all;
}

.todo-list__item-handle.hidden {
  opacity: 0;
  cursor: default;
  pointer-events: none;
}

.todo-list__item:hover .todo-list__item-handle.hidden {
  opacity: 0;
  cursor: default;
  pointer-events: none;
}

.todo-list__item:last-child {
  margin-bottom: 0;
}

.todo-list__item-handle {
  display: flex;
  align-items: center;
  margin-right: 8px;
  cursor: grab;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  user-select: none;
  pointer-events: none;
}

.todo-list__item-handle:active {
  cursor: grabbing;
}

.todo-list__item-checkbox {
  margin-right: 8px;
}

.todo-list__item-label {
  font-size: 14px;
  line-height: 16px;
}

.todo-list__item-label--completed {
  color: var(--gray-color);
}

.todo-list__item-actions {
  display: flex;
  margin-left: auto;
  gap: 16px;
}

.todo-list__item-pencil {
  cursor: pointer;
}

.todo-list__item-bin {
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .todo-list__item-handle {
    opacity: 1;
    pointer-events: all;
  }
}
</style>
