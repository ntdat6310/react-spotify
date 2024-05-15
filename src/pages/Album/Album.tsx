import { useParams } from 'react-router-dom'
import { useGetAlbumQuery } from 'src/redux/apis/spotifyApi'
import { FaRegClock } from 'react-icons/fa'
import AlbumItem from './components/AlbumItem'
import { config } from 'src/assets/constants/config'
import { useMemo } from 'react'
import { formatTotalTime } from 'src/utils/helper'

export default function Album() {
  const { id } = useParams()
  const { data: album } = useGetAlbumQuery(id || '')

  console.log('album', album)

  const artistsName = album?.artists && album?.artists.map((item) => item.name)
  const totalTime = useMemo(() => {
    if (album) {
      return album.tracks.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.duration_ms
      }, 0)
    }
    return 0
  }, [album])
  return (
    <div>
      <div className='flex flex-wrap items-end justify-center gap-4'>
        <div className='h-[250px] w-[250px] shrink-0'>
          <img
            src={(album && album?.images.at(0)?.url) || config.default_image}
            alt='album_img'
            className='h-full w-full rounded-md object-cover'
          />
        </div>
        <div className='flex grow flex-col gap-4 text-white'>
          <p className='text-gray-300'>Album</p>
          <h1 className='text-2xl font-medium tracking-wide sm:text-3xl'>{album?.name}</h1>
          <div className='flex items-center gap-3'>
            <div className='h-10 w-10'>
              <img
                src={(album && album?.images.at(0)?.url) || config.default_image}
                alt='album_img'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <p className=''>{artistsName?.join(', ')}</p>
            <p className='text-gray-300'>{album?.total_tracks} songs</p>
            <p className='hidden text-gray-300 sm:block'>{formatTotalTime(totalTime)}</p>
          </div>
        </div>
      </div>
      <div className='mt-10 text-xl text-gray-300'>
        <div className='hide-scrollbar overflow-auto'>
          <div className='min-w-[800px]'>
            <div className='grid grid-cols-12 gap-x-1'>
              <div className='col-span-1 text-center'>#</div>
              <div className='col-span-6'>Title</div>
              <div className='col-span-4'>Artist</div>
              <div className='col-span-1 flex items-center justify-center'>
                <FaRegClock className='h-6 w-6' />
              </div>
            </div>
            <div className='mb-4 mt-2 h-[1px] w-full bg-gray-600'></div>
            <div className='flex flex-col gap-4'>
              {album && album.tracks && album.tracks.items.map((track) => <AlbumItem key={track.id} track={track} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
