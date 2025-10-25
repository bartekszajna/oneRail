import { useState } from 'react';
import { BaseInput } from '../BaseInput';
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
          className='outline-none focus:text-amber-500'
          type='button'
          onClick={() => setVisible(!visible)}
        >
          {visible ? <EyeOff /> : <Eye />}
        </button>
      }
    />
  );
};
