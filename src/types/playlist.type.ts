import { Album, Image, TracksItem } from './album.type'

export interface Playlists {
  href: string
  items: Playlist[]
  limit: number
  offset: number
  total: number
}

export interface Playlist {
  collaborative: boolean
  description: string
  href: string
  id: string
  images: Image[] | null
  name: string
  owner: Owner
  primary_color: string
  public: boolean | null
  snapshot_id: string
  tracks: Tracks
  type: string
  uri: string
}

interface Owner {
  display_name: string
  href: string
  id: string
  type: string
  uri: string
}

interface Tracks {
  href: string
  items: {
    added_at: string
    track: Track | null
  }[]
  limit: number
  offset: number
  total: number
}

export interface Track extends TracksItem {
  album: Album
}
