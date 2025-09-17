import { createSlice, type PayloadAction,  } from '@reduxjs/toolkit'

export type User = { id: string; email: string; name: string }
export type AuthState = {
  token: string | null
  expiresAt: number | null 
  user: User | null
}

const STORAGE_KEY = 'todo_pro_auth'


function expFromJwt(token: string): number | null {
  try {
    const [, payload] = token.split('.')
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    return typeof json.exp === 'number' ? json.exp * 1000 : null
  } catch { return null }
}

function loadPersisted(): AuthState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AuthState
    // drop expired sessions on boot
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return parsed
  } catch { return null }
}

const initialState: AuthState = loadPersisted() ?? {
  token: null,
  expiresAt: null,
  user: null
}


type Credentials = { token: string; user: User; expiresAt?: number }

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, { payload }: PayloadAction<Credentials>) {
      const exp = payload.expiresAt ?? expFromJwt(payload.token) ?? null
      state.token = payload.token
      state.expiresAt = exp
      state.user = payload.user
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    },
    logout(state) {
      state.token = null
      state.user = null
      state.expiresAt = null
      localStorage.removeItem(STORAGE_KEY)
    }
  }
})

export const { setCredentials, logout } = slice.actions
export default slice.reducer


export const isExpired = (s: AuthState) => !s.expiresAt || Date.now() > s.expiresAt
export const isAuthenticated = (s: AuthState) => !!s.token && !!s.user && !isExpired(s)
