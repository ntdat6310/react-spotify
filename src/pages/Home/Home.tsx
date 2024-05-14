import { useGetCurrentUserProfileQuery, useGetFeaturedPlaylistsQuery } from 'src/redux/apis/spotifyApi'
import Sidebar from './components/Sidebar'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setProfile } from 'src/redux/slices/profile.slice'
import PlaylistCard from './components/PlaylistCard'

export default function Home() {
  const { data: profile } = useGetCurrentUserProfileQuery()
  const dispatch = useDispatch()
  useEffect(() => {
    if (profile) {
      dispatch(setProfile(profile))
    }
  }, [profile, dispatch])

  const { data: featuredPlaylists } = useGetFeaturedPlaylistsQuery()
  console.log('featuredPlaylists  xx', featuredPlaylists?.playlists)

  return (
    <div className='relative flex h-[90vh] w-full bg-black-custom font-body'>
      <Sidebar />
      <div className='hide-scrollbar mt-20 grow overflow-y-auto'>
        <h2 className='mb-6 ml-4 text-4xl font-medium tracking-wide text-white'>Featured Playlists</h2>
        <div className='flex flex-wrap items-center'>
          {featuredPlaylists?.playlists &&
            featuredPlaylists?.playlists.items.map((item) => (
              <PlaylistCard
                key={item.id}
                imgUrl={item.images[0].url}
                title={item.name}
                author={item.owner.display_name}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
