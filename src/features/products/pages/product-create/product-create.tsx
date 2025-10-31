
import { useQuery } from '@tanstack/react-query';
import { ProductForm } from '../../components/product-form';
import { type Categories } from '../../api/models';
import { getCategories } from '@/api';

export const ProductCreate = () => {
  console.log("PRODUCT CREATE")

    const { data: categories } = useQuery<Categories>({
      queryKey: ['categories'],
      queryFn: getCategories,
    });

  return (
    <div className='flex flex-col gap-8 justify-center items-center mb-20'>
      <h1>Create new product</h1>
      <ProductForm categories={categories} />
    </div>
  );
};
