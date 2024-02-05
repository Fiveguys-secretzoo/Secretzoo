import { configureStore } from '@reduxjs/toolkit'
import playSlice from './playSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
    plays: playSlice,
    user: userSlice
  },
})