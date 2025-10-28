import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '@/shared/utils/env';
import { useQuery } from '@tanstack/react-query';
import { ProductForm } from '../../components/product-form/product-form';
import { type Product, type Categories } from '../../api/models';

export const ProductEdit = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['categories', id],
    queryFn: async () => {
      const res = await fetch(API_BASE_URL + '/products/' + id);
      return await res.json();
    },
  });

  const { data: categories } = useQuery<Categories>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(API_BASE_URL + '/categories');
      return await res.json();
    },
  });
  return (
    <div className='flex flex-col gap-8 justify-center items-center mb-20'>
      <h1>Edit product</h1>
      {/* <ProductForm categories={categories} product={product} /> */}
      {isLoading ? <p>Waiting...</p> : <ProductForm categories={categories} product={product} />}
    </div>
  );
};
