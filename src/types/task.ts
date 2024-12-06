export type Task = {
  id: string
  title: string
  isCompleted: boolean
}

export type TaskType = 'progress' | 'completed' | 'all'
