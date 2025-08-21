import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './Slice/apiSlice'
import cartSlice from './Slice/CartSlice'
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath] : apiSlice.reducer,
    cart:cartSlice,
  },

   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

})