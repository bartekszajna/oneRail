import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProductForm } from '../../components/product-form/product-form';
import { type Product, type Categories } from '../../api/models';
import { getCategories, getProduct } from '@/api';

export const ProductEdit = () => {
  const { id } = useParams();
  const { data: product } = useQuery<Product>({
    queryKey: ['products', id],
    queryFn: () => getProduct(Number(id)),
  });

  const { data: categories } = useQuery<Categories>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <div className='flex flex-col gap-8 justify-center items-center mb-20'>
      <h1>Edit product</h1>
      {categories && product && <ProductForm categories={categories} product={product} />}
    </div>
  );
};
