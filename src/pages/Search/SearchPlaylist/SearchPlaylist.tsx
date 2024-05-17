import { useNavigate } from 'react-router-dom'
import PlaylistCard from 'src/pages/Home/components/PlaylistCard'
import { Playlists } from 'src/types/playlist.type'

interface Props {
  playlists: Playlists
}
export default function SearchPlaylist({ playlists }: Props) {
  const navigate = useNavigate()
  const handlePlaylistClicked = (playlistId: string) => () => {
    navigate({
      pathname: `/playlist/${playlistId}`
    })
  }
  return (
    <div className='mt-5'>
      {playlists.items &&
        playlists.items.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            imgUrl={playlist?.images && playlist?.images.length > 0 ? playlist.images.at(0)?.url : undefined}
            title={playlist.name}
            author={playlist?.owner?.display_name}
            onClick={handlePlaylistClicked(playlist.id)}
          />
        ))}
    </div>
  )
}
