import { api } from './axiosClient';
import type { Products } from '@/features/products/api/models';

export const getProducts = async () => {
  const res = await api.get<Products>('/products');
  return res.data;
};
