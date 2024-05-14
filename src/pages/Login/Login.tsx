import { useEffect } from 'react'
import { FaSpotify } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useQueryParams from 'src/hooks/useQueryParams'
import { useGetTokensQuery } from 'src/redux/apis/spotifyApi'
import { setIsAuthenticated } from 'src/redux/slices/profile.slice'
import { setAccessTokenToLS, setRefreshTokenToLS } from 'src/utils/auth'
import { redirectToSpotifyAuthCodeFlow } from 'src/utils/spotify'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { code } = useQueryParams()

  const { data } = useGetTokensQuery(code, {
    skip: !code
  })

  useEffect(() => {
    if (data) {
      setAccessTokenToLS(data.access_token)
      setRefreshTokenToLS(data.refresh_token)
      dispatch(setIsAuthenticated(true))
      navigate({
        pathname: '/'
      })
    }
  }, [data, navigate, dispatch])

  const handleLoginSpotify = () => {
    redirectToSpotifyAuthCodeFlow()
  }

  return (
    <div className='h-[100vh] w-full bg-black text-white'>
      <div className='flex h-full flex-col items-center justify-center gap-10'>
        <div className='overflow-hidden whitespace-nowrap text-3xl'>
          <span className='animate-marquee inline-block'>Welcome to Spotify</span>
        </div>
        <FaSpotify className='h-20 w-20 text-fuchsia-500' />
        <button
          onClick={handleLoginSpotify}
          className='rounded-lg border-2 border-fuchsia-500 px-10 pb-4 pt-3 text-xl hover:bg-fuchsia-700'
        >
          Connect to Spotify
        </button>
      </div>
    </div>
  )
}
