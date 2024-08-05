export type Workday = {
  id: string;

  user_id: string;
  group_id: string;

  status: WorkdayStatus;

  check_in: string;
  check_out: string | null;

  created_at: string;
  updated_at: string;
};

export type WorkdayStatus = "CHECKED_IN" | "CHECKED_OUT";
