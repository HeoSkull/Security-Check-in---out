export type GroupMember = {
  id: string;

  username: string;
  email: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  phone: string;

  status: 'WORKING' | 'LEFT';
  role: string;
};

export type GroupMembersPagination = {
  members: GroupMember[];
  currentPage: number;
  perPage: number;
  total: number;
};
