import { createAction, props } from '@ngrx/store';
import { GroupMember } from '@pages/home/models/member.model';

export const CurrentMemberActions = {
  getMember: createAction(
    '[Current Member] Get Member',
    props<{ group_id: string }>()
  ),
  getMemberSuccess: createAction(
    '[Current Member] Get Member Success',
    props<{ member: GroupMember }>()
  ),
  getMemberFailure: createAction(
    '[Current Member] Get Member Failure',
    props<{ error: string }>()
  ),
};
