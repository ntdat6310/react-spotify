import { NavLink } from 'react-router-dom'
import { config } from 'src/assets/constants/config'
import { Album } from 'src/types/album.type'
import { HiUser } from 'react-icons/hi2'

interface Props {
  albums?: Album[]
  handleClick?: () => void
}
export default function Albums({ handleClick, albums }: Props) {
  return (
    <>
      {albums &&
        albums?.map((album) => (
          <NavLink
            key={album.id}
            to='#'
            className='flex flex-row items-center justify-start gap-x-4 rounded-lg hover:bg-gray-800'
            onClick={() => handleClick && handleClick()}
          >
            <img
              src={album.images && album.images.length > 0 ? `${album.images[0].url}` : config.default_image}
              alt='album_image'
              className='h-12 w-12 shrink-0 rounded-lg'
            />
            <div className='flex h-full grow flex-col justify-around'>
              <span className='line-clamp-1 capitalize text-white'>{album.name}</span>
              <div className='flex items-center'>
                <span className='capitalize'>{album.type}</span>
                <HiUser className='ml-3 mr-1 h-4 w-4' />
                <span className='line-clamp-1'>
                  {album.artists && album.artists.length > 0 && album.artists[0].name}
                </span>
              </div>
            </div>
          </NavLink>
        ))}
    </>
  )
}
