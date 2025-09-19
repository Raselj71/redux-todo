

export type User = { id: string; email: string; name: string; password: string }


export  type loginResponse={
    token:string,
    expiresAt:number,
    User:User

}


export type todoResponse={

      id: string,
      userId: string
      title:string
      description:string
      status: 'todo'| 'in_progress' | 'done',
      priority:number
      tags:  string
      dueDate: string
      createdAt: string,
      updatedAt: string
    
}

export type Todo = {
  userId: string;
  id: string
  title: string
  description?: string
  status: 'todo'|'in_progress'|'done'
  priority?: number
  tags?: string
  dueDate?: string | null
  createdAt: string
  updatedAt: string
}

export type ListResponse = {
  data: Todo[]
  total: number
  page: number
  limit: number
}