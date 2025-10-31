import { redirect, type LoaderFunctionArgs } from 'react-router-dom';
import { getAccessToken } from '@/shared/utils/authStorage';
import { checkAuthenticatedStatus } from '@/features/auth/api/api';
// import { queryClient } from '@/lib/queryClient';

export function protectedLoader(loaderFn: (args: LoaderFunctionArgs) => Promise<unknown>) {
  return async (args: LoaderFunctionArgs) => {
    const token = getAccessToken();
    if (!token) {
      return redirect('/login');
    }
    try {
      await checkAuthenticatedStatus();
    } catch {
      return redirect('/login');
    }

    return loaderFn(args);
  };
}
