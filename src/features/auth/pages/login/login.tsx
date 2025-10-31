import { TrainFront } from 'lucide-react';
import { LoginForm } from '../../components/login-form';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <TrainFront className='size-12 text-amber-500 mb-2' />
      <h1 className='text-4xl font-bold text-center mb-14'>oneRail e-commerce</h1>
      <h2 className='text-2xl font-semibold text-center mb-8'>Sign in</h2>
      <LoginForm />
      <div className='mt-6 text-base flex flex-col items-center'>
        <p>Do not have an account yet?</p>
        <Link to='/signup' className='font-semibold hover:text-amber-500'>
          Sign up
        </Link>
      </div>
    </div>
  );
};
