import { createReducer, on } from '@ngrx/store';

import { GroupsState } from './groups.state';
import { GroupsActions } from './groups.actions';

export const initialState: GroupsState = {
  groupsPagination: null,
  currentGroup: null,
  isLoading: false,
  error: '',
};

export const groupsReducer = createReducer(
  initialState,
  on(GroupsActions.loadGroups, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(GroupsActions.loadGroupsSuccess, (state, { groupsPagination }) => ({
    ...state,
    groupsPagination,
    isLoading: false,
  })),
  on(GroupsActions.loadGroupsFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(GroupsActions.loadGroup, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(GroupsActions.loadGroupSuccess, (state, { group }) => ({
    ...state,
    currentGroup: group,
    isLoading: false,
  })),
  on(GroupsActions.loadGroupFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(GroupsActions.addGroup, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(GroupsActions.addGroupSuccess, (state, { group }) => ({
    ...state,
    currentGroup: group,
    isLoading: false,
  })),
  on(GroupsActions.addGroupFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(GroupsActions.updateGroup, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(GroupsActions.updateGroupSuccess, (state, { group }) => ({
    ...state,
    currentGroup: group,
    isLoading: false,
  })),
  on(GroupsActions.updateGroupFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(GroupsActions.deleteGroup, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(GroupsActions.deleteGroupSuccess, (state) => ({
    ...state,
    currentGroup: null,
    isLoading: false,
  })),
  on(GroupsActions.deleteGroupFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }))
);
