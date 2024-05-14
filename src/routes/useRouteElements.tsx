import { useRoutes } from 'react-router-dom'
import Home from 'src/pages/Home'
import Login from 'src/pages/Login'

export default function useRouteElements() {
  const elements = useRoutes([
    {
      path: '/',
      index: true,
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    }
  ])
  return elements
}
