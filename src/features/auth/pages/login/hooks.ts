import { useForm, type SubmitHandler } from 'react-hook-form';
import { SignInFormSchema, type SignInFormType } from './models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '@/shared/utils/env';

export const useMethods = () => {
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(SignInFormSchema),
  });

  const navigate = useNavigate();

  const submitHandler: SubmitHandler<SignInFormType> = async (data) => {
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
    navigate('/products');
  };

  return {
    handleSubmit,
    submitHandler,
    control,
    isSubmitting,
    errors,
  };
};
