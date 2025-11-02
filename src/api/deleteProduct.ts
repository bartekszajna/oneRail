import { api } from './axiosClient';

export const deleteProduct = async (id: number) => {
  const res = await api.delete<boolean>('/products/' + id);
  return res.data;
};
