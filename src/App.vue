<template>
  <main>
    <div class="container">
      <div class="wrapper">
        <div class="wrapper-content">
          <VTodoIcon class="wrapper-content__icon" />
          <div class="wrapper-content__caption">Today I need to</div>
          <VCreateTaskForm v-model="inputValue" @submit="createTaskHandler($event)" />

          <VTaskList :tasks="tasks" @edit="editTaskHandler($event)" />

          <div class="wrapper-content__cards" v-if="tasks.length > 0">
            <VProgressCard :count="notCompletedTasks.length" :total="tasks.length" color="#2578F4"
              status="In progress" />
            <VProgressCard :count="completedTasks.length" :total="tasks.length" color="rgba(239, 93, 168, 1)"
              status="Completed" />
          </div>

          <div class="wrapper-content__footer" v-if="tasks.length < 1">
            <VCheckmarkIcon /> <span>Congrat, you have no more tasks to do</span>
          </div>
          <VTaskListActions v-else />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import VCheckmarkIcon from './components/icons/VCheckmarkIcon.vue'
import VTodoIcon from './components/icons/VTodoIcon.vue'
import VProgressCard from './components/VProgressCard.vue';
import { useTaskStore } from './stores/task';
import VCreateTaskForm from './components/VCreateTaskForm.vue';
import type { Task, TaskType } from './types/task';
import VTaskListActions from './components/VTaskListActions.vue';
import VTaskList from './components/VTaskList.vue';

const taskStore = useTaskStore()

const inputValue = ref('')

const isEditMode = ref(false)

const editTask = ref<Task | null>(null)

const tasksType = ref<TaskType>('all')

function escapeHandler(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isEditMode.value = false
    inputValue.value = ''
  }
}

onMounted(async () => {
  taskStore.fetchTasks()

  document.addEventListener('keydown', escapeHandler)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', escapeHandler)
})

const createTaskHandler = async (value: string) => {
  if (isEditMode.value && editTask.value) {
    await taskStore.editTask(editTask.value?.id, { title: value, isCompleted: editTask.value.isCompleted })
    isEditMode.value = false
    inputValue.value = ''
    return
  }
  await taskStore.addTask(value)
}

const tasks = computed<Task[]>(() => {
  if (tasksType.value === 'completed') {
    return taskStore.tasks.filter((task) => task.isCompleted)
  }

  if (tasksType.value === 'progress') {
    return taskStore.tasks.filter((task) => !task.isCompleted)
  }
  return taskStore.tasks
})

const completedTasks = computed<Task[]>(() => {
  return tasks.value.filter((task) => task.isCompleted)
})

const notCompletedTasks = computed<Task[]>(() => {
  return tasks.value.filter((task) => !task.isCompleted)
})

const editTaskHandler = async (task: Task) => {
  isEditMode.value = true
  inputValue.value = task.title
  editTask.value = task
}

</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.wrapper {
  max-width: 730px;
  width: 100%;
  max-height: 719px;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 24px;
  padding: 32px;
}

.wrapper-content {
  height: 100%;
  margin: 0 auto;
  max-width: 410px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper-content__icon {
  margin-bottom: 48px;
}

.wrapper-content__caption {
  font-size: 24px;
  line-height: 29.05px;
  font-weight: 700;
  margin-bottom: 52px;
}

.wrapper-content__cards {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}

.wrapper-content__footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.wrapper-content__footer span {
  font-size: 14px;
  line-height: 16px;
  color: var(--gray-color);
}
</style>
