import { taskService } from '@/api/taskService'
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
      const _task = await taskService.createTask(taskName)
      if (_task) {
        this.setTasks([...this.tasks, _task])
      }
    },

    async deleteTask(taskId: string) {
      const _task = await taskService.deleteTask(taskId)
      if (_task) {
        this.setTasks(this.tasks.filter((task) => task.id !== taskId))
      }
    },

    async updateTask(taskId: string, options: Omit<Task, 'id'>) {
      const _task = await taskService.updateTask(taskId, options)
      if (_task) {
        this.setTasks(this.tasks.map((task) => (task.id === taskId ? _task : task)))
      }
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
