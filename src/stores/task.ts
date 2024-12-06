import { createTask, deleteTask, getTasks, updateTask, updateTasks } from '@/services/taskService'
import type { Task } from '@/types/task'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
  }),

  actions: {
    setTasks(tasks: Task[]) {
      this.tasks = tasks
    },

    async fetchTasks() {
      const _tasks = await getTasks()
      this.setTasks(_tasks)
    },

    async addTask(taskName: string) {
      await createTask(taskName)
      await this.fetchTasks()
    },

    async removeTask(taskId: string) {
      await deleteTask(taskId)
      await this.fetchTasks()
    },

    async editTask(taskId: string, options: Omit<Task, 'id'>) {
      await updateTask(taskId, options)
      await this.fetchTasks()
    },

    async editAllTasks(tasks: Task[]) {
      await updateTasks(tasks)
      await this.fetchTasks()
    },
  },
})
