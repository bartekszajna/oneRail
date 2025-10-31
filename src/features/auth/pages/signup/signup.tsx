import { TrainFront } from 'lucide-react';
import { SignupForm } from '../../components/signup-form';
import { Link } from 'react-router-dom';

export const Signup = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <TrainFront className='size-12 text-amber-500 mb-2' />
      <h1 className='text-4xl font-bold text-center mb-14'>oneRail e-commerce</h1>
      <h2 className='text-2xl font-semibold text-center mb-8'>Create a new account</h2>
      <SignupForm />
      <div className='mt-6 text-base flex flex-col items-center'>
        <p>Already have an account?</p>
        <Link to='/login' className='font-semibold hover:text-amber-500'>
          Log in
        </Link>
      </div>


    </div>
  );
};
