import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  useController,
  type SubmitHandler,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { API_BASE_URL } from '../utils/env';
import { BaseInput } from '../shared/ui/form/BaseInput';
import { PasswordInput } from '../shared/ui/form/PasswordInput';

import { User } from 'lucide-react';

export const Route = createFileRoute('/login')({
  component: Login,
});

const FormSchema = z.object({
  email: z.email(),
  password: z.string().min(1, { message: 'Field cannot be empty' }),
});
type FormType = z.infer<typeof FormSchema>;

function Login() {
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    defaultValues: {
      email: 'bartek@poczta.pl',
      password: 'test1234',
    },
    resolver: zodResolver(FormSchema),
  });

  const navigate = useNavigate();

  const submitHandler: SubmitHandler<FormType> = async (data) => {
    const res = await fetch(API_BASE_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setError('root', {
        message: 'You could not be authorized',
      });
    }

    // const responseData = await res.json();
    navigate({ to: '/products', replace: true });
  };

  return (
    <main className='min-h-screen flex flex-col gap-7 justify-center items-center'>
      <h1 className='mb-6'>oneRail e-commerce</h1>
      <form
        className='bg-[--dark-bg] backdrop-blur-xs flex flex-col gap-8 px-16 py-8 rounded-2xl shadow-xl items-center'
        onSubmit={handleSubmit(submitHandler)}
      >
        <h2 className='text-2xl font-bold'>Sign in</h2>
        <EmailField<FormType> label='E-mail' name='email' control={control} />
        <PasswordField<FormType> label='Password' name='password' control={control} />
        {/* <label htmlFor='email'>E-mail</label>
        <input
          {...register('email')}
          id='email'
          className='p-2 rounded border-2 border-gray-200'
          type='text'
        />
        {errors.email && errors.email.message} */}
        {/* <label htmlFor='password'>Password</label>
        <input
          {...register('password')}
          id='password'
          className='p-2 rounded border-2 border-gray-200'
          type='password'
        />
        {errors.password && errors.password.message} */}
        <button
          type='submit'
          disabled={isSubmitting}
          className='px-12 py-3 rounded-4xl bg-gray-300 text-gray-900 font-bold hover:cursor-pointer outline-none focus:bg-amber-500 hover:bg-amber-500 hover:text-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-all active:scale-95'
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        {errors.root && (
          <span className='text-red-600 font-semibold text-sm'>{errors.root.message}</span>
        )}
      </form>
    </main>
  );
}

type InputFieldProps<T extends FieldValues> = React.InputHTMLAttributes<HTMLInputElement> & {
  name: Path<T>;
  control: Control<T>;
  label?: string;
};

function PasswordField<T extends FieldValues>({ name, control, ...rest }: InputFieldProps<T>) {
  const { field, fieldState } = useController({ name, control });

  return <PasswordInput {...field} {...rest} error={fieldState.error?.message} />;
}

function EmailField<T extends FieldValues>({ name, control, ...rest }: InputFieldProps<T>) {
  const { field, fieldState } = useController({ name, control });

  return <BaseInput {...field} {...rest} error={fieldState.error?.message} suffix={<User />} />;
}
