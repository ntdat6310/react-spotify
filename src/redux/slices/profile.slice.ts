import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserProfile } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

const initialState: {
  profile: UserProfile | null
  isAuthenticated: boolean
} = {
  profile: getProfileFromLS(),
  isAuthenticated: Boolean(getAccessTokenFromLS())
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    setProfile: (state, action: PayloadAction<UserProfile | null>) => {
      state.profile = action.payload
    }
  }
})
export const { setIsAuthenticated, setProfile } = profileSlice.actions
