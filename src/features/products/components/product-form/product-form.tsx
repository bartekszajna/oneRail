// eslint-disable-next-line
// @ts-nocheck

import { TextAreaField } from '@/shared/components/ui/form/textarea-field';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { ProductFormSchema, type ProductFormType } from './models';
import { TextField } from '@/shared/components/ui/form';
import { API_BASE_URL } from '@/shared/utils/env';
import { SelectField } from '@/shared/components/ui/form/select-field';
import type { Categories, Product } from '../../api/models';
import { MultiValueField } from '@/shared/components/ui/form/multi-value-field';

type ProductFormProps = {
  product?: Product;
  categories: Categories;
};

export const ProductForm = ({ product, categories }: ProductFormProps) => {
  const {
    handleSubmit,
    setError,
    control,
    formState: { isSubmitting },
  } = useForm<ProductFormType>({
    defaultValues: product
      ? {
          title: product.title,
          price: product.price,
          categoryId: product.categoryId,
          description: product.description,
          images: product.images,
        }
      : undefined,
    resolver: zodResolver(ProductFormSchema),
  });

  const submitHandler: SubmitHandler<ProductFormType> = async (data) => {
    const res = await fetch(API_BASE_URL + '/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setError('root', {
        message: 'You could not be authorized',
      });
    }
  };

  return (
    <form
      className='w-[80%] mx-auto md:w-[600px] bg-[var(--dark-bg)] backdrop-blur-xs flex flex-col gap-2 sm:gap-6 px-8 py-8 sm:px-12 rounded-2xl shadow-xl items-stretch'
      onSubmit={handleSubmit(submitHandler)}
    >
      <TextField<ProductFormType> label='Title' name='title' control={control} />
      <TextField<ProductFormType> label='Price' name='price' control={control} />
      <TextAreaField label='Description' name='description' control={control} rows={5} />
      <SelectField label='Category' name='categoryId' control={control} options={categories} />
      <MultiValueField label='Images' name='images' control={control} />
      <button
        type='submit'
        disabled={isSubmitting}
        className='px-12 py-3 rounded-4xl bg-gray-300 text-gray-900 font-bold hover:cursor-pointer outline-none focus:bg-amber-500 hover:bg-amber-500 hover:text-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-all active:scale-95'
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
