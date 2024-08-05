import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { WorkdayService } from '@pages/home/services/workday.service';
import { WorkdayStatisticialActions } from './workday-statistical.actions';

@Injectable()
export class WorkdayStatisticialEffects {
  constructor(
    private actions$: Actions,
    private workdayService: WorkdayService
  ) {}

  loadWorkdayStatisticial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkdayStatisticialActions.loadWorkdayStatisticial),
      switchMap(({ groupID, user_id, start, end }) =>
        this.workdayService
          .getWorkdayHistoryByStartAndEnd(groupID, user_id, start, end)
          .pipe(
            map((workdayStatisticials) => {
              return WorkdayStatisticialActions.loadWorkdayStatisticialSuccess({
                workdayStatisticials,
              });
            }),
            catchError((error) =>
              of(
                WorkdayStatisticialActions.loadWorkdayStatisticialFailure({
                  error,
                })
              )
            )
          )
      )
    )
  );
}
