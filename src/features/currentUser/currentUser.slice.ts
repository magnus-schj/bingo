import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { DIMENSION } from "../../components/SignedIn/utils";
import { Square } from "../../interfaces";
interface CurrentUserState {
  userInfo: null | User;
  board: null | Square[][];
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
    setBoard: {
      reducer: (state, action: PayloadAction<Square[][]>) => {
        state.board = action.payload;
      },
      // array to matrix
      prepare: (squares) => {
        // fills board with rows
        const board: Square[][] = [];
        while (board.length < DIMENSION) {
          // fills row with squares
          const row: Square[] = [];
          while (row.length < DIMENSION) {
            const square = squares[board.length * DIMENSION + row.length];
            row.push(square);
          }
          board.push(row);
        }
        return { payload: board };
      },
    },

    resetBoard(state) {
      state.board = null;
    },
  },
});

export const { setCurrentUser, setBoard, resetBoard } =
  currentUserSlice.actions;
