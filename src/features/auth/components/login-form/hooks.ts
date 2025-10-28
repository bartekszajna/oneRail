import { useForm, type SubmitHandler } from 'react-hook-form';
import { SignInFormSchema, type SignInFormType } from './models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { SignIn } from '../../api/api';
import { setAccessToken, setRefreshToken } from '@/shared/utils/authStorage';

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
    try {
      const res = await SignIn(data);
      setAccessToken(res.access_token);
      setRefreshToken(res.refresh_token);

      navigate('/products');
    } catch {
      setError('root', {
        message: 'You could not be authorized',
      });
    }
  };

  return {
    handleSubmit,
    submitHandler,
    control,
    isSubmitting,
    errors,
  };
};
