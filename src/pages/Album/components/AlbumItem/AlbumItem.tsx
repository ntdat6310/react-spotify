import { TracksItem } from 'src/types/album.type'
import { millisecondsToMinutesAndSeconds } from 'src/utils/helper'

interface Props {
  track?: TracksItem
}

export default function AlbumItem({ track }: Props) {
  const artistsName = track?.artists && track?.artists.map((item) => item.name)
  return (
    <div className='grid grid-cols-12 gap-x-1'>
      <div className='col-span-1 text-center'>{track?.track_number}</div>
      <div className='col-span-6 line-clamp-1'>{track?.name}</div>
      <div className='col-span-4 line-clamp-1'>{artistsName?.join(', ')}</div>
      <div className='col-span-1 text-center'>{millisecondsToMinutesAndSeconds(track?.duration_ms || 0)}</div>
    </div>
  )
}
