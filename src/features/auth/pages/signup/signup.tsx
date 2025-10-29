import { TrainFront } from 'lucide-react';
import { SignupForm } from '../../components/signup-form';

export const Signup = () => {
  return (
    <main className='min-h-screen flex flex-col gap-2 justify-center items-center my-16'>
      <TrainFront className='size-12 text-amber-500' />
      <h1 className='text-4xl font-bold text-center mb-12'>oneRail e-commerce</h1>
      <h2 className='text-2xl font-semibold text-center mb-6'>Create a new account</h2>
      <SignupForm />
    </main>
  );
};
