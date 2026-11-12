import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
import { AuthPage } from './pages/AuthPage'
import { InterestsPage } from './pages/InterestsPage'
import { NotesPage } from './pages/NotesPage'
import { PostsPage } from './pages/PostsPage'
import { UsersPage } from './pages/UsersPage'

function ProtectedRoute({ admin = false, children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (admin && user.role !== 'admin') return <Navigate to="/notes" replace />
  return children
}

function PublicOnly({ children }) {
  const { user } = useAuth()
  return user ? <Navigate to="/notes" replace /> : children
}

export default function App() {
  return <AuthProvider><Routes>
    <Route path="/login" element={<PublicOnly><AuthPage /></PublicOnly>} />
    <Route path="/register" element={<PublicOnly><AuthPage mode="register" /></PublicOnly>} />
    <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/admin/users" element={<ProtectedRoute admin><UsersPage /></ProtectedRoute>} />
      <Route path="/admin/notes" element={<ProtectedRoute admin><NotesPage admin /></ProtectedRoute>} />
      <Route path="/admin/interests" element={<ProtectedRoute admin><InterestsPage /></ProtectedRoute>} />
    </Route>
    <Route path="*" element={<Navigate to="/notes" replace />} />
  </Routes></AuthProvider>
}
