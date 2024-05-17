export interface CurrentUserAlbums {
  href: string
  items: {
    added_at: string
    album: Album
  }[]
  total: number
}

export interface Albums {
  href: string
  items: Album[]
  total: number
  limit: number
  offset: number
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
  release_date: string
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

export interface ArtistWithImage extends Artist {
  images: Image[]
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
  offset: number
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
