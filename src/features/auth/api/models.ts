export type SignInResponse = {
  access_token: string;
  refresh_token: string;
};

export type UserResponse = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};
