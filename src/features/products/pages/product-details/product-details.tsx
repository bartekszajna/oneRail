// import { API_BASE_URL } from '@/shared/utils/env';
// import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const ProductDetails = () => {
  const { id } = useParams();

  // const { data, isLoading, isFetching, error } = useQuery({
  //   queryKey: ['products', id],
  //   queryFn: async () => {
  //     const res = await fetch(API_BASE_URL + '/products/' + id);
  //     return await res.json();
  //   },
  // });

  return <div>Hello product with id of {id}!</div>;
};
