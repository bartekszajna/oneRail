import { redirect, type LoaderFunctionArgs } from 'react-router-dom';
import { getAccessToken } from '@/shared/utils/authStorage';
import { checkAuthenticatedStatus } from '@/features/auth/api/api';
import { ROUTES } from '../models';

export function protectedLoader(loaderFn: (args: LoaderFunctionArgs) => Promise<unknown>) {
  return async (args: LoaderFunctionArgs) => {
    const token = getAccessToken();
    if (!token) {
      return redirect(ROUTES.LOGIN);
    }
    try {
      await checkAuthenticatedStatus();
    } catch {
      return redirect(ROUTES.LOGIN);
    }

    return loaderFn(args);
  };
}
