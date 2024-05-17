import { useNavigate, useParams } from 'react-router-dom'
import { config } from 'src/assets/constants/config'
import { useGetUserPlaylistsQuery, useGetUserProfileQuery } from 'src/redux/apis/spotifyApi'
import PlaylistCard from '../Home/components/PlaylistCard'
import Spinner from 'src/components/Spinner'

export default function User() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: userProfile, isLoading: isUserProfileLoading } = useGetUserProfileQuery(id as string, {
    skip: !id
  })
  const { data: userPlaylists, isLoading: isUserPlaylistsLoading } = useGetUserPlaylistsQuery(id as string, {
    skip: !id
  })

  const handlePlaylistClicked = (id: string) => () => {
    navigate(`/playlist/${id}`)
  }

  const isLoading = isUserProfileLoading || isUserPlaylistsLoading
  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className='flex flex-wrap items-end justify-center gap-4 px-4'>
        <div className='h-[250px] w-[250px] shrink-0'>
          <img
            src={(userProfile && userProfile?.images.at(1)?.url) || config.default_image}
            alt='album_img'
            className='h-full w-full rounded-md object-cover'
          />
        </div>
        <div className='flex grow flex-col gap-4 text-white'>
          <p className='capitalize text-gray-300'>{userProfile?.type}</p>
          <h1 className='line-clamp-1 text-2xl font-bold tracking-wide sm:text-3xl xl:text-5xl'>
            {userProfile?.display_name}
          </h1>
          <div className='flex items-center gap-3'>
            <p className='capitalize'>{userPlaylists?.total || 0} public playlists</p>
            <p>{userProfile?.followers.total || 0} Followers</p>
          </div>
        </div>
      </div>

      <div className='mt-10'>
        <h2 className='mb-2 ml-4 text-3xl font-bold tracking-wide text-white'>Public Playlists</h2>
        <div className='flex flex-wrap items-center'>
          {userPlaylists?.items.map((item) => (
            <PlaylistCard
              key={item.id}
              imgUrl={item.images?.length > 0 ? item.images[0].url : undefined}
              title={item.name}
              author={userProfile?.display_name}
              onClick={handlePlaylistClicked(item.id)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
