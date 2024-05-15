import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { Album, Albums, CurrentUserAlbums } from 'src/types/album.type'
import { AuthSpotify } from 'src/types/auth.type'
import { Playlists } from 'src/types/playlist.type'
import { UserProfile } from 'src/types/user.type'
import { clearLS, getAccessTokenFromLS } from 'src/utils/auth'
import { isUnauthorizedError } from 'src/utils/helper'
import { clientId, redirect_uri } from 'src/utils/spotify'

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const newUrl = url.includes('https://') ? url : baseUrl + url
      const access_token = getAccessTokenFromLS()
      if (access_token) {
        headers = { ...headers, Authorization: `Bearer ${access_token}` }
      }
      const result = await axios({
        url: newUrl,
        method,
        data,
        params,
        headers
      })
      return { data: result.data }
    } catch (axiosError) {
      if (isUnauthorizedError(axiosError)) {
        // Logout
        // We can clear localStorage here, but how to set isAuthenticated in global state?
        clearLS()
      }
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        }
      }
    }
  }

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://api.spotify.com/v1' }),
  endpoints: (builder) => ({
    getTokens: builder.query<AuthSpotify, string>({
      query: (code) => {
        const verifier = localStorage.getItem('verifier')
        const params = new URLSearchParams()
        params.append('client_id', clientId)
        params.append('grant_type', 'authorization_code')
        params.append('code', code)
        params.append('redirect_uri', redirect_uri)
        params.append('code_verifier', verifier!)

        return {
          url: 'https://accounts.spotify.com/api/token',
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: params
        }
      }
    }),
    getCurrentUserPlaylists: builder.query<Playlists, void>({
      query: () => {
        return {
          url: '/me/playlists',
          method: 'GET'
        }
      }
    }),
    getCurrentUserAlbums: builder.query<CurrentUserAlbums, void>({
      query: () => {
        return {
          url: '/me/albums',
          method: 'GET'
        }
      }
    }),
    getCurrentUserProfile: builder.query<UserProfile, void>({
      query: () => {
        return {
          url: '/me',
          method: 'GET'
        }
      }
    }),
    getFeaturedPlaylists: builder.query<{ message: string; playlists: Playlists }, void>({
      query: () => {
        return {
          url: '/browse/featured-playlists',
          method: 'GET',
          params: {
            limit: 20,
            offset: 0
          }
        }
      }
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getNewReleasedAlbums: builder.query<{ albums: Albums }, void>({
      query: () => {
        return {
          url: '/browse/new-releases',
          method: 'GET',
          params: {
            limit: 20,
            offset: 0
          }
        }
      }
    }),
    getAlbum: builder.query<Album, string>({
      query: (id) => ({
        url: `/albums/${id}`,
        method: 'GET'
      })
    }),
    getArtistAlbums: builder.query<Albums, string>({
      query: (id) => ({
        url: `/artists/${id}/albums`,
        method: 'GET',
        params: {
          limit: 10,
          offset: 0
        }
      })
    })
  })
})

export const {
  useGetTokensQuery,
  useGetCurrentUserAlbumsQuery,
  useGetCurrentUserPlaylistsQuery,
  useGetCurrentUserProfileQuery,
  useGetFeaturedPlaylistsQuery,
  useGetNewReleasedAlbumsQuery,
  useGetAlbumQuery,
  useGetArtistAlbumsQuery
} = spotifyApi
