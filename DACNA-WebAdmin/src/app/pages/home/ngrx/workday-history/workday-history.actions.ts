import { createAction, props } from '@ngrx/store';
import { WorkdayHistory } from '@pages/home/models/workday.model';

export const WorkdayHistoryActions = {
  loadWorkdayHistoryByDays: createAction(
    '[WorkdayHistory] Load Workday History',
    props<{ groupID: string; user_id: string; days: string }>()
  ),
  loadWorkdayHistoryByDaysSuccess: createAction(
    '[WorkdayHistory] Load Workday History Success',
    props<{ workdayHistories: WorkdayHistory[] }>()
  ),
  loadWorkdayHistoryByDaysFailure: createAction(
    '[WorkdayHistory] Load Workday History Failure',
    props<{ error: string }>()
  ),
};
