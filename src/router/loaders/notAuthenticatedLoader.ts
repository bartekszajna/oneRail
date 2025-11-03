import { checkAuthenticatedStatus } from '@/features/auth/api/api';
import { deleteAccessToken, getAccessToken } from '@/shared/utils/authStorage';
import { redirect, type LoaderFunctionArgs } from 'react-router-dom';
import { ROUTES } from '../models';

export async function notAuthenticatedLoader(request: LoaderFunctionArgs) {
  const url = new URL(request.request.url);
  const pathname = url.hash.replace('#', '') || '/';
  const token = getAccessToken();

  if (token) {
    try {
      await checkAuthenticatedStatus();
      if (pathname === ROUTES.ROOT) {
        return redirect(ROUTES.PRODUCTS);
      }
    } catch {
      deleteAccessToken();
      if (pathname !== ROUTES.LOGIN && pathname !== ROUTES.SIGNUP) {
        return redirect(ROUTES.LOGIN);
      }
    }
  }
  return null;
}
