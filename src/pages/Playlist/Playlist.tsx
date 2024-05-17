/* eslint-disable react/no-unescaped-entities */
import { useMemo } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegClock } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { config } from 'src/assets/constants/config'
import Spinner from 'src/components/Spinner'
import {
  useAddTrackToPlaylistMutation,
  useGetPlaylistQuery,
  useGetRecommendationTracksQuery,
  useRemoveTrackFromPlaylistMutation
} from 'src/redux/apis/spotifyApi'
import { formatTotalTime } from 'src/utils/helper'
import PlaylistItem from './component/PlaylistItem/PlaylistItem'
import RecommendedTrackItem from './component/RecommendedTrackItem/RecommendedTrackItem'
import { toast } from 'react-toastify'

export default function Playlist() {
  const { id } = useParams()
  const {
    data: playlist,
    isLoading: isLoadingPlaylist,
    refetch: refetchPlaylist
  } = useGetPlaylistQuery(id as string, {
    skip: !id
  })

  const totalTime = useMemo(() => {
    if (playlist) {
      return playlist.tracks.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.track.duration_ms
      }, 0)
    }
    return 0
  }, [playlist])

  const seed_artists = playlist && playlist.tracks.items.at(0)?.track.artists.at(0)?.id
  const seed_tracks = playlist && playlist.tracks.items.at(0)?.track.id

  const {
    data: recommendedTracks,
    isLoading: isLoadingRecommendedTracks,
    refetch: refetchRecommendedTracks
  } = useGetRecommendationTracksQuery(
    { seed_artists: seed_artists as string, seed_tracks: seed_tracks as string },
    {
      skip: !seed_artists || !seed_tracks
    }
  )

  const [addTrackToPlaylist] = useAddTrackToPlaylistMutation()

  const handleRefreshRecommendedTracks = () => {
    refetchRecommendedTracks()
  }

  const handleAddTrackToCurrentPlaylist = (trackUri: string) => {
    addTrackToPlaylist({
      playlistId: playlist?.id as string,
      uris: [trackUri]
    })
      .unwrap()
      .then(() => {
        refetchPlaylist()
        toast.success(`Added to ${playlist?.name}`, {
          autoClose: 1500,
          position: 'top-center'
        })
      })
  }

  const [removeTrack] = useRemoveTrackFromPlaylistMutation()
  const handleRemoveTrackFromPlaylist = (trackUri: string) => () => {
    removeTrack({
      playlistId: playlist?.id as string,
      uri: trackUri
    })
      .unwrap()
      .then(() => {
        toast.success('Track is removed!', { autoClose: 1500, position: 'top-center' })
        refetchPlaylist()
      })
  }

  const isLoading = isLoadingPlaylist || isLoadingRecommendedTracks
  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className='flex flex-wrap items-end justify-center gap-4 px-4'>
        <div className='h-[250px] w-[250px] shrink-0'>
          <img
            src={(playlist && playlist.images.length > 0 && playlist.images[0].url) || config.default_image}
            alt='playlist_img'
            className='h-full w-full rounded-md object-cover'
          />
        </div>
        <div className='flex grow flex-col gap-4 text-white'>
          <p className='text-gray-300'>Playlist</p>
          <h1 className='line-clamp-1 text-2xl font-bold tracking-wide sm:text-3xl xl:text-5xl'>{playlist?.name}</h1>
          <div className='flex items-center gap-3'>
            <div className='h-10 w-10'>
              <img
                src={(playlist && playlist.images.length > 0 && playlist.images[0].url) || config.default_image}
                alt='playlist_img'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <p className=''>{playlist?.owner.display_name}</p>
            <p className='text-gray-300'>{playlist?.tracks.total} songs</p>
            <p className='hidden text-gray-300 sm:block'>{formatTotalTime(totalTime)}</p>
          </div>
        </div>
      </div>

      <div className='mt-10 text-xl text-gray-300'>
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
              {playlist &&
                playlist.tracks.items.map((track, index) => (
                  <PlaylistItem
                    key={track.track.id}
                    track={track.track}
                    index={index + 1}
                    onRemoveTrack={handleRemoveTrackFromPlaylist(track.track.uri)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className='my-10 text-xl xl:px-4'>
        <h2 className=' px-2 text-3xl font-semibold text-white xl:px-0'>Recommended</h2>
        <div className='mb-6 mt-2 flex items-center justify-between px-2 text-xl text-gray-300 xl:px-0'>
          <p>Based on what's in this playlist</p>
          <button onClick={handleRefreshRecommendedTracks} className='font-semibold text-gray-300'>
            Refresh
          </button>
        </div>
        {recommendedTracks?.tracks?.map((track) => (
          <RecommendedTrackItem key={track.id} track={track} onAddClicked={handleAddTrackToCurrentPlaylist} />
        ))}
      </div>
    </>
  )
}
