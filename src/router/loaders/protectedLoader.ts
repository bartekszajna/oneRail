import { redirect } from 'react-router-dom';
import { getAccessToken } from '@/shared/utils/authStorage';
// import { queryClient } from '@/lib/queryClient';

export function protectedLoader(loaderFn: () => Promise<unknown>) {
  return async () => {
    const token = getAccessToken();
    if (!token) {
      return redirect('/login');
    }
    return loaderFn();
  };
}
// export function protectedLoader<T>(queryKey: any[], queryFn: () => Promise<T>) {
//   return async () => {
//     const token = getAccessToken();
//     if (!token) throw redirect('/login');

//     return queryClient.ensureQueryData({
//       queryKey,
//       queryFn,
//     });
//   };
// }
