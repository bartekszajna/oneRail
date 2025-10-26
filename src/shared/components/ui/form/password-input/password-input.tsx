import { useState } from 'react';
import { BaseInput } from '@shared/components/ui/form';
import type { PasswordInputProps } from './models';
import { Eye, EyeOff } from 'lucide-react';

export const PasswordInput = ({ error, ...props }: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <BaseInput
      error={error}
      {...props}
      type={visible ? 'text' : 'password'}
      suffix={
        <button
          className='outline-none focus:text-amber-500 size-4 sm:size-6'
          type='button'
          onClick={() => setVisible(!visible)}
        >
          {visible ? <EyeOff className='size-full' /> : <Eye className='size-full' />}
        </button>
      }
    />
  );
};
