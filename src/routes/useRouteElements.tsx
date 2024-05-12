import { useRoutes } from 'react-router-dom'
import MainLayout from 'src/layouts/MainLayout'
import Discover from 'src/pages/Discover'

export default function useRouteElements() {
  const elements = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <Discover />
        </MainLayout>
      )
    }
  ])
  return elements
}
