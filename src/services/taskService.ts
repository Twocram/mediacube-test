import type { Task } from '@/types/task'

const serverUrl = import.meta.env['VITE_SERVER_URL']

class TaskService {
  async getTasks(): Promise<Task[]> {
    try {
      const response = await fetch(`${serverUrl}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch tasks')
      }

      return response.json()
    } catch (error: unknown) {
      throw error
    }
  }

  async createTask(taskName: string): Promise<Task> {
    const taskBody = {
      id: Date.now().toString(),
      title: taskName,
      isCompleted: false,
    }

    try {
      const response = await fetch(`${serverUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskBody),
      })

      if (!response.ok) {
        throw new Error('Failed to create task')
      }

      return response.json()
    } catch (error: unknown) {
      throw error
    }
  }

  async deleteTask(taskId: string): Promise<Task> {
    try {
      const response = await fetch(`${serverUrl}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete task')
      }
      return response.json()
    } catch (error: unknown) {
      throw error
    }
  }

  async updateTask(taskId: string, options: Omit<Task, 'id'>): Promise<Task> {
    try {
      const response = await fetch(`${serverUrl}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      })

      if (!response.ok) {
        throw new Error('Failed to update task')
      }

      return response.json()
    } catch (error: unknown) {
      throw error
    }
  }
}

export const taskService = new TaskService()
