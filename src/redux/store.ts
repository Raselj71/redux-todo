import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import authSlice from './auth/authSlice'
import themeSlice from '../redux/theme/themeSlice'
import { apiSlice } from './apiSlice'


export const store = configureStore({
  reducer: {

    [apiSlice.reducerPath]:apiSlice.reducer,
    auth: authSlice,
    theme:themeSlice,
   
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
  devTools:true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
