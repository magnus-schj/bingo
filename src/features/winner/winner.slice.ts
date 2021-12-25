import { createSlice } from "@reduxjs/toolkit";

interface InitialWinnerState {
  uid: null | string;
  game: null | string;
}

const initialState: InitialWinnerState = {
  uid: null,
  game: null,
};

export const winnerSlice = createSlice({
  name: "winner",
  initialState,
  reducers: {
    setWinner(state, { payload }) {
      console.log("payload:", payload);
      state.uid = payload.winnerID;
      state.game = payload.name;
    },
    resetWinner(state) {
      state.game = null;
      state.uid = null;
    },
  },
});

export const { setWinner, resetWinner } = winnerSlice.actions;
