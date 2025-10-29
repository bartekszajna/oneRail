import { useForm, type SubmitHandler } from 'react-hook-form';
import { SignupFormSchema, type SignupFormType } from './models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useNavigation } from 'react-router-dom';
import { signUp } from '../../api/api';

export const useMethods = () => {
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<SignupFormType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repeat_password: '',
      avatar: '',
    },
    resolver: zodResolver(SignupFormSchema),
  });

  const navigate = useNavigate();
  const navigation = useNavigation();

  const isLoading =
    navigation.state === 'loading' || navigation.state === 'submitting' || isFormSubmitting;

  const submitHandler: SubmitHandler<SignupFormType> = async (data) => {
    try {
      await signUp(data);
      navigate('/login');
    } catch {
      setError('root', {
        message: 'New user could not be created',
      });
    }
  };

  return {
    handleSubmit,
    submitHandler,
    control,
    isSubmitting: isLoading,
    errors,
  };
};
