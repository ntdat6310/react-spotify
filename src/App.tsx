/* eslint-disable jsx-a11y/media-has-caption */
import { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from './components/Spinner'
import { PlayerContext } from './context/PlayerContext'
import { useGetCurrentUserProfileQuery } from './redux/apis/spotifyApi'
import { reset, setProfile } from './redux/slices/profile.slice'
import useRouteElements from './routes/useRouteElements'
import { LocalStorageEventTarget, getAccessTokenFromLS } from './utils/localStorage'

function App() {
  const dispatch = useDispatch()
  const { audioRef, currentTrack, onAudioEnded } = useContext(PlayerContext)
  const access_token = getAccessTokenFromLS()

  const { data: profile, isLoading } = useGetCurrentUserProfileQuery(undefined, {
    skip: !access_token
  })

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
  const url = currentTrack && currentTrack.preview_url ? currentTrack.preview_url : ''
  return isLoading ? (
    <div className='h-screen w-screen bg-black-custom'>
      <Spinner />
    </div>
  ) : (
    <div>
      <ToastContainer />
      {routeElements}
      <audio ref={audioRef} src={url} onEnded={onAudioEnded} preload='auto'></audio>
    </div>
  )
}

export default App
