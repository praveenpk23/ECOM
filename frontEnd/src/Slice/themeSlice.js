import { createSlice } from "@reduxjs/toolkit";

const initialState = {value:localStorage.getItem("theme") || "light"};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme: (state, action) => {
      if (action.payload === "dark" || action.payload === "light") {
        state.value = action.payload;
        // document.documentElement.setAttribute('data-theme', action.payload);
        // localStorage.setItem("theme", action.payload);
      }
    },
  },
});

export default themeSlice.reducer;
export const { updateTheme } = themeSlice.actions;
