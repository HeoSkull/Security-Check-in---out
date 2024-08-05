export type Workday = {
  id: string;

  user_id: string;
  group_id: string;

  status: WorkdayStatus;

  check_in: Date;
  check_out: Date;

  created_at: Date;
  updated_at: Date;
};

export type WorkdayStatus = 'CHECKED_IN' | 'CHECKED_OUT';

export type WorkdayHistory = {
  date: string;
  total: {
    hour: number;
    minute: number;
  };
  workdays: Omit<Workday, 'id'>[];
};

export type WorkdayStatisticial = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date: string;
  check_in: string;
  check_out: string;
  total: number;
};
