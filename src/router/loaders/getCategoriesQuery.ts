import { getCategories } from '../../api';
import { queryClient } from '../../lib/queryClient';

export const getCategoriesQuery = () =>
  queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: getCategories,
  });
