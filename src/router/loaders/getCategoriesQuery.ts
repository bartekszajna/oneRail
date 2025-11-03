import { getCategories } from '../../api';
import { queryClient } from '../../shared/utils/queryClient';
import { QUERY_KEYS } from '../models';

export function getCategoriesQuery() {
  return queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: getCategories,
  });
}
