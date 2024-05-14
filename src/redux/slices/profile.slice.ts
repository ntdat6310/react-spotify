import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserProfile } from 'src/types/user.type'

const initialProfile: UserProfile | null = null

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfile,
  reducers: {}
})
// export const { startUpdatingPost, cancelUpdatingPost } = profileSlice.actions
