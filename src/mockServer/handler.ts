
import { http, HttpResponse, delay } from 'msw'
import * as jose from 'jose'

type User = { id: string; email: string; name: string; password: string }
type Todo = {
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

const db = {
  users: [] as User[],
  todos: [] as Todo[],
  
}


db.users.push({ id: 'u_demo', email: 'demo@todo.pro', name: 'Demo User', password: 'password' })


const JWT_SECRET = new TextEncoder().encode('dev-only-super-secret')

async function makeJwt(userId: string) {
  const expSec = Math.floor(Date.now() / 1000) + 60 * 60 
  const token = await new jose.SignJWT({ sub: userId })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(expSec)
    .sign(JWT_SECRET)

  return { token, expiresAt: expSec * 1000 } 
}

async function getAuth(req: Request) {
  const auth = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!auth) return null
  const [scheme, token] = auth.split(' ')
  if (scheme !== 'Bearer' || !token) return null
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    return { token, userId: String(payload.sub) }
  } catch {
    return null
  }
}


function randomFail() {
  return Math.random() < 0.1
}


export const handlers = [
  http.post('/auth/register', async ({ request }) => {
    await delay(400)
    if (randomFail()) return HttpResponse.json({ message: 'Random failure' }, { status: 500 })

    const payload = await request.json() as { name: string, email: string, password: string }
    if (db.users.some(u => u.email === payload.email)) {
      return HttpResponse.json({ message: 'Email already registered' }, { status: 400 })
    }

    const user: User = {
      id: crypto.randomUUID(),
      email: payload.email,
      name: payload.name,
      password: payload.password
    }
    db.users.push(user)

    const { token, expiresAt } = await makeJwt(user.id)
    return HttpResponse.json({
      token,
      expiresAt,
      user: { id: user.id, email: user.email, name: user.name }
    })
  }),

  http.post('/auth/login', async ({ request }) => {
    await delay(400)
    if (randomFail()) return HttpResponse.json({ message: 'Random failure' }, { status: 500 })

    const payload = await request.json() as { email: string, password: string }
    const user = db.users.find(u => u.email === payload.email && u.password === payload.password)
    if (!user) {
      return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const { token, expiresAt } = await makeJwt(user.id)
    return HttpResponse.json({
      token,
      expiresAt,
      user: { id: user.id, email: user.email, name: user.name }
    })
  }),

  http.get('/todos', async ({ request }) => {
    await delay(300)
    const auth = await getAuth(request as any)
    if (!auth) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const url = new URL((request as any).url)
    const page = Number(url.searchParams.get('page') || 1)
    const limit = Number(url.searchParams.get('limit') || 10)
    const status = url.searchParams.get('status') || ''
    const search = url.searchParams.get('search') || ''
    const sortBy = url.searchParams.get('sortBy') || 'createdAt'
    const sortOrder = (url.searchParams.get('sortOrder') || 'desc') as 'asc'|'desc'

    const all = db.todos
      .filter(t => t.userId === auth.userId)
      .filter(t => (status ? t.status === status : true))
      .filter(t => (search ? (t.title + ' ' + (t.description || '')).toLowerCase().includes(search.toLowerCase()) : true))
      .sort((a: any, b: any) => {
        const av = a[sortBy as keyof Todo] ?? ''
        const bv = b[sortBy as keyof Todo] ?? ''
        if (av < bv) return sortOrder === 'asc' ? -1 : 1
        if (av > bv) return sortOrder === 'asc' ? 1 : -1
        return 0
      })

    const total = all.length
    const start = (page - 1) * limit
    const data = all.slice(start, start + limit)
    return HttpResponse.json({ data, total, page, limit })
  }),

  http.post('/todos', async ({ request }) => {
    await delay(300)
    if (randomFail()) return HttpResponse.json({ message: 'Random failure' }, { status: 500 })

    const auth = await getAuth(request as any)
    if (!auth) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const body = await request.json() as Partial<Todo>
    const now = new Date().toISOString()
    const todo: Todo = {
      id: crypto.randomUUID(),
      userId: auth.userId,
      title: body.title || 'Untitled',
      description: body.description,
      status: (body.status as any) || 'todo',
      priority: body.priority,
      tags: body.tags || [],
      dueDate: (body as any).dueDate ?? null,
      createdAt: now,
      updatedAt: now
    }
    db.todos.unshift(todo)
    return HttpResponse.json(todo, { status: 201 })
  }),

  http.patch('/todos/:id', async ({ params, request }) => {
    await delay(300)
    const auth = await getAuth(request as any)
    if (!auth) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const id = params.id as string
    const patch = await request.json() as Partial<Todo>
    const todo = db.todos.find(t => t.id === id && t.userId === auth.userId)
    if (!todo) return HttpResponse.json({ message: 'Not found' }, { status: 404 })

    Object.assign(todo, patch)
    todo.updatedAt = new Date().toISOString()
    return HttpResponse.json(todo)
  }),

  http.delete('/todos/:id', async ({ params, request }) => {
    await delay(300)
    const auth = await getAuth(request as any)
    if (!auth) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const id = params.id as string
    const idx = db.todos.findIndex(t => t.id === id && t.userId === auth.userId)
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })

    db.todos.splice(idx, 1)
    return HttpResponse.json({ success: true })
  }),
]
