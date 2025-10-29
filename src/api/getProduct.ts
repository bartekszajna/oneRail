import { api } from './axiosClient';
import type { Product } from '@/features/products/api/models';

export const getProduct = async (id: string) => {
  const res = await api.get<Product>('/products/' + id);
  return res.data;
};
