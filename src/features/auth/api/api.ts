import { api } from '@/api/axiosClient';
import type { LoginFormType } from '../components/login-form/models';
import type { SignInResponse, UserResponse } from './models';
import type { SignupFormType } from '../components/signup-form/models';

export async function signIn(data: LoginFormType) {
  const response = await api.post<SignInResponse>('/auth/login', data);
  return response.data;
}

export async function signUp(data: SignupFormType) {
  const response = await api.post<UserResponse>('/users', data);
  return response.data;
}

export async function checkAuthenticatedStatus() {
  const response = await api.get<UserResponse>('/auth/profile');
  return response.data;
}
