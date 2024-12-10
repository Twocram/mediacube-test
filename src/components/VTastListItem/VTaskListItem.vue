<template>
  <div class="task-list__item">
    <div class="task-list__item-handle" :class="{ hidden: isFiltered }">
      <VDragIcon />
    </div>
    <VCheckbox :value="isCompleted" class="task-list__item-checkbox" @change="changeHandler($event)" />
    <span class="task-list__item-label" :class="{ 'task-list__item-label--completed': isCompleted }">{{ title }}</span>
    <div class="task-list__item-actions">
      <VPencilIcon class="task-list__item-pencil" @click="emits('edit', { id, title, isCompleted })" />
      <VBinIcon class="task-list__item-bin" @click="deleteTaskHandler(id)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task.ts'
import VBinIcon from '@/components/icons/VBinIcon.vue'
import VPencilIcon from '@/components/icons/VPencilIcon.vue'
import VCheckbox from '@/components/ui/VCheckbox.vue'
import VDragIcon from '@/components/icons/VDragIcon.vue'

type Props = {
  id: string
  title: string
  isCompleted: boolean
  isFiltered: boolean
}

const taskStore = useTaskStore()

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
.task-list__item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.task-list__item:hover .task-list__item-handle {
  opacity: 1;
  pointer-events: all;
}

.task-list__item-handle.hidden {
  opacity: 0;
  cursor: default;
  pointer-events: none;
}

.task-list__item:hover .task-list__item-handle.hidden {
  opacity: 0;
  cursor: default;
  pointer-events: none;
}

.task-list__item:last-child {
  margin-bottom: 0;
}

.task-list__item-handle {
  display: flex;
  align-items: center;
  margin-right: 8px;
  cursor: grab;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  user-select: none;
  pointer-events: none;
}

.task-list__item-handle:active {
  cursor: grabbing;
}

.task-list__item-checkbox {
  margin-right: 8px;
}

.task-list__item-label {
  font-size: 14px;
  line-height: 16px;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-list__item-label--completed {
  color: var(--gray-color);
}

.task-list__item-actions {
  display: flex;
  margin-left: auto;
  gap: 16px;
}

.task-list__item-pencil {
  cursor: pointer;
}

.task-list__item-bin {
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .task-list__item-handle {
    opacity: 1;
    pointer-events: all;
  }
}
</style>
