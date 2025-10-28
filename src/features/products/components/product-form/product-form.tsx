// eslint-disable-next-line
// @ts-nocheck
import { Form } from '@/shared/components/ui/form/form';
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
    defaultValues: {
      title: product?.title || '',
      price: product?.price || 1,
      categoryId: product?.categoryId || 1,
      description: product?.description || '',
      images: product?.images || [],
    },
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
    <Form onSubmit={handleSubmit(submitHandler)} isSubmitting={isSubmitting}>
      <TextField<ProductFormType> label='Title' name='title' control={control} />
      <TextField<ProductFormType> label='Price' name='price' control={control} />
      <TextAreaField label='Description' name='description' control={control} rows={7} />
      <SelectField label='Category' name='categoryId' control={control} options={categories} />
      <MultiValueField label='Images' name='images' control={control} />
    </Form>
  );
};
