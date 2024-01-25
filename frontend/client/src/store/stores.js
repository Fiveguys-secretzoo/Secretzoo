import { configureStore } from '@reduxjs/toolkit'
import playSlice from './playSlice'

export const store = configureStore({

  reducer: {
    plays : playSlice,
  },
})