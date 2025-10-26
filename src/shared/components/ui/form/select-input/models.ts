import type { Categories } from '@/features/products/api/models';

export type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: Categories;
};
