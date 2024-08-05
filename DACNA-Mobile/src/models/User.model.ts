export type User = {
  id: string;
  username: string;
  email: string;
  photo_url: string;
};

export type UserProfile = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
};

export type FullUser = User & UserProfile;
