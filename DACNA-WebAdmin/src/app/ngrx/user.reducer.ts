import { createReducer, on } from '@ngrx/store';

import { UserState } from './user.state';
import { UsersActions } from './user.actions';

export const initialState: UserState = {
  user: null,
  isLoading: false,
  isUpdateSuccess: false,
  error: '',
};

export const userReducer = createReducer(
  initialState,
  on(UsersActions.getUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UsersActions.getUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
    isLoading: false,
  })),
  on(UsersActions.getUserFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(UsersActions.updateUser, (state) => ({
    ...state,
    isLoading: true,
    isUpdateSuccess: false,
  })),
  on(UsersActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
    isLoading: false,
    isUpdateSuccess: true,
  })),
  on(UsersActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
    isUpdateSuccess: false,
  })),
  on(UsersActions.refreshUpdateSuccess, (state) => ({
    ...state,
    isUpdateSuccess: false,
  }))
);
