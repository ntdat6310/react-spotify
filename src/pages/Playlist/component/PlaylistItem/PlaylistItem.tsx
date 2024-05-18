import classNames from 'classnames'
import { useContext, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { TiDelete } from 'react-icons/ti'
import { FaPlay, FaPause } from 'react-icons/fa6'

import { Link } from 'react-router-dom'
import AddTrackToPlaylist from 'src/components/AddTrackToPlaylist'
import Popover from 'src/pages/Home/components/Popover'
import { TracksItem } from 'src/types/album.type'
import { Playlist, Track } from 'src/types/playlist.type'
import { millisecondsToMinutesAndSeconds } from 'src/utils/helper'
import { PlayerContext } from 'src/context/PlayerContext'
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
  const [isHover, setIsHover] = useState(false)
  const artistsName = track?.artists && track?.artists.map((item) => item.name)

  const { playNewTrack, currentTrack, playStatus, pause } = useContext(PlayerContext)
  const isCurrentTrackPlaying = currentTrack?.id === track?.id && playStatus
  const isTrackhavingPreviewUrl = Boolean(track?.preview_url)
  return (
    <div
      className={classNames('grid grid-cols-12 gap-x-1 py-2 hover:bg-black-custom-hover', {
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
                  track && playNewTrack(track)
                }}
              />
            </div>
          ) : (
            <span>{index}</span>
          ))}

        {!isTrackhavingPreviewUrl && (
          <div className='flex h-full items-center justify-center'>
            <span>{index}</span>
          </div>
        )}
      </div>
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
