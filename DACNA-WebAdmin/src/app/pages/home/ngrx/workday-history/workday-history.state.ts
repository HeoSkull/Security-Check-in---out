import { WorkdayHistory } from '@pages/home/models/workday.model';

export interface WorkdayHistoryState {
  workdayHistories: WorkdayHistory[];
  loading: boolean;
  error: string;
}
