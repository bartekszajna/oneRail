// eslint-disable-next-line
// @ts-nocheck

import { useForm, type SubmitHandler } from 'react-hook-form';
import { ProductFormSchema, type ProductFormType } from './models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useNavigation } from 'react-router-dom';
import { ROUTES } from '@/router/models';
import type { Product } from '../../api/models';
import { editProduct, createProduct } from '@/api';
import { queryClient } from '@/shared/utils/queryClient';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useMethods = (product: Product) => {
  const navigate = useNavigate();
  const createProductMutation = useMutation<Product, Error, ProductFormType>({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const editProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductFormType }) => editProduct(id, data),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products', vars.id] });
    },
  });

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting: isFormSubmitting, isDirty },
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
    if (!isDirty) {
      setError('root', { message: 'No changes to the form detected' });
      return;
    }
    try {
      if (product?.id) {
        await editProductMutation.mutateAsync({ id: product.id, data });
      } else {
        await createProductMutation.mutateAsync(data);
      }

      toast.success(`Product ${product?.id ? 'edited' : 'created'} successfully.`, {
        theme: 'dark',
        hideProgressBar: true,
      });
      navigate(ROUTES.PRODUCTS);
    } catch {
      setError('root', {
        message: product?.id
          ? 'The product could not be updated'
          : 'The product could not be created',
      });
      toast.error(`Request unsuccessful. Please try again later.`, {
        theme: 'dark',
        hideProgressBar: true,
      });
    }
  };

  const navigation = useNavigation();

  const isLoading =
    navigation.state === 'loading' || navigation.state === 'submitting' || isFormSubmitting;

  return {
    handleSubmit,
    submitHandler,
    control,
    isSubmitting: isLoading,
    errors,
  };
};
