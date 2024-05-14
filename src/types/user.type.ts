import { Image } from './album.type'

export interface UserProfile {
  id: string
  display_name: string
  email: string
  country: string
  followers: Followers
  images: Image[]
  product: string
  type: string
  uri: string
}

interface Followers {
  total: number
}
