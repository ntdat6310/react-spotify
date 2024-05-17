import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegClock } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { config } from 'src/assets/constants/config'
import {
  useGetArtistAlbumsQuery,
  useGetArtistProfileQuery,
  useGetArtistRelatedArtistsQuery,
  useGetArtistTopTracksQuery,
  useGetCurrentUserPlaylistsQuery
} from 'src/redux/apis/spotifyApi'
import { formatNumberToSocialStyle } from 'src/utils/helper'
import PlaylistItem from '../Playlist/component/PlaylistItem/PlaylistItem'
import PlaylistCard from '../Home/components/PlaylistCard'
import ArtistCard from 'src/components/ArtistCard'
import Spinner from 'src/components/Spinner'

export default function Artist() {
  const { id } = useParams()

  const { data: profile, isFetching: isProfileLoading } = useGetArtistProfileQuery(id as string, {
    skip: Boolean(!id)
  })

  const { data: topTracks, isFetching: isTopTracksLoading } = useGetArtistTopTracksQuery(id as string, {
    skip: Boolean(!id)
  })

  const { data: albums, isFetching: isAlbumsLoading } = useGetArtistAlbumsQuery(id as string, {
    skip: Boolean(!id)
  })

  const { data: relatedArtists, isFetching: isRelatedArtistsLoading } = useGetArtistRelatedArtistsQuery(id as string, {
    skip: Boolean(!id)
  })

  const { data: currentUserPlaylists } = useGetCurrentUserPlaylistsQuery()

  const navigate = useNavigate()
  const onAlbumClicked = (albumId: string) => () => {
    navigate({
      pathname: `/album/${albumId}`
    })
  }

  const onArtistClicked = (artistId: string) => () => {
    navigate({
      pathname: `/artist/${artistId}`
    })
  }

  const isLoading = isRelatedArtistsLoading || isAlbumsLoading || isTopTracksLoading || isProfileLoading
  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      {/* Header */}
      <div className='flex flex-wrap items-end justify-center gap-4 px-4'>
        <div className='h-[250px] w-[250px] shrink-0'>
          <img
            src={(profile && profile?.images.at(0)?.url) || config.default_image}
            alt='album_img'
            className='h-full w-full rounded-md object-cover'
          />
        </div>
        <div className='flex grow flex-col gap-4 text-white'>
          <p className='capitalize text-gray-300'>{profile?.type}</p>
          <h1 className='line-clamp-1 text-2xl font-bold tracking-wide sm:text-3xl xl:text-5xl'>{profile?.name}</h1>
          <div className='flex items-center gap-3'>
            <p className='capitalize'>{formatNumberToSocialStyle(profile?.followers.total || 0)} followers</p>
          </div>
        </div>
      </div>

      {/* Top Tracks */}
      <div className='mt-10 text-xl text-gray-300'>
        <h2 className='mb-5 ml-4 text-3xl font-bold text-white'>Popular</h2>
        <div className='hide-scrollbar overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='mb-2 grid grid-cols-12'>
              <div className='col-span-1 text-center'>#</div>
              <div className='col-span-5'>Title</div>
              <div className='col-span-2'>Artist</div>
              <div className='col-span-2'>Album</div>
              <div className='col-span-1 flex items-center justify-center'>
                <FaRegClock className='h-5 w-5' />
              </div>
              <div className='col-span-1 flex items-center justify-center'>
                <BsThreeDotsVertical className='h-5 w-5 text-white' />
              </div>
            </div>
            <div className='mb-4 mt-2 h-[1px] w-full bg-gray-600'></div>
            <div className='flex flex-col gap-2'>
              {currentUserPlaylists &&
                topTracks?.tracks &&
                topTracks.tracks.map((track, index) => (
                  <PlaylistItem
                    key={track.id}
                    track={track}
                    index={index + 1}
                    isCurrentUserOwnPlaylist={false}
                    currentUserPlaylists={currentUserPlaylists?.items}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Albums */}
      <div className='mt-10'>
        <h2 className='mb-5 ml-4 text-3xl font-bold text-white'>Albums</h2>
        {albums &&
          albums.items.map((album) => (
            <PlaylistCard
              key={album.id}
              imgUrl={album?.images && album?.images.length > 0 ? album.images.at(0)?.url : undefined}
              title={album.name}
              author={album?.artists && album?.artists.map((artist) => artist.name).join(', ')}
              onClick={onAlbumClicked(album.id)}
            />
          ))}
      </div>

      {/* Related Artists */}
      <div className='mt-10'>
        <h2 className='mb-5 ml-4 text-3xl font-bold text-white'>Fans also like</h2>
        {relatedArtists &&
          relatedArtists.artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} onClick={onArtistClicked(artist.id)} />
          ))}
      </div>
    </div>
  )
}
