// Generate
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { MembersService } from '@pages/home/services/members.service';
import { CurrentMemberActions } from './current-member.actions';

@Injectable()
export class CurrentMemberEffects {
  constructor(
    private actions$: Actions,
    private membersService: MembersService
  ) {}

  getMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrentMemberActions.getMember),
      switchMap(({ group_id }) =>
        this.membersService.getCurrentMember(group_id).pipe(
          map((member) => CurrentMemberActions.getMemberSuccess({ member })),
          catchError((error) =>
            of(CurrentMemberActions.getMemberFailure({ error }))
          )
        )
      )
    )
  );
}
