import { getCategories } from '../../api';
import { queryClient } from '../../lib/queryClient';

export function getCategoriesQuery() {
  return queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: getCategories,
  });
}
