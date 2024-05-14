import { Image } from './album.type'

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
  total: number
}
