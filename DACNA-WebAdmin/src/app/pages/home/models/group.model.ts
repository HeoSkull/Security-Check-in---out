import { GroupMember } from './member.model';

export type Group = {
  id: string;
  name: string;
  description: string;
  owner: GroupMember;
};

export type GroupsPagination = {
  groups: Group[];
  currentPage: number;
  perPage: number;
  total: number;
};
