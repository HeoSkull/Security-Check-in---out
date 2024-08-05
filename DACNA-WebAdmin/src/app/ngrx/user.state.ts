import { FullUser } from '@models/user.model';

export interface UserState {
  user: FullUser | null;
  isLoading: boolean;
  isUpdateSuccess: boolean;
  error: string;
}
