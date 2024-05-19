import classNames from 'classnames'
import { useContext } from 'react'
import { TiDelete } from 'react-icons/ti'
import { PlayerContext } from 'src/context/PlayerContext'
import TrackQueueItem from './TrackQueueItem'

export default function TrackQueueModal() {
  const { isTracksQueueModalOpen, toggleTracksQueueModal, tracksQueue, removeAllTracksFromQueue } =
    useContext(PlayerContext)

  return (
    <>
      {/* Desktop */}
      <nav
        className={classNames(
          'absolute top-0 z-50 hidden h-full flex-col gap-4 border-b border-gray-700 bg-black px-4 py-6  text-gray-300 transition-all lg:flex lg:w-[35%] xl:w-[30%]',
          {
            'lg:right-0': isTracksQueueModalOpen,
            'lg:-left-full': !isTracksQueueModalOpen
          }
        )}
      >
        <div className='flex items-center justify-between'>
          <button
            className='rounded-md border border-gray-500 px-3 py-2 font-semibold hover:border-purple-700 hover:bg-black-custom-hover hover:text-white'
            onClick={removeAllTracksFromQueue}
          >
            Clear all
          </button>
          <TiDelete
            onClick={toggleTracksQueueModal}
            className='h-10 w-10 cursor-pointer text-gray-300 hover:text-white'
          />
        </div>
        <div className='hide-scrollbar flex flex-col gap-4 overflow-y-auto'>
          {tracksQueue.map((track, index) => (
            <TrackQueueItem key={index} track={track} />
          ))}
        </div>
      </nav>

      {/* Mobile */}
      <nav
        className={classNames(
          'absolute top-0 z-50 flex h-full w-[80%] flex-col gap-4 border-b border-gray-700 bg-black px-4 py-6 text-gray-300 transition-all lg:hidden',
          {
            'right-0': isTracksQueueModalOpen,
            '-left-full': !isTracksQueueModalOpen
          }
        )}
      >
        <div className='flex items-center justify-between'>
          <button
            className='rounded-md border border-gray-500 px-3 py-2 font-semibold hover:border-purple-700 hover:bg-black-custom-hover hover:text-white'
            onClick={removeAllTracksFromQueue}
          >
            Clear all
          </button>
          <TiDelete
            onClick={toggleTracksQueueModal}
            className='h-10 w-10 cursor-pointer text-gray-300 hover:text-white'
          />
        </div>
        <div className='hide-scrollbar flex flex-col gap-4 overflow-y-auto py-4'>
          {tracksQueue.map((track, index) => (
            <TrackQueueItem key={index} track={track} />
          ))}
        </div>
      </nav>
    </>
  )
}
