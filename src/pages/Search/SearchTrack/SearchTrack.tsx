import PlaylistItem from 'src/pages/Playlist/component/PlaylistItem/PlaylistItem'
import { useGetCurrentUserPlaylistsQuery } from 'src/redux/apis/spotifyApi'
import { Tracks } from 'src/types/album.type'
import { Track } from 'src/types/playlist.type'

interface Props {
  tracks: Tracks
}
export default function SearchTrack({ tracks }: Props) {
  const { data: currentUserPlaylists } = useGetCurrentUserPlaylistsQuery()
  return (
    <div className='mt-10 text-xl text-gray-300'>
      <div className='hide-scrollbar overflow-auto'>
        <div className='min-w-[1000px]'>
          {currentUserPlaylists &&
            tracks.items &&
            tracks.items.map((track, index) => {
              return (
                <PlaylistItem
                  key={track.id}
                  currentUserPlaylists={currentUserPlaylists.items}
                  index={index + 1}
                  isCurrentUserOwnPlaylist={false}
                  track={track as Track}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}
