import { Group, GroupsPagination } from '@pages/home/models/group.model';

export interface GroupsState {
  groupsPagination: GroupsPagination | null;
  currentGroup: Group | null;
  isLoading: boolean;
  error: string;
}
