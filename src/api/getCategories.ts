import { api } from './axiosClient';
import type { Categories } from '@/features/products/api/models';

export const getCategories = async () => {
  const res = await api.get<Categories>('/categories');
  return res.data;
};
