
import { useQuery } from '@tanstack/react-query';
import { ProductForm } from '../../components/product-form';
import { type Categories } from '../../api/models';
import { getCategories } from '@/api';
import { QUERY_KEYS } from "@/router/models"

export const ProductCreate = () => {
    const { data: categories } = useQuery<Categories>({
      queryKey: [QUERY_KEYS.CATEGORIES],
      queryFn: getCategories,
    });

  return (
    <div className='flex flex-col gap-8 justify-center items-center mb-20'>
      <h1>Create new product</h1>
      {categories && <ProductForm categories={categories} />}
    </div>
  );
};
