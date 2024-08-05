import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { UsersActions } from './user.actions';
import { UserService } from '@services/user.service';
import { FullUser } from '@models/user.model';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.getUser),
      switchMap(() => this.userService.getUserData()),
      map((serverResponse) => {
        const data = serverResponse.data;

        const tempUser: FullUser = {
          id: data.id,
          username: data.username,
          email: data.email,
          photoUrl: data.photo_url,

          firstName: data.first_name,
          lastName: data.last_name,
          phone: data.phone,
        };

        return UsersActions.getUserSuccess({ user: tempUser });
      }),
      catchError((error) => of(UsersActions.getUserFailure({ error })))
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.updateUser),
      switchMap((action) => this.userService.updateUserData(action.user)),
      map((serverResponse) => {
        const data = serverResponse.data;

        const tempUser: FullUser = {
          id: data.id,
          username: data.username,
          email: data.email,
          photoUrl: data.photo_url,

          firstName: data.first_name,
          lastName: data.last_name,
          phone: data.phone,
        };

        return UsersActions.updateUserSuccess({ user: tempUser });
      }),
      catchError((error) => of(UsersActions.updateUserFailure({ error })))
    );
  });
}
