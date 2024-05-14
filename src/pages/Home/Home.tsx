import {
  useGetCurrentUserProfileQuery,
  useGetFeaturedPlaylistsQuery,
  useGetNewReleasedAlbumsQuery
} from 'src/redux/apis/spotifyApi'
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
  const { data: newReleasedAlbums } = useGetNewReleasedAlbumsQuery()

  return (
    <div className='relative flex h-[90vh] w-full bg-black-custom font-body'>
      <Sidebar />
      <div className='hide-scrollbar mt-20 grow overflow-y-auto px-2'>
        <div>
          <h2 className='mb-6 ml-4 text-4xl font-medium tracking-wide text-white'>Featured Playlists</h2>
          <div className='flex flex-wrap items-center'>
            {featuredPlaylists?.playlists.items.map((item) => (
              <PlaylistCard
                key={item.id}
                imgUrl={item.images[0].url}
                title={item.name}
                author={item.owner.display_name}
              />
            ))}
          </div>
        </div>
        <div className='m-auto my-6 h-[1px] w-[90%] bg-gray-700'></div>
        <div className=''>
          <h2 className='mb-6 ml-4 text-4xl font-medium tracking-wide text-white'>New releases</h2>
          <div className='flex flex-wrap items-center'>
            {newReleasedAlbums?.albums.items.map((item) => (
              <PlaylistCard
                key={item.id}
                imgUrl={item.images.length > 0 ? item.images[0].url : undefined}
                title={item.name}
                author={item.artists.length > 0 ? item.artists[0].name : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
