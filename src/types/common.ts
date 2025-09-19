export type User = { id: string; email: string; name: string; password: string }
export type Todo = {
  id: string
  userId: string
  title: string
  description?: string
  status: 'todo'|'in_progress'|'done'
  priority?: number
  tags?: string[]
  dueDate?: string | null
  createdAt: string
  updatedAt: string
}