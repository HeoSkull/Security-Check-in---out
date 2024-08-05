import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Services
import WorkdayService from "@services/workday.service";

//Models
import { Workday } from "@models/Workday.model";

export interface WorkdayState {
  workday: Workday | null;
  loading: boolean;
  error: string;
}

const initialState: WorkdayState = {
  workday: null,
  loading: false,
  error: "",
};

export const getWorkdayAsync = createAsyncThunk("workday/getWorkday", async (id: string) => {
  return await WorkdayService.GetWorkday(id);
});

export const getCurrentWorkdayAsync = createAsyncThunk("workday/getCurrentWorkday", async () => {
  return await WorkdayService.GetCurrentWorkday();
});

export const checkOutAsync = createAsyncThunk("workday/check-out", async (id: string) => {
  return await WorkdayService.CheckOut(id);
});

const WorkdaySlice = createSlice({
  name: "workday",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorkdayAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWorkdayAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.workday = action.payload.data;
    });
    builder.addCase(getWorkdayAsync.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to fetch workday";
    });

    builder.addCase(getCurrentWorkdayAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentWorkdayAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.workday = action.payload.data;
      state.error = "";
    });
    builder.addCase(getCurrentWorkdayAsync.rejected, (state) => {
      state.loading = false;
      state.workday = null;
      state.error = "Failed to fetch current workday";
    });
  },
});

const _WorkdayActions = WorkdaySlice.actions;
export const WorkdayActions = {
  ..._WorkdayActions,
  getWorkdayAsync,
  getCurrentWorkdayAsync,
};
export default WorkdaySlice.reducer;
