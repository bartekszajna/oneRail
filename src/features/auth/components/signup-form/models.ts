import { isValidUrl } from '@/shared/utils/isValidURL';
import z from 'zod';

export const SignupFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Field cannot be empty' }),
    email: z.email(),
    password: z.string().min(1, { message: 'Field cannot be empty' }),
    repeat_password: z.string().min(1, { message: 'Field cannot be empty' }),
    avatar: z.string().superRefine((value, ctx) => {
      if (!isValidUrl(value)) {
        ctx.addIssue({
          code: 'custom',
          message: 'The valid URLs is required',
          path: [],
        });
      }
    }),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: 'Passwords must match',
    path: ['repeat_password'],
  });

export type SignupFormType = z.infer<typeof SignupFormSchema>;
