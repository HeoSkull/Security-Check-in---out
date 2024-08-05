import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Services
import UserService from "@services/user.service";

export interface AuthState {
  isAuth: boolean;
  loading: boolean;
  error: string;
}

const initialState: AuthState = {
  isAuth: false,
  loading: false,
  error: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkUserSessionAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkUserSessionAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = action.payload.status === 200;
      state.error = action.payload.message;
    });
    builder.addCase(checkUserSessionAsync.rejected, (state) => {
      state.loading = false;
      state.isAuth = false;
      state.error = "Failed to check user session";
    });
  },
});

export const checkUserSessionAsync = createAsyncThunk("auth/checkUserSession", async () => {
  return await UserService.CheckUserSession();
});

export const _AuthActions = AuthSlice.actions;
export const AuthActions = {
  ..._AuthActions,
  checkUserSessionAsync,
};
export default AuthSlice.reducer;
