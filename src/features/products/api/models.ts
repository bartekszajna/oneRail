import type z from 'zod';
import type { CategorySchema, CategoriesSchema, ProductSchema, ProductsSchema } from './schemas';

export type Category = z.infer<typeof CategorySchema>;
export type Categories = z.infer<typeof CategoriesSchema>;

export type Product = z.infer<typeof ProductSchema> & {
  category: Category;
};
export type Products = z.infer<typeof ProductsSchema>;
