import { useRoutes } from 'react-router-dom'
import MainLayout from 'src/layouts/MainLayout'
import Discover from 'src/pages/Discover'
import Login from 'src/pages/Login'

export default function useRouteElements() {
  const elements = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <Login />
        // <MainLayout>
        //   <Discover />
        // </MainLayout>
      )
    }
  ])
  return elements
}
