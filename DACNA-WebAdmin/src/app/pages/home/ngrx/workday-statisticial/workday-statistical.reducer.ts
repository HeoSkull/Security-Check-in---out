import { createReducer, on } from '@ngrx/store';

import { WorkdayStatisticialState } from './workday-statistical.state';
import { WorkdayStatisticialActions } from './workday-statistical.actions';

const initialState: WorkdayStatisticialState = {
  detail: [],
  loading: false,
  error: '',
};

export const workdayStatisticialReducer = createReducer(
  initialState,
  on(WorkdayStatisticialActions.loadWorkdayStatisticial, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(
    WorkdayStatisticialActions.loadWorkdayStatisticialSuccess,
    (state, { workdayStatisticials }) => ({
      detail: workdayStatisticials,
      loading: false,
      error: '',
    })
  ),
  on(
    WorkdayStatisticialActions.loadWorkdayStatisticialFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  )
);
