export interface Albums {
  href: string
  items: RootObjectItem[]
  total: number
}

interface RootObjectItem {
  added_at: Date
  album: Album
}

export interface Album {
  id: string
  album_type: string
  total_tracks: number
  images: Image[]
  artists: Artist[]
  href: string
  label: string
  name: string
  popularity: number
  release_date: Date
  release_date_precision: string
  tracks: Tracks
  type: string
  uri: string
}

export interface Artist {
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface Image {
  url: string
  height: number
  width: number
}

export interface Tracks {
  href: string
  items: TracksItem[]
  limit: number
  total: number
}

export interface TracksItem {
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  href: string
  id: string
  is_local: boolean
  name: string
  preview_url: string
  track_number: number
  type: string
  uri: string
}
