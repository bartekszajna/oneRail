import type z from 'zod';
import type { CategorySchema, CategoriesSchema, ProductSchema, ProductsSchema } from './schemas';

export type Category = z.infer<typeof CategorySchema> | undefined;
export type Categories = z.infer<typeof CategoriesSchema> | undefined;

export type Product =
  | (z.infer<typeof ProductSchema> & {
      category: Category;
    })
  | undefined;
export type Products = z.infer<typeof ProductsSchema> | undefined;
