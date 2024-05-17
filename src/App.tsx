import { useDispatch } from 'react-redux'
import useRouteElements from './routes/useRouteElements'
import { LocalStorageEventTarget } from './utils/auth'
import { reset, setProfile } from './redux/slices/profile.slice'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useGetCurrentUserProfileQuery } from './redux/apis/spotifyApi'
import Spinner from './components/Spinner'

function App() {
  const dispatch = useDispatch()

  const { data: profile, isLoading } = useGetCurrentUserProfileQuery()
  useEffect(() => {
    if (profile) {
      dispatch(setProfile(profile))
    }
  }, [profile, dispatch])

  // Listen event clearLS so I can reset global state
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', () => {
      dispatch(reset())
    })
  }, [dispatch])

  const routeElements = useRouteElements()
  return isLoading ? (
    <div className='h-screen w-screen bg-black-custom'>
      <Spinner />
    </div>
  ) : (
    <div>
      <ToastContainer />
      {routeElements}
    </div>
  )
}

export default App
