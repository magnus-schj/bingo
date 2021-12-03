import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
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
      prepare: (squares) => {
        const dimension = 3;
        // fills board with rows
        const board: Square[][] = [];
        while (board.length < dimension) {
          // fills row with squares
          const row: Square[] = [];
          while (row.length < dimension) {
            const square = squares[board.length * dimension + row.length];
            row.push(square);
          }
          board.push(row);
        }
        return { payload: board };
      },
    },
  },
});

export const { setCurrentUser, setBoard } = currentUserSlice.actions;
