import { getProduct } from './../../api';
import { queryClient } from '../../shared/utils/queryClient';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { QUERY_KEYS } from '../models';

export const getProductQuery = ({ params }: LoaderFunctionArgs) =>
  queryClient.ensureQueryData({
    queryKey: [QUERY_KEYS.PRODUCTS, params.id],
    queryFn: () => getProduct(Number(params.id)),
  });
