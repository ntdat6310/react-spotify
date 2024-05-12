import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const shazamApiKey = import.meta.env.VITE_SHAZAM_API_KEY

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', shazamApiKey)
      return headers
    }
  }),
  endpoints: (builder) => ({
    getWorldCharts: builder.query({ query: () => 'v1/charts/world' })
  })
})

export const { useGetWorldChartsQuery } = shazamApi
