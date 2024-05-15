import { useDispatch } from 'react-redux'
import useRouteElements from './routes/useRouteElements'
import { LocalStorageEventTarget } from './utils/auth'
import { reset } from './redux/slices/profile.slice'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()

  // Listen event clearLS so I can reset global state
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', () => {
      dispatch(reset())
    })
  }, [dispatch])

  const routeElements = useRouteElements()
  return <div>{routeElements}</div>
}

export default App
