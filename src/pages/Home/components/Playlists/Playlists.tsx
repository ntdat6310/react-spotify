import { NavLink } from 'react-router-dom'
import { config } from 'src/assets/constants/config'
import { Playlists as PlaylistType } from 'src/types/playlist.type'
import { HiUser } from 'react-icons/hi2'

interface Props {
  playlists?: PlaylistType
  handleClick?: () => void
}
export default function Playlists({ handleClick, playlists }: Props) {
  return (
    <>
      {playlists?.items.map((playlist) => (
        <NavLink
          key={playlist.id}
          to='#'
          className='flex flex-row items-center justify-start gap-x-4 rounded-lg font-medium hover:bg-gray-800'
          onClick={() => handleClick && handleClick()}
        >
          <img
            src={playlist.images && playlist.images.length > 0 ? `${playlist.images[0].url}` : config.default_image}
            alt='playlist_image'
            className='h-12 w-12 shrink-0 rounded-lg'
          />
          <div className='flex h-full grow flex-col justify-around'>
            <span className='line-clamp-1 capitalize text-white'>{playlist.name}</span>
            <div className='flex items-center'>
              <span className='capitalize'>{playlist.type}</span>
              <HiUser className='ml-3 mr-1 h-4 w-4' />
              <span className='line-clamp-1'>{playlist.owner.display_name}</span>
            </div>
          </div>
        </NavLink>
      ))}
    </>
  )
}
