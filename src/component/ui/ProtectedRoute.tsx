import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'

export default function ProtectedRoute() {
  const { token, expiresAt } = useAppSelector(s => s.auth)
  const location = useLocation()
  const isExpired = expiresAt ? Date.now() > expiresAt : true

  if (!token || isExpired) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <Outlet />
}
