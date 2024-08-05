import { createReducer, on } from '@ngrx/store';

import { CurrentMemberState } from './current-member.state';
import { CurrentMemberActions } from './current-member.actions';

export const initialState: CurrentMemberState = {
  currentMember: null,
  isLoading: false,
  error: '',
};

export const currentMemberReducer = createReducer(
  initialState,
  on(CurrentMemberActions.getMember, (state) => ({
    ...state,
    isLoading: true,
    error: '',
  })),
  on(CurrentMemberActions.getMemberSuccess, (state, { member }) => ({
    ...state,
    currentMember: member,
    isLoading: false,
  })),
  on(CurrentMemberActions.getMemberFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
