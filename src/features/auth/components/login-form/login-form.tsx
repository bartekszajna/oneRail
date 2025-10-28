import { Form } from '@/shared/components/ui/form/form';
import { Link } from 'react-router-dom';
import { TextField } from '@/shared/components/ui/form';
import { PasswordField } from '../../../../shared/components/ui/form/password-field';
import { useMethods } from './hooks';
import { type SignInFormType } from './models';

export const LoginForm = () => {
  const { handleSubmit, submitHandler, control, isSubmitting, errors } = useMethods();

  return (
    <Form onSubmit={handleSubmit(submitHandler)} isSubmitting={isSubmitting}>
      <TextField<SignInFormType> label='E-mail' name='email' control={control} />
      <PasswordField<SignInFormType> label='Password' name='password' control={control} />
      <Link to='/products'>GO TO PRODUCTS</Link>
      {errors.root && (
        <span className='text-red-600 font-semibold text-sm'>{errors.root.message}</span>
      )}
    </Form>
  );
};
