export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token')
}
export const setAccessTokenFromLS = (token: string) => {
  return localStorage.setItem('access_token', token)
}
export const getRefreshTokenFromLS = () => {
  return localStorage.getItem('refresh_token')
}
export const setRefreshTokenFromLS = (token: string) => {
  return localStorage.setItem('refresh_token', token)
}
