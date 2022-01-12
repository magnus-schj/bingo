import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { allGamesSlice } from "../features/allGames/allGames.Slice";
import { currentUserSlice } from "../features/currentUser/currentUser.slice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice.reducer,
    allGames: allGamesSlice.reducer,
  },
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
