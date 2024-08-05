import { createAction, props } from '@ngrx/store';

import { Group, GroupsPagination } from '@pages/home/models/group.model';

export const GroupsActions = {
  loadGroups: createAction(
    '[Groups] Load Groups',
    props<{ currentPage?: number; perPage?: number }>()
  ),
  loadGroupsSuccess: createAction(
    '[Groups] Load Groups Success',
    props<{ groupsPagination: GroupsPagination }>()
  ),
  loadGroupsFailure: createAction(
    '[Groups] Load Groups Failure',
    props<{ error: string }>()
  ),

  loadGroup: createAction('[Groups] Load Group', props<{ group_id: string }>()),
  loadGroupSuccess: createAction(
    '[Groups] Load Group Success',
    props<{ group: Group }>()
  ),
  loadGroupFailure: createAction(
    '[Groups] Load Group Failure',
    props<{ error: string }>()
  ),

  addGroup: createAction(
    '[Groups] Add Group',
    props<{ name: string; description: string }>()
  ),
  addGroupSuccess: createAction(
    '[Groups] Add Group Success',
    props<{ group: Group }>()
  ),
  addGroupFailure: createAction(
    '[Groups] Add Group Failure',
    props<{ error: string }>()
  ),

  updateGroup: createAction(
    '[Groups] Update Group',
    props<{ group_id: string; name: string; description: string }>()
  ),
  updateGroupSuccess: createAction(
    '[Groups] Update Group Success',
    props<{ group: Group }>()
  ),
  updateGroupFailure: createAction(
    '[Groups] Update Group Failure',
    props<{ error: string }>()
  ),

  deleteGroup: createAction(
    '[Groups] Delete Group',
    props<{ group_id: string }>()
  ),
  deleteGroupSuccess: createAction(
    '[Groups] Delete Group Success',
    props<{ group_id: string }>()
  ),
  deleteGroupFailure: createAction(
    '[Groups] Delete Group Failure',
    props<{ error: string }>()
  ),
};
