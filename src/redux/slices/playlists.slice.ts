import { createSlice } from '@reduxjs/toolkit'
import { Playlists } from 'src/types/playlist.type'

const initialPlaylists: Playlists | null = null

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: initialPlaylists,
  reducers: {}
})

// export const {  } = playlistsSlice.actions
