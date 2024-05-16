import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Track } from 'src/types/playlist.type'
import { millisecondsToMinutesAndSeconds } from 'src/utils/helper'
interface Props {
  track?: Track
  index?: number
}

export default function PlaylistItem({ track, index }: Props) {
  const artistsName = track?.artists && track?.artists.map((item) => item.name)
  return (
    <div className='grid grid-cols-12 gap-x-1 py-2 hover:bg-black-custom-hover'>
      <div className='col-span-1 text-center'>{index}</div>
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
        <BsThreeDotsVertical className='h-5 w-5 text-white' />
      </div>
    </div>
  )
}
