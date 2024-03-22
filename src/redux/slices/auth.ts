import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ICurrentUser = {
  "id": number,
  "user_id":number,
  "user": string,
  "password": string,
};

export type AuthState = {
  currentUser: ICurrentUser | null,
};

const initialState: AuthState = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<ICurrentUser>) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    }
  },
});

export const { setCurrentUser, clearCurrentUser } = authSlice.actions;
