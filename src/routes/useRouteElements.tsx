import { useRoutes } from 'react-router-dom'
import Home from 'src/pages/Home'
import Login from 'src/pages/Login'
import ProtectedRoute from './ProtectedRoute'
import RejectedRoute from './RejectedRoute'
import MainLayout from 'src/layouts/MainLayout'
import Album from 'src/pages/Album'
import Playlist from 'src/pages/Playlist'

export default function useRouteElements() {
  const elements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: (
            <MainLayout>
              <Home />
            </MainLayout>
          )
        },
        {
          path: '/album/:id',
          element: (
            <MainLayout>
              <Album />
            </MainLayout>
          )
        },
        {
          path: '/playlist/:id',
          element: (
            <MainLayout>
              <Playlist />
            </MainLayout>
          )
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
