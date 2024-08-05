import { createAction, props } from '@ngrx/store';
import { FullUser, UpdateUser } from '@models/user.model';

export const UsersActions = {
  getUser: createAction('[User] Get User'),
  getUserSuccess: createAction(
    '[User] Get User Success',
    props<{ user: FullUser }>()
  ),
  getUserFailure: createAction(
    '[User] Get User Failure',
    props<{ error: string }>()
  ),

  updateUser: createAction('[User] Update User', props<{ user: UpdateUser }>()),
  updateUserSuccess: createAction(
    '[User] Update User Success',
    props<{ user: FullUser }>()
  ),
  updateUserFailure: createAction(
    '[User] Update User Failure',
    props<{ error: string }>()
  ),

  refreshUpdateSuccess: createAction('[User] Refresh Update Success'),
};
