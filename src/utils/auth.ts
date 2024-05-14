import { UserProfile } from 'src/types/user.type'

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token')
}
export const setAccessTokenToLS = (token: string) => {
  return localStorage.setItem('access_token', token)
}
export const getRefreshTokenFromLS = () => {
  return localStorage.getItem('refresh_token')
}
export const setRefreshTokenToLS = (token: string) => {
  return localStorage.setItem('refresh_token', token)
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
  return localStorage.setItem('profile', JSON.stringify(profile))
}
