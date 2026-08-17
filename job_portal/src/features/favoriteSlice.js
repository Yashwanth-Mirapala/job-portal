import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const index = state.findIndex((job) => job.id === action.payload.id);
      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action) =>
      state.filter((job) => job.id !== action.payload)
  }
});

export const { toggleFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
