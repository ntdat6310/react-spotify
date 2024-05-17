import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { config } from 'src/assets/constants/config'
import AddTrackToPlaylist from 'src/components/AddTrackToPlaylist'
import Popover from 'src/pages/Home/components/Popover'
import { TracksItem } from 'src/types/album.type'
import { Playlist, Track } from 'src/types/playlist.type'

interface Props {
  track?: Track
  onAddClicked?: (trackUri: string) => void
  isCurrentUserOwnPlaylist: boolean
  currentUserPlaylists: Playlist[]
}
export default function RecommendedTrackItem({
  track,
  onAddClicked,
  isCurrentUserOwnPlaylist,
  currentUserPlaylists
}: Props) {
  const artistsName = track && track.artists.map((artist) => artist.name).join(', ')
  return track ? (
    <div className='my-2 grid grid-cols-12 rounded-md p-2 text-white hover:bg-black-custom-hover xl:gap-4'>
      <div className='col-span-8 flex items-center gap-x-3 xl:col-span-5'>
        <div className='h-14 w-14 shrink-0 rounded-md'>
          <img
            src={track.album.images ? track.album.images.at(0)?.url : config.default_image}
            alt='img'
            className='h-full w-full rounded-md object-cover'
          />
        </div>
        <div className='flex flex-col justify-between'>
          <h3 className='line-clamp-1 text-lg font-semibold capitalize xl:text-xl'>{track.name}</h3>
          <p className='line-clamp-1 text-sm capitalize text-gray-300 xl:text-base'>{artistsName}</p>
        </div>
      </div>
      <div className='col-span-4 grid grid-cols-12 xl:col-span-7 xl:gap-x-4'>
        <Link
          to={`/album/${track.album.id}`}
          className='group line-clamp-1 hidden items-center underline-offset-8 hover:text-amber-400 hover:underline xl:col-span-10 xl:flex'
        >
          <p className='line-clamp-1 text-gray-300 group-hover:text-amber-400'>{track.album.name}</p>
        </Link>
        <div className='col-span-12 flex items-center justify-end xl:col-span-2'>
          {isCurrentUserOwnPlaylist ? (
            <button
              onClick={() => {
                onAddClicked && onAddClicked(track.uri)
              }}
              className='rounded-3xl border-2 border-gray-500 px-4 py-1 text-base text-gray-300 hover:border-white hover:text-white sm:text-lg'
            >
              Add
            </button>
          ) : (
            <Popover
              placement='left'
              renderPopover={<AddTrackToPlaylist userPlaylists={currentUserPlaylists} track={track as TracksItem} />}
            >
              <BsThreeDotsVertical className='h-5 w-5 cursor-pointer text-white' />
            </Popover>
          )}
        </div>
      </div>
    </div>
  ) : null
}
