import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { WorkdayService } from '@pages/home/services/workday.service';
import { WorkdayHistoryActions } from './workday-history.actions';

@Injectable()
export class WorkdayHistoryEffects {
  constructor(
    private actions$: Actions,
    private workdayService: WorkdayService
  ) {}

  loadWorkdayHistoryByDays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkdayHistoryActions.loadWorkdayHistoryByDays),
      switchMap(({ groupID, user_id, days }) =>
        this.workdayService
          .getWorkdayHistoryByDays(groupID, user_id, days)
          .pipe(
            map((workdayHistory) => {
              return WorkdayHistoryActions.loadWorkdayHistoryByDaysSuccess({
                workdayHistories: workdayHistory,
              });
            }),
            catchError((error) =>
              of(
                WorkdayHistoryActions.loadWorkdayHistoryByDaysFailure({ error })
              )
            )
          )
      )
    )
  );
}
