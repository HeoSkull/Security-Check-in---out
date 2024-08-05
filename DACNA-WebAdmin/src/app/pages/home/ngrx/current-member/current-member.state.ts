import { GroupMember } from '@pages/home/models/member.model';

export interface CurrentMemberState {
  currentMember: GroupMember | null;
  isLoading: boolean;
  error: string;
}
