import { useId, forwardRef } from 'react';
import type { BaseInputProps } from './models';

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ type = 'text', label, error, className, suffix, ...props }, ref) => {
    const id = useId();
    return (
      <div className={`flex flex-col gap-2 items-start ${className || ''}`}>
        {label && <label htmlFor={id}>{label}</label>}
        <div className='relative'>
          <input
            id={id}
            ref={ref}
            type={type}
            {...props}
            className='w-full bg-none text-gray-200 px-5 py-3 pr-10 transition-all rounded-4xl border border-gray-600 outline-none focus:border-amber-500'
          />
          {suffix && (
            <div className='absolute right-4 top-1/2 -translate-y-1/2 flex items-center'>
              {suffix}
            </div>
          )}
        </div>
        {error && <span className='text-red-600 font-semibold text-sm'>{error}</span>}
      </div>
    );
  }
);
