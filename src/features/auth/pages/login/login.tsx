import { LoginForm } from '../../components/login-form/login-form';

export const Login = () => {
  return (
    <main className='min-h-screen flex flex-col gap-7 justify-center items-center'>
      <h1 className='text-2xl font-bold text-center'>Sign in</h1>
      <LoginForm />
    </main>
  );
};
