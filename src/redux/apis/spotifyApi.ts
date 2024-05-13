import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthSpotify } from 'src/types/auth.type'
import { clientId, redirect_uri } from 'src/utils/spotify'

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers) => {
      return headers
    }
  }),
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
          body: params
        }
      }
    })
  })
})

export const { useGetTokensQuery } = spotifyApi
