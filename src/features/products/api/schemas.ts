import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  slug: z.string().min(1),
  image: z.url(),
});

export const CategoriesSchema = z.array(CategorySchema);

export const ProductSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  price: z.number().int().positive(),
  description: z.string(),
  category: z.string(),
  categoryId: z.number().int().positive(),
  slug: z.string(),
  images: z.array(z.url()),
});

export const ProductsSchema = z.array(ProductSchema);
