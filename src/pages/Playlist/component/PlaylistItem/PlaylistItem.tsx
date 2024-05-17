import classNames from 'classnames'
import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { TiDelete } from 'react-icons/ti'

import { Link } from 'react-router-dom'
import AddTrackToPlaylist from 'src/components/AddTrackToPlaylist'
import Popover from 'src/pages/Home/components/Popover'
import { TracksItem } from 'src/types/album.type'
import { Playlist, Track } from 'src/types/playlist.type'
import { millisecondsToMinutesAndSeconds } from 'src/utils/helper'
interface Props {
  track?: Track
  index?: number
  onRemoveTrack?: () => void
  isCurrentUserOwnPlaylist: boolean
  currentUserPlaylists: Playlist[]
}

export default function PlaylistItem({
  track,
  index,
  onRemoveTrack,
  isCurrentUserOwnPlaylist,
  currentUserPlaylists
}: Props) {
  const [isOptionOpen, setIsOptionOpen] = useState(false)
  const artistsName = track?.artists && track?.artists.map((item) => item.name)

  return (
    <div
      className={classNames('grid grid-cols-12 gap-x-1 py-2 hover:bg-black-custom-hover', {
        'bg-black-custom-hover': isOptionOpen
      })}
      onMouseLeave={() => {
        setIsOptionOpen(false)
      }}
    >
      <div className='col-span-1 text-center'>{index}</div>
      <div className='col-span-5 line-clamp-1'>{track?.name}</div>
      <div className='col-span-2 line-clamp-1'>{artistsName?.join(', ')}</div>
      <Link
        to={`/album/${track?.album.id}`}
        className='col-span-2 line-clamp-1 hover:text-amber-400 hover:underline hover:underline-offset-8'
      >
        {track?.album.name}
      </Link>
      <div className='col-span-1 flex items-center justify-center'>
        {millisecondsToMinutesAndSeconds(track?.duration_ms || 0)}
      </div>
      <div className='col-span-1 flex items-center justify-center'>
        <Popover
          placement='left'
          renderPopover={
            isCurrentUserOwnPlaylist ? (
              <div
                className='z-50 flex min-w-[200px] flex-col items-start rounded-md
border border-gray-700 bg-[#252136] px-4 py-2 text-[20px] text-lg text-white shadow-md'
              >
                <button
                  className='flex items-center gap-2 px-4 py-2 hover:bg-black-custom-hover hover:text-amber-400'
                  onClick={() => {
                    onRemoveTrack && onRemoveTrack()
                  }}
                >
                  <TiDelete className='h-6 w-6' />
                  <span>Remove from this playlist</span>
                </button>
              </div>
            ) : (
              <AddTrackToPlaylist userPlaylists={currentUserPlaylists} track={track as TracksItem} />
            )
          }
        >
          <BsThreeDotsVertical
            className='h-5 w-5 cursor-pointer text-white'
            onMouseEnter={() => {
              setIsOptionOpen(true)
            }}
          />
        </Popover>
      </div>
    </div>
  )
}
