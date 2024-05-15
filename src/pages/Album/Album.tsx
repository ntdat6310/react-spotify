import { useMemo } from 'react'
import { FaRegClock } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { config } from 'src/assets/constants/config'
import {
  useGetAlbumQuery,
  useGetArtistAlbumsQuery,
  useIsAlbumSavedQuery,
  useRemoveAlbumForCurrentUserMutation,
  useSaveAlbumForCurrentUserMutation
} from 'src/redux/apis/spotifyApi'
import { formatTotalTime } from 'src/utils/helper'
import { FiPlusCircle } from 'react-icons/fi'
import { IoIosCheckmarkCircle } from 'react-icons/io'

import PlaylistCard from '../Home/components/PlaylistCard'
import AlbumItem from './components/AlbumItem'
import Spinner from 'src/components/Spinner'
import classNames from 'classnames'
import { toast } from 'react-toastify'

export default function Album() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: album, isFetching: isAlbumFetching } = useGetAlbumQuery(id || '')
  const { data: artistAlbums, isFetching: isArtistAlbumsFetching } = useGetArtistAlbumsQuery(
    album?.artists.at(0)?.id as string,
    {
      skip: !(Boolean(album) && Boolean(album?.artists.at(0)?.id))
    }
  )
  const { data: isAlbumSaved, refetch } = useIsAlbumSavedQuery(album?.id as string, {
    skip: !album
  })
  const [saveAlbum] = useSaveAlbumForCurrentUserMutation()
  const [removeAlbum] = useRemoveAlbumForCurrentUserMutation()

  const artistsName = useMemo(() => {
    if (album?.artists) {
      return album.artists.map((item) => item.name)
    }
    return []
  }, [album])

  const totalTime = useMemo(() => {
    if (album) {
      return album.tracks.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.duration_ms
      }, 0)
    }
    return 0
  }, [album])

  const handleAlbumClicked = (id: string) => () => {
    navigate(`/album/${id}`)
  }

  const isFetching = isAlbumFetching || isArtistAlbumsFetching

  return isFetching ? (
    <Spinner />
  ) : (
    <>
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
          <h1 className='line-clamp-1 text-2xl font-bold tracking-wide sm:text-3xl xl:text-5xl'>{album?.name}</h1>
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
      <div className='ml-5 mt-10'>
        {isAlbumSaved && isAlbumSaved?.length > 0 && isAlbumSaved[0] ? (
          <IoIosCheckmarkCircle
            className={classNames('h-10 w-10 cursor-pointer text-green-600 hover:text-green-400', {
              hidden: !album
            })}
            onClick={() => {
              removeAlbum(album?.id as string)
                .unwrap()
                .then(() => {
                  refetch()
                  toast.success('Album is removed!', {
                    autoClose: 1500,
                    position: 'top-center'
                  })
                })
            }}
          />
        ) : (
          <FiPlusCircle
            className={classNames('h-10 w-10 cursor-pointer text-gray-400 hover:text-white', {
              hidden: !album
            })}
            onClick={() => {
              saveAlbum(album?.id as string)
                .unwrap()
                .then(() => {
                  refetch()
                  toast.success('Album is added!', {
                    autoClose: 1500,
                    position: 'top-center'
                  })
                })
            }}
          />
        )}
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
      <div className='mt-10'>
        <h2 className='mb-2 ml-4 text-3xl font-bold tracking-wide text-white'>More by {album?.artists.at(0)?.name}</h2>
        <div className='flex flex-wrap items-center'>
          {artistAlbums?.items.map((item) => (
            <PlaylistCard
              key={item.id}
              imgUrl={item.images.length > 0 ? item.images[0].url : undefined}
              title={item.name}
              author={item.artists.length > 0 ? item.artists[0].name : undefined}
              onClick={handleAlbumClicked(item.id)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
