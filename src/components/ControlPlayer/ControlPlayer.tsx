/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames'
import { useContext } from 'react'
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from 'react-icons/bs'
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg'
import { FiRepeat } from 'react-icons/fi'
import { IoIosAddCircle } from 'react-icons/io'

import { config } from 'src/assets/constants/config'
import { PlayerContext } from 'src/context/PlayerContext'
import { millisecondsToMinutesAndSeconds } from 'src/utils/helper'
import VolumnControl from '../VolumnControl'

export default function ControlPlayer() {
  const {
    play,
    pause,
    currentTrack,
    playStatus,
    time,
    seekBarRef,
    setSeekTime,
    loop,
    toggleLoop,
    isTrackQueueContainingCurrentTrack,
    addCurrentTrackToQueue,
    removeCurrentTrackFromQueue,
    next,
    previous,
    isNextAvailable,
    isPreviousAvailable
  } = useContext(PlayerContext)

  return (
    <div className='flex h-full items-center justify-between border-t border-gray-800 bg-black px-4 py-2'>
      <div className='flex items-center gap-x-3'>
        <div className='h-12 w-12 shrink-0 rounded-md'>
          <img
            src={
              currentTrack?.album?.images && currentTrack?.album?.images.length > 0
                ? currentTrack?.album?.images[0].url
                : config.default_image
            }
            alt='img_current_track'
            className='h-full w-full rounded-md object-cover'
          />
        </div>
        <div className='flex max-w-[250px] flex-col text-lg'>
          <h3 className='line-clamp-1 font-bold text-white'>{currentTrack?.name}</h3>
          <span className='line-clamp-1 text-gray-300'>
            {currentTrack?.artists.map((artist) => artist.name).join(', ')}
          </span>
        </div>
      </div>
      <div className=' hidden flex-col items-center justify-between gap-2 xl:flex'>
        <div className='flex items-center gap-x-5 text-white'>
          {!currentTrack && <IoIosAddCircle className='h-8 w-8 cursor-not-allowed text-gray-500' />}
          {currentTrack &&
            (isTrackQueueContainingCurrentTrack ? (
              <IoIosAddCircle className='h-8 w-8 cursor-pointer text-green-500' onClick={removeCurrentTrackFromQueue} />
            ) : (
              <IoIosAddCircle className='h-8 w-8 cursor-pointer text-white' onClick={addCurrentTrackToQueue} />
            ))}

          {isPreviousAvailable ? (
            <CgPlayTrackPrev onClick={previous} className='h-8 w-8 cursor-pointer' />
          ) : (
            <CgPlayTrackPrev className='h-8 w-8 cursor-not-allowed text-gray-500' />
          )}

          {playStatus ? (
            <BsFillPauseCircleFill
              className='h-7 w-7 cursor-pointer text-white'
              onClick={() => {
                pause()
              }}
            />
          ) : currentTrack ? (
            <BsFillPlayCircleFill
              className='h-7 w-7 cursor-pointer'
              onClick={() => {
                play()
              }}
            />
          ) : (
            <BsFillPlayCircleFill className='h-7 w-7 cursor-not-allowed text-gray-500' />
          )}

          {isNextAvailable ? (
            <CgPlayTrackNext onClick={next} className='h-8 w-8 cursor-pointer' />
          ) : (
            <CgPlayTrackNext className='h-8 w-8 cursor-not-allowed text-gray-500' />
          )}

          {currentTrack ? (
            <FiRepeat
              className={classNames('h-5 w-5 cursor-pointer', {
                'text-blue-500': loop,
                'text-white': !loop
              })}
              onClick={toggleLoop}
            />
          ) : (
            <FiRepeat className='h-5 w-5 cursor-not-allowed text-gray-500' />
          )}
        </div>
        <div className='flex items-center gap-x-2 text-white'>
          <span>{millisecondsToMinutesAndSeconds(time.currentTime * 1000)}</span>
          {currentTrack ? (
            <div className='w-[350px] cursor-pointer bg-white' onClick={setSeekTime}>
              <hr ref={seekBarRef} className={` h-[6px] w-0 border-0 bg-blue-500`}></hr>
            </div>
          ) : (
            <div className='cursor- h-[6px] w-[350px] cursor-not-allowed bg-gray-500'></div>
          )}
          <span>{millisecondsToMinutesAndSeconds(time.totalTime * 1000)}</span>
        </div>
      </div>
      <div className='hidden px-4 xl:block'>
        <VolumnControl />
      </div>
      <div className='xl:hidden'>
        {!currentTrack && <BsFillPlayCircleFill className='h-8 w-8 cursor-not-allowed text-gray-500' />}
        {currentTrack &&
          (playStatus ? (
            <BsFillPauseCircleFill
              className='h-8 w-8 cursor-pointer text-white'
              onClick={() => {
                pause()
              }}
            />
          ) : (
            <BsFillPlayCircleFill
              className='h-8 w-8 cursor-pointer text-white'
              onClick={() => {
                play()
              }}
            />
          ))}
      </div>
    </div>
  )
}
