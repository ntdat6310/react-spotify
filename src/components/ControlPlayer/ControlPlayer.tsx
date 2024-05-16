import { BsFillPauseCircleFill, BsFillPlayCircleFill, BsShuffle } from 'react-icons/bs'
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg'
import { FiRepeat } from 'react-icons/fi'
import VolumnControl from '../VolumnControl'

export default function ControlPlayer() {
  return (
    <div className='flex h-full items-center justify-between border-t border-gray-800 bg-black px-4 py-2'>
      <div className='flex items-center gap-x-3'>
        <div className='h-12 w-12 shrink-0 rounded-md'>
          <img
            src='https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f'
            alt='img_current_track'
            className='h-full w-full rounded-md object-cover'
          />
        </div>
        <div className='flex max-w-[250px] flex-col text-lg'>
          <h3 className='line-clamp-1 font-bold text-white'>
            Track name Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa excepturi error repellendus eos
            totam velit dolorem quisquam assumenda. Eligendi, esse.
          </h3>
          <span className='line-clamp-1 text-gray-300'>
            Track owners Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, nulla? Qui, delectus
            assumenda quis non dolorum a cum at possimus.
          </span>
        </div>
      </div>
      <div className=' hidden flex-col items-center justify-between gap-2 xl:flex'>
        <div className='flex items-center gap-x-5 text-white'>
          <BsShuffle className='h-5 w-5' />
          <CgPlayTrackPrev className='h-8 w-8' />
          <BsFillPlayCircleFill className='h-7 w-7' />
          <CgPlayTrackNext className='h-8 w-8' />
          <FiRepeat className='h-5 w-5' />
        </div>
        <div className='flex items-center gap-x-2 text-white'>
          <span>0:00</span>
          <input type='range' min={0} max={100} value={50} className='w-[400px]' />
          <span>4:00</span>
        </div>
      </div>
      <div className='hidden px-4 xl:block'>
        <VolumnControl />
      </div>
      <div className='xl:hidden'>
        <BsFillPauseCircleFill className='h-8 w-8 text-white' />
      </div>
    </div>
  )
}
