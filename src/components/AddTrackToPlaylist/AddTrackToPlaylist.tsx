import { IoIosAddCircleOutline } from 'react-icons/io'
import { toast } from 'react-toastify'
import { useAddTrackToPlaylistMutation } from 'src/redux/apis/spotifyApi'
import { TracksItem } from 'src/types/album.type'
import { Playlist } from 'src/types/playlist.type'

interface Props {
  userPlaylists: Playlist[]
  track: TracksItem
}
export default function AddTrackToPlaylist({ userPlaylists, track }: Props) {
  const [addTrackToPlaylist] = useAddTrackToPlaylistMutation()

  return (
    <div
      className='z-50 flex min-w-[200px] flex-col items-start rounded-md
border border-gray-700 bg-[#252136] px-4 py-2 text-[20px] text-lg text-white shadow-md'
    >
      <div className='flex items-center gap-3'>
        <IoIosAddCircleOutline className='h-7 w-7' />
        <span className='font-bold'>Add to playlist</span>
      </div>
      <div className='my-2 h-[1px] w-full bg-gray-500'></div>
      <div className='flex flex-col items-stretch'>
        {userPlaylists.slice(0, 10).map((playlist) => (
          <button
            key={playlist.id}
            className='max-w-[400px] px-3 py-1 text-start hover:bg-black-custom-hover'
            onClick={() => {
              addTrackToPlaylist({
                playlistId: playlist.id,
                uris: [track?.uri as string],
                position: 0
              })
                .unwrap()
                .then(() => {
                  toast.success(`Added to ${playlist.name}`, {
                    position: 'top-center',
                    autoClose: 1500
                  })
                })
            }}
          >
            <p className='line-clamp-1'>{playlist.name}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
