import { useNavigate } from 'react-router-dom'
import PlaylistCard from 'src/pages/Home/components/PlaylistCard'
import { Albums } from 'src/types/album.type'

interface Props {
  albums: Albums
}
export default function SearchAlbum({ albums }: Props) {
  const navigate = useNavigate()
  const onClick = (albumId: string) => () => {
    navigate({
      pathname: `/album/${albumId}`
    })
  }
  return (
    <div className='mt-5'>
      {albums.items &&
        albums.items.map((album) => (
          <PlaylistCard
            key={album.id}
            imgUrl={album?.images && album?.images.length > 0 ? album.images.at(0)?.url : undefined}
            title={album.name}
            author={album?.artists && album?.artists.map((artist) => artist.name).join(', ')}
            onClick={onClick(album.id)}
          />
        ))}
    </div>
  )
}
