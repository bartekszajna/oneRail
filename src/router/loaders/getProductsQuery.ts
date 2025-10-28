import { getProducts } from '../../api/getProducts';
import { queryClient } from '../../lib/queryClient';

export const getProductsQuery = () =>
  queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
