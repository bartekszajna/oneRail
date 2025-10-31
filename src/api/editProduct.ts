import type { ProductFormType } from '@/features/products/components/product-form/models';
import { api } from './axiosClient';
import type { Product } from '@/features/products/api/models';

type EditProduct = Partial<ProductFormType>;

export const editProduct = async (id: number, data: EditProduct) => {
  const res = await api.put<Product>('/products/' + id, data);
  return res.data;
};
