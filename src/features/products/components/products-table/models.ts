import { SORTING } from '@/shared/models';
import type { Products } from '../../api/models';

export type ProductsTableProps = {
  data: Products;
  limit: number;
  offset: number;
  titleSort: SORTING | null;
  priceSort: SORTING | null;
  titleFilter: string;
  categoryFilter: string;
  minPriceFilter: string;
  maxPriceFilter: string;
  titleFilterHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categoryFilterHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minPriceFilterHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxPriceFilterHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  limitSelectHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  previousPageHandler: () => void;
  nextPageHandler: () => void;
  deleteProductHandler: (id: number) => void;
  titleSortHandler: () => void;
  priceSortHandler: () => void;
};
