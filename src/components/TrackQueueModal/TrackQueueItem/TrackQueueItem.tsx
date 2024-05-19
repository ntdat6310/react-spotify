import classNames from 'classnames'
import { useContext } from 'react'
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from 'react-icons/bs'
import { TiDelete } from 'react-icons/ti'
import { config } from 'src/assets/constants/config'
import { PlayerContext } from 'src/context/PlayerContext'
import { Track } from 'src/types/playlist.type'

interface Props {
  track: Track
}
export default function TrackQueueItem({ track }: Props) {
  const { currentTrack, playStatus, playNewTrack, pause, removeSpecificTrackFromQueue } = useContext(PlayerContext)
  const isCurrentTrackPlaying = currentTrack?.id === track?.id && playStatus
  return (
    <div
      className={classNames('group relative flex items-center gap-2 rounded-md px-2 py-2 hover:bg-black-custom-hover', {
        'border border-pink-500': isCurrentTrackPlaying,
        'border border-transparent': !isCurrentTrackPlaying
      })}
    >
      <div className='overlay absolute inset-0 hidden bg-black/50 group-hover:block'></div>
      <div className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-x-3 text-white group-hover:flex'>
        {isCurrentTrackPlaying ? (
          <BsFillPauseCircleFill
            className='h-6 w-6 cursor-pointer text-white'
            onClick={() => {
              pause()
            }}
          />
        ) : (
          <BsFillPlayCircleFill
            className='h-6 w-6 cursor-pointer'
            onClick={() => {
              playNewTrack(track)
            }}
          />
        )}

        <TiDelete
          className='h-9 w-9 cursor-pointer text-gray-300 hover:text-white'
          onClick={() => {
            removeSpecificTrackFromQueue(track.id)
          }}
        />
      </div>
      <div className='h-12 w-12 shrink-0 rounded-md'>
        <img
          src={track.album.images.length > 0 ? track.album.images[0].url : config.default_image}
          alt='img_current_track'
          className='h-full w-full rounded-full object-cover'
        />
      </div>
      <div className=''>
        <h3 className='line-clamp-1 font-bold text-white'>{track?.name}</h3>
        <span className='line-clamp-1 text-gray-300'>{track?.artists.map((artist) => artist.name).join(', ')}</span>
      </div>
    </div>
  )
}
