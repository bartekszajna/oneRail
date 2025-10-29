import { TrainFront } from 'lucide-react';
import { LoginForm } from '../../components/login-form';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <main className='min-h-screen flex flex-col gap-2 justify-center items-center'>
      <TrainFront className='size-12 text-amber-500' />
      <h1 className='text-4xl font-bold text-center mb-12'>oneRail e-commerce</h1>
      <h2 className='text-2xl font-semibold text-center mb-6'>Sign in</h2>
      <LoginForm />
      <p className='mt-4 text-base'>
        Do not have an account yet?{' '}
        <Link to='/signup' className='font-semibold hover:text-amber-500'>
          Sign up
        </Link>
      </p>
    </main>
  );
};
