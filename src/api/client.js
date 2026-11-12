import { demoUser, initialNotes, initialPosts, initialUsers } from '../data/mockData'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/$/, '')
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false'
const wait = (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms))
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) || fallback } catch { return fallback } }
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value))
const paginate = (items, current = 1, limit = 12) => ({ results: items.slice((current - 1) * limit, current * limit), page: current, limit, total: items.length, totalPages: Math.max(1, Math.ceil(items.length / limit)) })

async function request(path, options = {}) {
  const token = localStorage.getItem('noted_token')
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }), ...options.headers } })
  const data = response.status === 204 ? null : await response.json()
  if (!response.ok) throw new Error(data?.message || 'Something went wrong')
  return data
}

export const api = {
  async login(credentials) {
    if (!USE_MOCK) return request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) })
    await wait(); if (!credentials.email || !credentials.password) throw new Error('Enter your email and password')
    return { token: 'demo.jwt.token', user: { ...demoUser, email: credentials.email } }
  },
  async register(payload) {
    if (!USE_MOCK) return request('/auth/register', { method: 'POST', body: JSON.stringify(payload) })
    await wait(); return { token: 'demo.jwt.token', user: { ...demoUser, ...payload, id: crypto.randomUUID(), role: 'user' } }
  },
  async getNotes({ page = 1, limit = 12 } = {}) {
    if (!USE_MOCK) return request(`/notes?page=${page}&limit=${limit}`)
    await wait(); return paginate(read('noted_notes', initialNotes), page, limit)
  },
  async getAdminNotes({ page = 1, limit = 12 } = {}) {
    if (!USE_MOCK) return request(`/admin/notes?page=${page}&limit=${limit}`)
    await wait(); return paginate(read('noted_notes', initialNotes), page, limit)
  },
  async createNote(payload) {
    if (!USE_MOCK) return request('/notes', { method: 'POST', body: JSON.stringify(payload) })
    await wait(); const notes = read('noted_notes', initialNotes); const now = new Date().toISOString(); const note = { ...payload, id: crypto.randomUUID(), owner: demoUser, createdAt: now, updatedAt: now }; write('noted_notes', [note, ...notes]); return note
  },
  async updateNote(id, payload) {
    if (!USE_MOCK) return request(`/notes/${id}`, { method: 'PATCH', body: JSON.stringify(payload) })
    await wait(); const notes = read('noted_notes', initialNotes).map((note) => note.id === id ? { ...note, ...payload, updatedAt: new Date().toISOString() } : note); write('noted_notes', notes); return notes.find((note) => note.id === id)
  },
  async deleteNote(id) {
    if (!USE_MOCK) return request(`/notes/${id}`, { method: 'DELETE' })
    await wait(); write('noted_notes', read('noted_notes', initialNotes).filter((note) => note.id !== id))
  },
  async getPosts({ page = 1, limit = 10 } = {}) {
    if (!USE_MOCK) return request(`/posts?page=${page}&limit=${limit}`)
    await wait(); return paginate(read('noted_posts', initialPosts), page, limit)
  },
  async createPost(payload) {
    if (!USE_MOCK) return request('/posts', { method: 'POST', body: JSON.stringify(payload) })
    await wait(); const posts = read('noted_posts', initialPosts); const post = { id: crypto.randomUUID(), author: demoUser, content: payload.content, createdAt: new Date().toISOString(), likes: 0 }; write('noted_posts', [post, ...posts]); return post
  },
  async getUsers({ page = 1, limit = 10 } = {}) {
    if (!USE_MOCK) return request(`/admin/users?page=${page}&limit=${limit}`)
    await wait(); return paginate(read('noted_users', initialUsers), page, limit)
  },
  async createUser(payload) {
    if (!USE_MOCK) return request('/admin/users', { method: 'POST', body: JSON.stringify(payload) })
    await wait(); const users = read('noted_users', initialUsers); const user = { ...payload, id: crypto.randomUUID(), interests: payload.interests || [] }; delete user.password; write('noted_users', [user, ...users]); return user
  },
  async updateUser(id, payload) {
    if (!USE_MOCK) return request(`/admin/users/${id}`, { method: 'PATCH', body: JSON.stringify(payload) })
    await wait(); const users = read('noted_users', initialUsers).map((user) => user.id === id ? { ...user, ...payload } : user); write('noted_users', users); return users.find((user) => user.id === id)
  },
  async deleteUser(id) {
    if (!USE_MOCK) return request(`/admin/users/${id}`, { method: 'DELETE' })
    await wait(); write('noted_users', read('noted_users', initialUsers).filter((user) => user.id !== id))
  },
  async getInterestGroups() {
    if (!USE_MOCK) { const data = await request('/admin/interests/groups?page=1&limit=20'); return data.results }
    await wait(); const groups = {}; read('noted_users', initialUsers).forEach((user) => user.interests.forEach((interest) => { groups[interest] = [...(groups[interest] || []), user] })); return Object.entries(groups).map(([interest, users]) => ({ interest, count: users.length, users })).sort((a, b) => b.count - a.count)
  },
}
