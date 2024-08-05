import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Models
import { Group } from "@models/Group.model";

// Services
import GroupService from "@services/group.service";

export interface GroupState {
  groups: Group[];
  total: number;
  loading: boolean;
  error: string;
}

const initialState: GroupState = {
  groups: [],
  total: 0,
  loading: false,
  error: "",
};

const getGroupListAsync = createAsyncThunk("groups/getGroupList", async () => {
  return await GroupService.getGroupList();
});

const GroupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGroupListAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGroupListAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.groups = action.payload.data.groups;
      state.total = action.payload.data.total;
      state.error = "";
    });
    builder.addCase(getGroupListAsync.rejected, (state) => {
      state.loading = false;
      state.groups = [];
      state.total = 0;
      state.error = "Failed to get group list";
    });
  },
});

export const _GroupActions = GroupSlice.actions;
export const GroupActions = {
  ..._GroupActions,
  getGroupListAsync,
};
export default GroupSlice.reducer;
