import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "../features/favoriteSlice";

const saved = localStorage.getItem("favoriteJobs");

export const store = configureStore({
  reducer: {
    favorites: favoriteReducer
  },
  preloadedState: {
    favorites: saved ? JSON.parse(saved) : []
  }
});

store.subscribe(() => {
  localStorage.setItem(
    "favoriteJobs",
    JSON.stringify(store.getState().favorites)
  );
});
