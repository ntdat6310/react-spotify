import classNames from 'classnames'
import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import AddTrackToPlaylist from 'src/components/AddTrackToPlaylist'
import Popover from 'src/pages/Home/components/Popover'
import { TracksItem } from 'src/types/album.type'
import { Playlist } from 'src/types/playlist.type'
import { millisecondsToMinutesAndSeconds } from 'src/utils/helper'

interface Props {
  track?: TracksItem
  userPlaylists?: Playlist[]
}

export default function AlbumItem({ track, userPlaylists = [] }: Props) {
  const [isOptionOpen, setIsOptionOpen] = useState(false)
  const artistsName = track?.artists && track?.artists.map((item) => item.name)
  return (
    <div
      className={classNames('hover:bg-black-custom-hover group grid grid-cols-12 gap-x-1 py-2', {
        'bg-black-custom-hover': isOptionOpen
      })}
      onMouseLeave={() => {
        setIsOptionOpen(false)
      }}
    >
      <div className='col-span-1 text-center'>{track?.track_number}</div>
      <div className='col-span-5 line-clamp-1'>{track?.name}</div>
      <div className='col-span-4 line-clamp-1'>{artistsName?.join(', ')}</div>
      <div className='col-span-1 text-center'>{millisecondsToMinutesAndSeconds(track?.duration_ms || 0)}</div>
      <div className='col-span-1 m-auto'>
        <Popover
          placement='left'
          renderPopover={<AddTrackToPlaylist userPlaylists={userPlaylists} track={track as TracksItem} />}
        >
          <BsThreeDotsVertical
            className='h-5 w-5 cursor-pointer'
            onMouseEnter={() => {
              setIsOptionOpen(true)
            }}
          />
        </Popover>
      </div>
    </div>
  )
}
