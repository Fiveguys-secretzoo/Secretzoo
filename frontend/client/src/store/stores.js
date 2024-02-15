import { configureStore, combineReducers } from '@reduxjs/toolkit'
import playSlice from './playSlice'
import userSlice from './userSlice'
import { persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

const reducers = combineReducers({
  plays: playSlice,
  user: userSlice
})

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})