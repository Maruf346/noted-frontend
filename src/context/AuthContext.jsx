import { useMemo, useState } from 'react'
import { api } from '../api/client'
import { AuthContext } from './auth'
const storedUser = () => { try { return JSON.parse(localStorage.getItem('noted_user')) } catch { return null } }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storedUser)
  const authenticate = async (method, payload) => {
    const data = await api[method](payload)
    localStorage.setItem('noted_token', data.token); localStorage.setItem('noted_user', JSON.stringify(data.user)); setUser(data.user)
    return data.user
  }
  const logout = () => { localStorage.removeItem('noted_token'); localStorage.removeItem('noted_user'); setUser(null) }
  const value = useMemo(() => ({ user, login: (data) => authenticate('login', data), register: (data) => authenticate('register', data), logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
