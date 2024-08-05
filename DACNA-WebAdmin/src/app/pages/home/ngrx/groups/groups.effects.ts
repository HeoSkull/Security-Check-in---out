import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap } from 'rxjs';

import { GroupsActions } from './groups.actions';
import { GroupsService } from '@pages/home/services/groups.service';

import { Store } from '@ngrx/store';

@Injectable()
export class GroupsEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private groupsService: GroupsService
  ) {}

  loadGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupsActions.loadGroups),
      switchMap(({ currentPage, perPage }) =>
        this.groupsService.getGroups(currentPage, perPage)
      ),
      map((groupsPagination) =>
        GroupsActions.loadGroupsSuccess({ groupsPagination })
      ),
      catchError((error) => of(GroupsActions.loadGroupsFailure({ error })))
    );
  });

  loadGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupsActions.loadGroup),
      switchMap(({ group_id }) => this.groupsService.getGroup(group_id)),
      map((group) => GroupsActions.loadGroupSuccess({ group })),
      catchError((error) => of(GroupsActions.loadGroupFailure({ error })))
    );
  });

  addGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupsActions.addGroup),
      switchMap(({ name, description }) =>
        this.groupsService.addGroup(name, description)
      ),
      switchMap((group) =>
        of(
          GroupsActions.loadGroups({}),
          GroupsActions.addGroupSuccess({ group })
        )
      ),
      catchError((error) => of(GroupsActions.addGroupFailure({ error })))
    );
  });

  updateGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupsActions.updateGroup),
      switchMap(({ group_id, name, description }) =>
        this.groupsService.updateGroup(group_id, name, description)
      ),
      switchMap((group) =>
        of(
          GroupsActions.loadGroups({}),
          GroupsActions.updateGroupSuccess({ group })
        )
      ),
      catchError((error) => of(GroupsActions.updateGroupFailure({ error })))
    );
  });

  deleteGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupsActions.deleteGroup),
      switchMap(({ group_id }) => this.groupsService.deleteGroup(group_id)),
      switchMap(() => of(GroupsActions.loadGroups({}))),
      catchError((error) => of(GroupsActions.deleteGroupFailure({ error })))
    );
  });
}
