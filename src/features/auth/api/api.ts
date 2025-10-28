import { api } from '@/api/axiosClient';
import type { SignInFormType } from '../components/login-form/models';
import type { SignInResponse } from './models';

export async function SignIn(data: SignInFormType) {
  const response = await api.post<SignInResponse>('/auth/login', data);
  return response.data; // Zwraca token i inne dane
}
