import classNames from 'classnames'
import { useContext, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaPause, FaPlay } from 'react-icons/fa6'
import AddTrackToPlaylist from 'src/components/AddTrackToPlaylist'
import { PlayerContext } from 'src/context/PlayerContext'
import Popover from 'src/pages/Home/components/Popover'
import { Album, TracksItem } from 'src/types/album.type'
import { Playlist } from 'src/types/playlist.type'
import { millisecondsToMinutesAndSeconds } from 'src/utils/helper'

interface Props {
  track?: TracksItem
  userPlaylists?: Playlist[]
  currentAlbum: Album
}

export default function AlbumItem({ track, userPlaylists = [], currentAlbum }: Props) {
  const [isOptionOpen, setIsOptionOpen] = useState(false)
  const [isHover, setIsHover] = useState(false)

  const { playNewTrack, currentTrack, playStatus, pause } = useContext(PlayerContext)
  const isCurrentTrackPlaying = currentTrack?.id === track?.id && playStatus
  const isTrackhavingPreviewUrl = Boolean(track?.preview_url)

  const artistsName = track?.artists && track?.artists.map((item) => item.name)
  return (
    <div
      className={classNames('group grid grid-cols-12 gap-x-1 py-2 hover:bg-black-custom-hover', {
        'bg-black-custom-hover': isOptionOpen
      })}
      onMouseLeave={() => {
        setIsOptionOpen(false)
        setIsHover(false)
      }}
      onMouseEnter={() => {
        setIsHover(true)
      }}
    >
      <div className='col-span-1 text-center'>
        {isTrackhavingPreviewUrl && isCurrentTrackPlaying && (
          <div className='flex h-full items-center justify-center'>
            <FaPause
              className='h-5 w-5 cursor-pointer text-pink-500'
              onClick={() => {
                pause && pause()
              }}
            />
          </div>
        )}
        {isTrackhavingPreviewUrl &&
          !isCurrentTrackPlaying &&
          (isHover ? (
            <div className='flex h-full items-center justify-center'>
              <FaPlay
                className='h-5 w-5 cursor-pointer text-white'
                onClick={() => {
                  track && playNewTrack({ ...track, album: currentAlbum })
                }}
              />
            </div>
          ) : (
            <span>{track?.track_number}</span>
          ))}
      </div>
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
