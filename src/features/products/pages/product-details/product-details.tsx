// import { API_BASE_URL } from '@/shared/utils/env';
import { getProduct } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

export const ProductDetails = () => {
  const { id } = useParams();

  const { data: product } = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(Number(id)),
  });

  return (
    <article>
      <header className='flex flex-row justify-between items-center mb-8'>
        <h1>Product details</h1>
        <Link
          to='edit'
          className='bg-gray-200 px-3 py-1 text-xs md:px-6 md:py-2 rounded-full font-semibold text-gray-900 hover:bg-amber-500 hover:text-gray-200 transition-all active:scale-95'
        >
          Edit product
        </Link>
      </header>
      <div className='flex flex-col md:flex-row items-center'>
        <img
          src={product?.images?.[0]}
          className='mx-auto my-8 size-full md:w-4/10'
          alt='Product image'
        />
        <div className='md:ml-12'>
          <h2 className='text-2xl font-bold mb-2'>{product?.title}</h2>
          <p className='mb-2'>
            Category: <span className='font-semibold'>{product?.category?.name}</span>
          </p>
          <p className='mb-8 font-semibold'>{product?.price} $</p>
          <p>{product?.description}</p>
        </div>
      </div>
    </article>
  );
};
