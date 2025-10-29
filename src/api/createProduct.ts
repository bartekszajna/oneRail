import type { ProductFormType } from '@/features/products/components/product-form/models';
import { api } from './axiosClient';
import { type Product } from '@/features/products/api/models';

export async function createProduct(data: ProductFormType): Promise<Product> {
  const res = await api.post<Product>('/products/', data);
  return res.data;
}
