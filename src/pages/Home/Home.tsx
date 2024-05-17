import { useNavigate } from 'react-router-dom'
import { useGetFeaturedPlaylistsQuery, useGetNewReleasedAlbumsQuery } from 'src/redux/apis/spotifyApi'
import PlaylistCard from './components/PlaylistCard'
import Spinner from 'src/components/Spinner'
import { config } from 'src/assets/constants/config'

export default function Home() {
  const navigate = useNavigate()

  const { data: featuredPlaylists, isLoading: isFeaturedPlaylistsLoading } = useGetFeaturedPlaylistsQuery()
  const { data: newReleasedAlbums, isLoading: isNewReleasedAlbumsLoading } = useGetNewReleasedAlbumsQuery()

  const handleAlbumClicked = (id: string) => () => {
    navigate(`/album/${id}`)
  }
  const handlePlaylistClicked = (id: string) => () => {
    navigate(`/playlist/${id}`)
  }

  const isLoading = isFeaturedPlaylistsLoading || isNewReleasedAlbumsLoading
  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div>
        <h2 className='mb-6 ml-4 text-4xl font-medium tracking-wide text-white'>Featured Playlists</h2>
        <div className='flex flex-wrap items-center'>
          {featuredPlaylists?.playlists.items.map((item) => (
            <PlaylistCard
              key={item.id}
              imgUrl={(item?.images && item.images.length > 0 && item.images.at(0)?.url) || config.default_image}
              title={item.name}
              author={item.owner.display_name}
              onClick={handlePlaylistClicked(item.id)}
            />
          ))}
        </div>
      </div>
      <div className='m-auto my-6 h-[1px] w-[90%] bg-gray-700'></div>
      <div className=''>
        <h2 className='mb-6 ml-4 text-4xl font-medium tracking-wide text-white'>New Released Albums</h2>
        <div className='flex flex-wrap items-center'>
          {newReleasedAlbums?.albums.items.map((item) => (
            <PlaylistCard
              key={item.id}
              imgUrl={item?.images?.length > 0 ? item.images[0]?.url : undefined}
              title={item.name}
              author={item.artists.length > 0 ? item.artists[0].name : undefined}
              onClick={handleAlbumClicked(item.id)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
