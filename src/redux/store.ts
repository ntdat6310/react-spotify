import { configureStore } from '@reduxjs/toolkit'
import { spotifyApi } from './apis/spotifyApi'
import { profileSlice } from './slices/profile.slice'

export const store = configureStore({
  reducer: {
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    [profileSlice.reducerPath]: profileSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spotifyApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
