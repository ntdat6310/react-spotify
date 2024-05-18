import classNames from 'classnames'
import { useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { createSearchParams, useNavigate } from 'react-router-dom'
import useQueryParams from 'src/hooks/useQueryParams'
import {
  useSearchAlbumQuery,
  useSearchArtistQuery,
  useSearchPlaylistQuery,
  useSearchTrackQuery
} from 'src/redux/apis/spotifyApi'
import SearchTrack from './SearchTrack/SearchTrack'
import SearchPlaylist from './SearchPlaylist'
import SearchArtist from './SearchArtist'
import SearchAlbum from './SearchAlbum'

enum SearchType {
  track = 'Track',
  artist = 'Artist',
  playlist = 'Playlist',
  album = 'Album'
}
export default function Search() {
  const navigate = useNavigate()
  const queryParams = useQueryParams()
  const [searchKeyValue, setSearchKeyValue] = useState(() => {
    if (queryParams.searchKey) {
      return queryParams.searchKey
    }
    return ''
  })
  const isSearchReady = Boolean(queryParams.searchKey && queryParams.searchType)

  const handleSearchTypeSelected = (searchType: SearchType) => () => {
    navigate({
      pathname: '/search',
      search: createSearchParams({
        ...queryParams,
        searchType: searchType
      }).toString()
    })
  }
  const { data: tracks } = useSearchTrackQuery(
    { search_key: queryParams.searchKey },
    {
      skip:
        Boolean(!queryParams.searchKey) ||
        (Boolean(queryParams.searchKey) && queryParams.searchType != SearchType.track)
    }
  )

  const { data: playlists } = useSearchPlaylistQuery(
    { search_key: queryParams.searchKey },
    {
      skip:
        Boolean(!queryParams.searchKey) ||
        (Boolean(queryParams.searchKey) && queryParams.searchType != SearchType.playlist)
    }
  )

  const { data: albums } = useSearchAlbumQuery(
    { search_key: queryParams.searchKey },
    {
      skip:
        Boolean(!queryParams.searchKey) ||
        (Boolean(queryParams.searchKey) && queryParams.searchType != SearchType.album)
    }
  )

  const { data: artists } = useSearchArtistQuery(
    { search_key: queryParams.searchKey },
    {
      skip:
        Boolean(!queryParams.searchKey) ||
        (Boolean(queryParams.searchKey) && queryParams.searchType != SearchType.artist)
    }
  )

  return (
    <div className='mx-2 text-white'>
      <form
        className='mx-auto md:w-[70%] lg:mx-0 xl:w-[60%]'
        onSubmit={(e) => {
          e.preventDefault()
          navigate({
            pathname: '/search',
            search: createSearchParams({
              ...queryParams,
              searchKey: searchKeyValue
            }).toString()
          })
        }}
      >
        <div className='flex items-center rounded-md border border-gray-500'>
          <input
            type='text'
            className='grow bg-transparent px-3 py-2 text-lg outline-none'
            value={searchKeyValue}
            onChange={(e) => {
              setSearchKeyValue(e.target.value)
            }}
          />
          <button type='submit' className='pl-2 pr-4'>
            <IoSearchOutline className='h-6 w-6' />
          </button>
        </div>
      </form>
      <div className='mt-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start'>
        <button
          className={classNames('rounded-md border border-gray-500 px-4 py-2 hover:bg-pink-600', {
            'bg-pink-600': queryParams.searchType === SearchType.track
          })}
          onClick={handleSearchTypeSelected(SearchType.track)}
        >
          Track
        </button>
        <button
          className={classNames('rounded-md border border-gray-500 px-4 py-2 hover:bg-pink-600', {
            'bg-pink-600': queryParams.searchType === SearchType.artist
          })}
          onClick={handleSearchTypeSelected(SearchType.artist)}
        >
          Artist
        </button>
        <button
          className={classNames('rounded-md border border-gray-500 px-4 py-2 hover:bg-pink-600', {
            'bg-pink-600': queryParams.searchType === SearchType.playlist
          })}
          onClick={handleSearchTypeSelected(SearchType.playlist)}
        >
          Playlist
        </button>
        <button
          className={classNames('rounded-md border border-gray-500 px-4 py-2 hover:bg-pink-600', {
            'bg-pink-600': queryParams.searchType === SearchType.album
          })}
          onClick={handleSearchTypeSelected(SearchType.album)}
        >
          Album
        </button>
      </div>

      {!isSearchReady && (
        <div className='mt-10 text-center text-3xl tracking-wider text-white [word-spacing:4px]'>
          Please search for something . . .
        </div>
      )}

      {/* Tracks */}
      {isSearchReady && queryParams.searchType == SearchType.track && tracks && <SearchTrack tracks={tracks.tracks} />}

      {/* Playlists */}
      {isSearchReady && queryParams.searchType == SearchType.playlist && playlists?.playlists && (
        <SearchPlaylist playlists={playlists.playlists} />
      )}

      {/* Albums */}
      {isSearchReady && queryParams.searchType == SearchType.album && albums?.albums && (
        <SearchAlbum albums={albums.albums} />
      )}

      {/* Artists */}
      {isSearchReady && queryParams.searchType == SearchType.artist && artists && (
        <SearchArtist artists={artists.artists.items} />
      )}
    </div>
  )
}
