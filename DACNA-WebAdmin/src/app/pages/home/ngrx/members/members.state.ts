import {
  GroupMember,
  GroupMembersPagination,
} from '@pages/home/models/member.model';

export interface MembersState {
  groupMembersPagination: GroupMembersPagination | null;
  currentSelectedMember: GroupMember | null;
  isLoading: boolean;
  error: string;
}
