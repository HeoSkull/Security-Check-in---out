import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Services
import UserService from "@services/user.service";

// Models
import { FullUser } from "@models/User.model";

export interface UserState {
  user: FullUser | null;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
    });
    builder.addCase(getUserAsync.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to fetch user";
    });

    builder.addCase(loginUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
    });
    builder.addCase(loginUserAsync.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to login";
    });

    builder.addCase(logoutUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUserAsync.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
    });
    builder.addCase(logoutUserAsync.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to logout";
    });
  },
});

export const getUserAsync = createAsyncThunk("user/getUser", async () => {
  return await UserService.getUser();
});

export const loginUserAsync = createAsyncThunk("user/loginUser", async (form: any) => {
  return await UserService.LoginUser(form);
});

export const logoutUserAsync = createAsyncThunk("user/logoutUser", async () => {
  return await UserService.LogoutUser();
});

const _UserActions = UserSlice.actions;
export const UserActions = {
  ..._UserActions,
  getUserAsync,
  loginUserAsync,
  logoutUserAsync,
};
export default UserSlice.reducer;
