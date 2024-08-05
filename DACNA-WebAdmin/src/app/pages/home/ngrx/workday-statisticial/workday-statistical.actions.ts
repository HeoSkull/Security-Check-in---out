import { createAction, props } from '@ngrx/store';
import { WorkdayStatisticial } from '@pages/home/models/workday.model';

export const WorkdayStatisticialActions = {
  loadWorkdayStatisticial: createAction(
    '[WorkdayStatisticial] Load Workday Statisticial',
    props<{ groupID: string; user_id: string; start?: string; end?: string }>()
  ),
  loadWorkdayStatisticialSuccess: createAction(
    '[WorkdayStatisticial] Load Workday Statisticial Success',
    props<{ workdayStatisticials: WorkdayStatisticial[] }>()
  ),
  loadWorkdayStatisticialFailure: createAction(
    '[WorkdayStatisticial] Load Workday Statisticial Failure',
    props<{ error: string }>()
  ),
};
