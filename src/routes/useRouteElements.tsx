import { useRoutes } from 'react-router-dom'
import Home from 'src/pages/Home'
import Login from 'src/pages/Login'
import ProtectedRoute from './ProtectedRoute'
import RejectedRoute from './RejectedRoute'

export default function useRouteElements() {
  const elements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <Home />
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: <Login />
        }
      ]
    }
  ])
  return elements
}
