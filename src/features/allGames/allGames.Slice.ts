import { createSlice } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

interface InitialState {
  name: string;
}

const initialState: InitialState[] = [];

export const allGamesSlice = createSlice({
  name: "All games",
  initialState,
  reducers: {
    addGames(state, { payload }) {
      payload.forEach((i: WritableDraft<InitialState>) => {
        state.push(i);
      });
    },
    clearGames(state) {
      state.length = 0;
    },
  },
});
