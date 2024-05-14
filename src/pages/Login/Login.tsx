import { useEffect } from 'react'
import { FaSpotify } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import useQueryParams from 'src/hooks/useQueryParams'
import { useGetTokensQuery } from 'src/redux/apis/spotifyApi'
import { setAccessTokenToLS, setRefreshTokenToLS } from 'src/utils/auth'
import { redirectToSpotifyAuthCodeFlow } from 'src/utils/spotify'

export default function Login() {
  const navigate = useNavigate()
  const { code } = useQueryParams()

  const { data } = useGetTokensQuery(code, {
    skip: !code
  })

  useEffect(() => {
    if (data) {
      setAccessTokenToLS(data.access_token)
      setRefreshTokenToLS(data.refresh_token)
      navigate({
        pathname: '/'
      })
    }
  }, [data, navigate])

  const handleLoginSpotify = () => {
    redirectToSpotifyAuthCodeFlow()
  }

  return (
    <div className='h-[100vh] w-full bg-black text-white'>
      <div className='flex flex-col items-center justify-center h-full gap-10'>
        <div className='text-3xl overflow-hidden whitespace-nowrap'>
          <span className='inline-block animate-marquee'>Welcome to Spotify</span>
        </div>
        <FaSpotify className='w-20 h-20 text-fuchsia-500' />
        <button
          onClick={handleLoginSpotify}
          className='pt-3 pb-4 px-10 rounded-lg border-2 border-fuchsia-500 hover:bg-fuchsia-700 text-xl'
        >
          Connect to Spotify
        </button>
      </div>
    </div>
  )
}
