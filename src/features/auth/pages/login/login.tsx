// import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { TextField } from '@/shared/components/ui/form';
import { PasswordField } from '../../../../shared/components/ui/form/password-field';
import { type SignInFormType } from './models';
import { useMethods } from './hooks';
import { Link } from 'react-router-dom';

export const Login = () => {
  const { handleSubmit, submitHandler, control, isSubmitting, errors } = useMethods();

  return (
    <main className='min-h-screen flex flex-col gap-7 justify-center items-center'>
      <h1 className='mb-6'>oneRail e-commerce</h1>
      <form
        className='bg-[var(--dark-bg)] backdrop-blur-xs flex flex-col gap-8 px-8 py-8 sm:px-12 mx-8 rounded-2xl shadow-xl items-center'
        onSubmit={handleSubmit(submitHandler)}
      >
        <h2 className='text-2xl font-bold'>Sign in</h2>
        <TextField<SignInFormType> label='E-mail' name='email' control={control} />
        <PasswordField<SignInFormType> label='Password' name='password' control={control} />
        <button
          type='submit'
          disabled={isSubmitting}
          className='px-8 py-2 sm:px-12 sm:py-3 rounded-full bg-gray-300 text-gray-900 font-bold hover:cursor-pointer outline-none focus:bg-amber-500 hover:bg-amber-500 hover:text-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-all active:scale-95'
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <Link to='/products'>GO TO PRODUCTS</Link>
        {errors.root && (
          <span className='text-red-600 font-semibold text-sm'>{errors.root.message}</span>
        )}
      </form>
    </main>
  );
};
