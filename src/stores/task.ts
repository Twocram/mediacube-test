import { taskService } from '@/services/taskService'
import type { Task } from '@/types/task'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    isFilteredMode: false,
  }),

  getters: {
    completedTasks: (state) => state.tasks.filter((task) => task.isCompleted),
    notCompletedTasks: (state) => state.tasks.filter((task) => !task.isCompleted),
  },

  actions: {
    setTasks(tasks: Task[]) {
      this.tasks = tasks
    },

    setIsFilteredMode(isFilteredMode: boolean) {
      this.isFilteredMode = isFilteredMode
    },

    async fetchTasks() {
      const _tasks = await taskService.getTasks()
      this.setTasks(_tasks)
    },

    async createTask(taskName: string) {
      await taskService.createTask(taskName)
      await this.fetchTasks()
    },

    async deleteTask(taskId: string) {
      await taskService.deleteTask(taskId)
      await this.fetchTasks()
    },

    async updateTask(taskId: string, options: Omit<Task, 'id'>) {
      await taskService.updateTask(taskId, options)
      await this.fetchTasks()
    },

    async updateTasks(tasks: Task[]) {
      await taskService.updateTasks(tasks)
      await this.fetchTasks()
    },

    async deleteCompletedTasks() {
      const tasks = this.tasks.filter((task) => task.isCompleted)
      await Promise.all(tasks.map((task) => taskService.deleteTask(task.id)))
      await this.fetchTasks()
    },

    async completeAllTasks() {
      const tasks = this.tasks
      await Promise.all(
        tasks.map((task) =>
          taskService.updateTask(task.id, { title: task.title, isCompleted: true }),
        ),
      )
      await this.fetchTasks()
    },
  },
})
