import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
interface CurrentUserState {
  userInfo: null | User;
  board: null | object;
}

const initialState: CurrentUserState = {
  userInfo: null,
  board: null,
};
export const currentUserSlice = createSlice({
  name: "current user",
  initialState,
  reducers: {
    setCurrentUser(state, { payload }) {
      state.userInfo = payload;
    },
    setBoard(state, { payload }) {
      state.board = payload;
    },
  },
});

export const { setCurrentUser, setBoard } = currentUserSlice.actions;
