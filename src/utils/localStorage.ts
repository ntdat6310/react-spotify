import { Track } from 'src/types/playlist.type'
import { UserProfile } from 'src/types/user.type'

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token')
}
export const setAccessTokenToLS = (token: string) => {
  localStorage.setItem('access_token', token)
}
export const getRefreshTokenFromLS = () => {
  return localStorage.getItem('refresh_token')
}
export const setRefreshTokenToLS = (token: string) => {
  localStorage.setItem('refresh_token', token)
}

export const getProfileFromLS = () => {
  const profileStr = localStorage.getItem('profile')

  if (profileStr) {
    const profile: UserProfile | null = JSON.parse(profileStr)
    return profile
  }
  return null
}
export const setProfileToLS = (profile: UserProfile) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const LocalStorageEventTarget = new EventTarget()
export const clearLS = () => {
  localStorage.clear()
  /** Dispatch event when access token is expired
   *  We need global state: isAuthenticated will be false and profile will be null)
   *  So I dispatch and listen this event in App
   */
  const clearLocalStorageEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLocalStorageEvent)
}

export const setTracksQueueToLS = (tracksQueue: Track[]) => {
  localStorage.setItem('tracks_queue', JSON.stringify(tracksQueue))
}

export const getTracksQueueFromLS = (): Track[] => {
  const res = localStorage.getItem('tracks_queue')
  return res ? JSON.parse(res) : []
}

export const setCurrentTrackToLS = (track: Track) => {
  localStorage.setItem('current_track', JSON.stringify(track))
}

export const getCurrentTrackFromLS = (): Track | undefined => {
  const res = localStorage.getItem('current_track')
  return res ? JSON.parse(res) : undefined
}
