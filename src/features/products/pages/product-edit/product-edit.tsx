import { useParams } from 'react-router-dom';
// import { API_BASE_URL } from '@/shared/utils/env';
// import { useQuery } from '@tanstack/react-query';

export const ProductEdit = () => {
  const { id } = useParams();
  // const { data, isLoading, isFetching, error } = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: async () => {
  //     const res = await fetch(API_BASE_URL + '/categories');
  //     return await res.json();
  //   },
  // });
  return <p>Edit: ID:{id}</p>;
};
