import { createAction, props } from '@ngrx/store';
import {
  GroupMember,
  GroupMembersPagination,
} from '@pages/home/models/member.model';

export const MembersActions = {
  loadMembers: createAction(
    '[Members] Load Members',
    props<{ group_id: string; currentPage?: number; perPage?: number }>()
  ),
  loadMembersSuccess: createAction(
    '[Members] Load Members Success',
    props<{ groupMembersPagination: GroupMembersPagination }>()
  ),
  loadMembersFailure: createAction(
    '[Members] Load Members Failure',
    props<{ error: string }>()
  ),

  loadMember: createAction(
    '[Members] Load Member',
    props<{ group_id: string; member_id: string }>()
  ),
  loadMemberSuccess: createAction(
    '[Members] Load Member Success',
    props<{ member: GroupMember }>()
  ),
  loadMemberFailure: createAction(
    '[Members] Load Member Failure',
    props<{ error: string }>()
  ),

  addMembers: createAction(
    '[Members] Add Members',
    props<{ group_id: string; users_id: string[] }>()
  ),
  addMembersSuccess: createAction('[Members] Add Members Success'),
  addMembersFailure: createAction(
    '[Members] Add Members Failure',
    props<{ error: string }>()
  ),

  deleteMember: createAction(
    '[Members] Delete Member',
    props<{ group_id: string; member_id: string }>()
  ),
  deleteMemberSuccess: createAction('[Members] Delete Member Success'),
  deleteMemberFailure: createAction(
    '[Members] Delete Member Failure',
    props<{ error: string }>()
  ),
};
