import z from 'zod';
import { isValidUrl } from '@/shared/utils/isValidURL';

export const ProductFormSchema = z.object({
  title: z.string().min(1, { error: 'Field cannot be empty' }),
  description: z.string().min(1, { error: 'Field cannot be empty' }),
  price: z.coerce.number().int().min(1).max(9999),
  categoryId: z.number().int().min(1),
  images: z.array(z.string()).superRefine((arr, ctx) => {
    const invalid = arr.filter((url) => !isValidUrl(url));
    if (invalid.length > 0 || !arr.length) {
      ctx.addIssue({
        code: 'custom',
        message: 'One or more valid URLs is required',
        path: [],
      });
    }
  }),
});

export type ProductFormSchemaCopy = z.ZodObject<
  {
    title: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    categoryId: z.ZodNumber;
    images: z.ZodArray<z.ZodString>;
  },
  z.core.$strip
>;

export type ProductFormType = z.infer<typeof ProductFormSchema>;
