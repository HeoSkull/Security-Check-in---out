import { createReducer, on } from '@ngrx/store';

import { MembersState } from './members.state';
import { MembersActions } from './members.actions';

export const initialState: MembersState = {
  groupMembersPagination: null,
  currentSelectedMember: null,
  isLoading: false,
  error: '',
};

export const membersReducer = createReducer(
  initialState,
  on(MembersActions.loadMembers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(
    MembersActions.loadMembersSuccess,
    (state, { groupMembersPagination }) => ({
      ...state,
      groupMembersPagination: groupMembersPagination,
      isLoading: false,
    })
  ),
  on(MembersActions.loadMembersFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(MembersActions.loadMember, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(MembersActions.loadMemberSuccess, (state, { member }) => ({
    ...state,
    currentSelectedMember: member,
    isLoading: false,
  })),
  on(MembersActions.loadMemberFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(MembersActions.addMembers, (state) => ({
    ...state,
    error: '',
    isLoading: true,
  })),
  on(MembersActions.addMembersSuccess, (state) => ({
    ...state,
    error: '',
    isLoading: false,
  })),
  on(MembersActions.addMembersFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(MembersActions.deleteMember, (state) => ({
    ...state,
    error: '',
    isLoading: true,
  })),
  on(MembersActions.deleteMemberSuccess, (state) => ({
    ...state,
    error: '',
    isLoading: false,
  })),
  on(MembersActions.deleteMemberFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }))
);
