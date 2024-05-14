import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from 'src/redux/store'

export default function ProtectedRoute() {
  const isAuthenticated = useSelector((state: RootState) => state.profile.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
