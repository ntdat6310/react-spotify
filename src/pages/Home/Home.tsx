import { useGetCurrentUserProfileQuery } from 'src/redux/apis/spotifyApi'
import Sidebar from './components/Sidebar'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setProfile } from 'src/redux/slices/profile.slice'

export default function Home() {
  const { data: profile } = useGetCurrentUserProfileQuery()
  const dispatch = useDispatch()
  useEffect(() => {
    if (profile) {
      dispatch(setProfile(profile))
    }
  }, [profile, dispatch])

  return (
    <div className='relative flex h-[90vh] w-full bg-black-custom font-body'>
      <Sidebar />
    </div>
  )
}
