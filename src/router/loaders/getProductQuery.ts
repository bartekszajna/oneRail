import { getProduct } from './../../api';
import { queryClient } from '../../lib/queryClient';
import type { LoaderFunctionArgs } from 'react-router-dom';

export const getProductQuery = ({ params }: LoaderFunctionArgs) =>
  queryClient.ensureQueryData({
    queryKey: ['products', params.id],
    queryFn: () => getProduct(params.id!),
  });
