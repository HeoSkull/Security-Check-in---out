import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Models
import { Group } from "@models/Group.model";

// Services
import GroupService from "@services/group.service";

export interface GroupState {
  group: Group | null;
  loading: boolean;
  error: string;
}

const initialState: GroupState = {
  group: null,
  loading: false,
  error: "",
};

const GroupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGroupAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGroupAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.group = action.payload.data;
    });
    builder.addCase(getGroupAsync.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to get group";
    });
  },
});

export const getGroupAsync = createAsyncThunk("group/getGroup", async (id: string) => {
  return await GroupService.getGroup(id);
});

export const _GroupActions = GroupSlice.actions;
export const GroupActions = {
  ..._GroupActions,
  getGroupAsync,
};

export default GroupSlice.reducer;
