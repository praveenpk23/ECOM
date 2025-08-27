import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './Slice/apiSlice'
import cartSlice from './Slice/CartSlice'
import themeSlice from './Slice/themeSlice'
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath] : apiSlice.reducer,
    cart:cartSlice,
    theme:themeSlice,
    // user:userSlice,
  },

   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

})