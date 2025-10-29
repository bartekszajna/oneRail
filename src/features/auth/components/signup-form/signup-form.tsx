import { Form } from '@/shared/components/ui/form/form';
import { TextField } from '@/shared/components/ui/form';
import { PasswordField } from '../../../../shared/components/ui/form/password-field';
import { useMethods } from './hooks';
import { type SignupFormType } from './models';

export const SignupForm = () => {
  const { handleSubmit, submitHandler, control, isSubmitting, errors } = useMethods();

  return (
    <Form onSubmit={handleSubmit(submitHandler)} isSubmitting={isSubmitting}>
      <TextField<SignupFormType> label='Name' name='name' control={control} />
      <TextField<SignupFormType> label='E-mail' name='email' control={control} />
      <PasswordField<SignupFormType> label='Password' name='password' control={control} />
      <PasswordField<SignupFormType>
        label='Repeat password'
        name='repeat_password'
        control={control}
      />
      <TextField<SignupFormType> label='Avatar' name='avatar' control={control} />
      {errors.root && (
        <span className='text-red-600 font-semibold text-sm'>{errors.root.message}</span>
      )}
    </Form>
  );
};
