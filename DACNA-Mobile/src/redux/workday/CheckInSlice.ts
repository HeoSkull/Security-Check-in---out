import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Services
import WorkdayService from "@services/workday.service";

export interface WorkdayCheckInState {
  isCheckingIn: boolean;
  isCheckingSuccess: boolean;
  isCheckingError: boolean;
  error: string;
}

const initialState: WorkdayCheckInState = {
  isCheckingIn: false,
  isCheckingSuccess: false,
  isCheckingError: false,
  error: "",
};

export const checkInAsync = createAsyncThunk("workday/check-in", async (group_id: string) => {
  return await WorkdayService.CheckIn(group_id);
});

const CheckInSlice = createSlice({
  name: "workday",
  initialState,
  reducers: {
    refresh: (state) => {
      state.isCheckingIn = false;
      state.isCheckingSuccess = false;
      state.isCheckingError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkInAsync.pending, (state) => {
      state.isCheckingIn = true;
      state.isCheckingSuccess = false;
      state.isCheckingError = false;
    });
    builder.addCase(checkInAsync.fulfilled, (state) => {
      state.isCheckingIn = false;
      state.isCheckingSuccess = true;
      state.isCheckingError = false;
    });
    builder.addCase(checkInAsync.rejected, (state, action) => {
      state.isCheckingIn = false;
      state.isCheckingError = true;
      state.isCheckingSuccess = false;
      state.error = action.error.message || "";
    });
  },
});

const _CheckInActions = CheckInSlice.actions;
export const CheckInActions = {
  ..._CheckInActions,
  checkInAsync,
};
export default CheckInSlice.reducer;
