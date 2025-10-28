import z from 'zod';

export const SignInFormSchema = z.object({
  email: z.email(),
  password: z.string().min(1, { message: 'Field cannot be empty' }),
});

export type SignInFormType = z.infer<typeof SignInFormSchema>;
