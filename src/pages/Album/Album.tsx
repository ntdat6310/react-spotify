import { useParams } from 'react-router-dom'
import { useGetAlbumQuery } from 'src/redux/apis/spotifyApi'

export default function Album() {
  const { id } = useParams()
  const { data: album } = useGetAlbumQuery(id || '')

  console.log('album', album)

  return <div>Album</div>
}
