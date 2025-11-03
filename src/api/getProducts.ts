import { api } from './axiosClient';
import type { Products } from '@/features/products/api/models';

export async function getProducts(limit: number, offset: number) {
  const res = await api.get<Products>('/products', {
    params: { limit, offset },
  });

  return res.data;
}
