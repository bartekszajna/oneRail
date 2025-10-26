import { API_BASE_URL } from '@/shared/utils/env';
import { useQuery } from '@tanstack/react-query';
import { ProductForm } from '../../components/product-form/product-form';
import { type Categories } from '../../api/models';

export const ProductCreate = () => {
  const { data } = useQuery<Categories>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(API_BASE_URL + '/categories');
      return await res.json();
    },
  });

  return (
    <div className='flex flex-col gap-8 justify-center items-center mb-20'>
      <h1>Create new product</h1>
      <ProductForm categories={data} />
    </div>
  );
};
