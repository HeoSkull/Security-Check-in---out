import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Services
import WorkdayService from "@services/workday.service";

export interface WorkdayCheckOutState {
  isCheckingOut: boolean;
  isCheckingSuccess: boolean;
  isCheckingError: boolean;
  error: string;
}

const initialState: WorkdayCheckOutState = {
  isCheckingOut: false,
  isCheckingSuccess: false,
  isCheckingError: false,
  error: "",
};

export const checkOutAsync = createAsyncThunk("workday/check-out", async (id: string) => {
  return await WorkdayService.CheckOut(id);
});

const CheckOutSlice = createSlice({
  name: "workday",
  initialState,
  reducers: {
    refresh: (state) => {
      state.isCheckingOut = false;
      state.isCheckingSuccess = false;
      state.isCheckingError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkOutAsync.pending, (state) => {
      state.isCheckingOut = true;
      state.isCheckingSuccess = false;
      state.isCheckingError = false;
    });
    builder.addCase(checkOutAsync.fulfilled, (state) => {
      state.isCheckingOut = false;
      state.isCheckingSuccess = true;
      state.isCheckingError = false;
    });
    builder.addCase(checkOutAsync.rejected, (state, action) => {
      state.isCheckingOut = false;
      state.isCheckingError = true;
      state.isCheckingSuccess = false;
      state.error = action.error.message || "";
    });
  },
});

const _CheckOutActions = CheckOutSlice.actions;
export const CheckOutActions = {
  ..._CheckOutActions,
  checkOutAsync,
};
export default CheckOutSlice.reducer;
