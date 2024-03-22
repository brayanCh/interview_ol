import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type IUser = {
  "id": number,
  "name": string,
  "last_name": string,
  "url_photo": string,
  "rol": number,
  "list": string,
  "area": string,
};

export type UsersState = {
  users: IUser[],
  loading: boolean,
  error: string | null,
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setUsersLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setUsersSuccess: (state, action: PayloadAction<IUser[]>) => {
      state.loading = false;
      state.users = action.payload;
    },
    setUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
});

export const { setUsersLoading, setUsersSuccess, setUsersFailure, setError } = usersSlice.actions;
