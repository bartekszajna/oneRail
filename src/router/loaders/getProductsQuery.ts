import { getProducts } from './../../api/getProducts';
import { queryClient } from '../../lib/queryClient';

export function getProductsQuery() {
  return queryClient.ensureQueryData({
    queryKey: ['products'],
    queryFn: getProducts,
  });
}
