import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { Square } from "../../interfaces";
interface CurrentUserState {
  userInfo: null | User;
  board: null | Square[];
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
