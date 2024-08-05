export type User = {
  id: string;
  email: string;
  username: string;
  photoUrl: string;
};

export type UserProfile = {
  id: string;
  lastName: string;
  firstName: string;
  phone: string | undefined;
};

export type FullUser = User & UserProfile;

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type UpdateUser = Nullable<Partial<Omit<FullUser, 'id' | 'photoUrl'>>>;

export type LoginModel = {
  username: string;
  password: string;
};

export type RegisterModel = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};
