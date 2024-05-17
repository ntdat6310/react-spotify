import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { Album, Albums, ArtistWithImage, CurrentUserAlbums, Tracks } from 'src/types/album.type'
import { AuthSpotify } from 'src/types/auth.type'
import { Playlist, Playlists, Track } from 'src/types/playlist.type'
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
    }),
    saveAlbumForCurrentUser: builder.mutation<void, string>({
      query: (id) => ({
        url: '/me/albums',
        method: 'PUT',
        data: {
          ids: [id]
        }
      })
    }),
    removeAlbumForCurrentUser: builder.mutation<void, string>({
      query: (id) => ({
        url: '/me/albums',
        method: 'DELETE',
        data: {
          ids: [id]
        }
      })
    }),
    isAlbumSaved: builder.query<boolean[], string>({
      query: (id) => ({
        url: `/me/albums/contains`,
        method: 'GET',
        params: {
          ids: id
        }
      })
    }),
    addTrackToPlaylist: builder.mutation<void, { playlistId: string; uris: string[]; position?: number }>({
      query: ({ playlistId, position = 0, uris }) => ({
        url: `/playlists/${playlistId}/tracks`,
        method: 'POST',
        data: {
          uris: uris,
          position: position
        }
      })
    }),
    removeTrackFromPlaylist: builder.mutation<void, { playlistId: string; uri: string }>({
      query: (payload) => ({
        url: `/playlists/${payload.playlistId}/tracks`,
        method: 'DELETE',
        data: {
          tracks: [{ uri: payload.uri }]
        }
      })
    }),
    getPlaylist: builder.query<Playlist, string>({
      query: (playlistId) => ({
        url: `/playlists/${playlistId}`,
        method: 'GET'
      })
    }),
    getRecommendationTracks: builder.query<{ tracks: Track[] }, { seed_artists: string; seed_tracks: string }>({
      query: (payload) => ({
        url: `/recommendations`,
        params: {
          seed_artists: payload.seed_artists,
          seed_tracks: payload.seed_tracks,
          limit: 10
        }
      })
    }),
    getUserProfile: builder.query<UserProfile, string>({
      query: (user_id) => ({
        url: `/users/${user_id}`,
        method: 'GET'
      })
    }),
    getUserPlaylists: builder.query<Playlists, string>({
      query: (user_id) => ({
        url: `/users/${user_id}/playlists`,
        method: 'GET'
      })
    }),
    searchTrack: builder.query<{ tracks: Tracks }, { search_key: string }>({
      query: ({ search_key }) => ({
        url: `/search`,
        method: 'GET',
        params: {
          q: search_key,
          type: 'track',
          include_external: 'audio'
        }
      })
    }),
    searchPlaylist: builder.query<{ playlists: Playlists }, { search_key: string }>({
      query: ({ search_key }) => ({
        url: `/search`,
        method: 'GET',
        params: {
          q: search_key,
          type: 'playlist',
          include_external: 'audio'
        }
      })
    }),
    searchAlbum: builder.query<{ albums: Albums }, { search_key: string }>({
      query: ({ search_key }) => ({
        url: `/search`,
        method: 'GET',
        params: {
          q: search_key,
          type: 'album',
          include_external: 'audio'
        }
      })
    }),
    searchArtist: builder.query<{ artists: { items: ArtistWithImage[] } }, { search_key: string }>({
      query: ({ search_key }) => ({
        url: `/search`,
        method: 'GET',
        params: {
          q: search_key,
          type: 'artist',
          include_external: 'audio'
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
  useGetArtistAlbumsQuery,
  useSaveAlbumForCurrentUserMutation,
  useIsAlbumSavedQuery,
  useRemoveAlbumForCurrentUserMutation,
  useAddTrackToPlaylistMutation,
  useGetPlaylistQuery,
  useGetRecommendationTracksQuery,
  useRemoveTrackFromPlaylistMutation,
  useGetUserProfileQuery,
  useGetUserPlaylistsQuery,
  useSearchTrackQuery,
  useSearchAlbumQuery,
  useSearchArtistQuery,
  useSearchPlaylistQuery
} = spotifyApi
