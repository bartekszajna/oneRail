// eslint-disable-next-line
// @ts-nocheck
import { Form } from '@/shared/components/ui/form/form';
import { TextAreaField } from '@/shared/components/ui/form/textarea-field';

import { TextField } from '@/shared/components/ui/form';

import { SelectField } from '@/shared/components/ui/form/select-field';
import type { Categories, Product } from '../../api/models';
import { MultiValueField } from '@/shared/components/ui/form/multi-value-field';
import { useMethods } from './hooks';

type ProductFormProps = {
  product?: Product;
  categories: Categories;
};

export const ProductForm = ({ product, categories }: ProductFormProps) => {
  const { handleSubmit, submitHandler, control, isSubmitting, errors } = useMethods(product);
  
  return (
    <Form onSubmit={handleSubmit(submitHandler)} isSubmitting={isSubmitting}>
      <TextField label='Title' name='title' control={control} />
      <TextField label='Price' name='price' control={control} />
      <TextAreaField label='Description' name='description' control={control} rows={7} />
      <SelectField label='Category' name='categoryId' control={control} options={categories} />
      <MultiValueField label='Images' name='images' control={control} />
      {errors.root && (
        <span className='text-red-600 font-semibold text-sm'>{errors.root.message}</span>
      )}
    </Form>
  );
};
