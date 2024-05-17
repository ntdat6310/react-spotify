import { useNavigate } from 'react-router-dom'
import ArtistCard from 'src/components/ArtistCard'
import { ArtistWithImage } from 'src/types/album.type'

interface Props {
  artists: ArtistWithImage[]
}
export default function SearchArtist({ artists }: Props) {
  const navigate = useNavigate()
  const handleArtistClicked = (id: string) => () => {
    navigate({
      pathname: `/artist/${id}`
    })
  }
  return (
    <div className='mt-5 flex flex-wrap items-center gap-y-2'>
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} onClick={handleArtistClicked(artist.id)} />
      ))}
    </div>
  )
}
