import { getProducts } from './../../api/getProducts';
import { queryClient } from '../../shared/utils/queryClient';
import { getURLParamFromStorage } from '@/shared/utils/getURLParamFromStorage';
import { URLStateKeys } from '@/shared/models';
import { QUERY_KEYS } from '../models';

export function getProductsQuery() {
  const limit = Number(getURLParamFromStorage(URLStateKeys.LIMIT)) || 10;
  const offset = Number(getURLParamFromStorage(URLStateKeys.OFFSET)) || 0;

  return queryClient.ensureQueryData({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: () => getProducts(limit, offset),
  });
}
