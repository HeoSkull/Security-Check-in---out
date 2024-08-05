import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { MembersActions } from './members.actions';
import { MembersService } from '@pages/home/services/members.service';

@Injectable()
export class MembersEffects {
  constructor(
    private actions$: Actions,
    private membersService: MembersService
  ) {}

  loadMembers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MembersActions.loadMembers),
      switchMap(({ group_id, currentPage, perPage }) =>
        this.membersService.getMembers(group_id, currentPage, perPage)
      ),
      map((groupMembersPagination) =>
        MembersActions.loadMembersSuccess({ groupMembersPagination })
      ),
      catchError((error) => of(MembersActions.loadMembersFailure({ error })))
    );
  });

  loadMember$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MembersActions.loadMember),
      switchMap(({ group_id, member_id }) =>
        this.membersService.getMember(group_id, member_id)
      ),
      map((member) => MembersActions.loadMemberSuccess({ member })),
      catchError((error) => of(MembersActions.loadMemberFailure({ error })))
    );
  });

  addMembers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MembersActions.addMembers),
      switchMap(({ group_id, users_id }) =>
        this.membersService.addMembers(group_id, users_id)
      ),
      switchMap((group_id) =>
        of(
          MembersActions.loadMembers({ group_id: group_id }),
          MembersActions.addMembersSuccess()
        )
      ),
      catchError((error) => of(MembersActions.addMembersFailure({ error })))
    );
  });

  deleteMember$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MembersActions.deleteMember),
      switchMap(({ group_id, member_id }) =>
        this.membersService.deleteMember(group_id, member_id)
      ),
      switchMap((group_id) =>
        of(
          MembersActions.loadMembers({ group_id: group_id }),
          MembersActions.deleteMemberSuccess()
        )
      ),
      catchError((error) => of(MembersActions.deleteMemberFailure({ error })))
    );
  });
}
