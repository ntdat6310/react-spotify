import { FaPlay } from 'react-icons/fa'
import { config } from 'src/assets/constants/config'

interface Props {
  imgUrl?: string
  title?: string
  author?: string
  id?: string
  onClick?: () => void
}
export default function PlaylistCard({ imgUrl, title, author }: Props) {
  return (
    <div className='group relative w-[250px] cursor-pointer rounded-md p-3 text-white'>
      <div className='relative w-full pt-[100%]'>
        <img
          src={imgUrl ? imgUrl : config.default_image}
          alt='playlist_img'
          className='absolute left-0 top-0 h-full w-full rounded-md object-cover'
        />
      </div>
      <h2 className='my-1 line-clamp-1 text-xl capitalize'>{title}</h2>
      <p className='line-clamp-1 capitalize text-gray-300'>{author}</p>
      <FaPlay className='absolute left-[50%] top-[50%] z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-white group-hover:block' />
      <div className='absolute inset-0 z-10 hidden rounded-md bg-black/40 group-hover:block'></div>
    </div>
  )
}
