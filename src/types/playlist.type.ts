import { Album, Artist, Image } from './album.type'

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
  images: Image[]
  name: string
  owner: Owner
  primary_color: string
  public: boolean
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
    track: Track
  }[]
  limit: number
  offset: number
  total: number
}

export interface Track {
  album: Album
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  href: string
  id: string
  is_local: boolean
  name: string
  preview_url: string | null
  track_number: number
  type: string
  uri: string
}
