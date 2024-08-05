import { WorkdayStatisticial } from '@pages/home/models/workday.model';

export interface WorkdayStatisticialState {
  detail: WorkdayStatisticial[];
  loading: boolean;
  error: string;
}
