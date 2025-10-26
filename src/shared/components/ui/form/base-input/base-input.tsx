import { useId, forwardRef } from 'react';
import type { BaseInputProps } from './models';

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ type = 'text', label, error, className, suffix, ...props }, ref) => {
    const id = useId();

    return (
      <div className='flex flex-col gap-2 items-stretch'>
        {label && (
          <label className='w-fit' htmlFor={id}>
            {label}
          </label>
        )}
        <div className='relative'>
          <input
            id={id}
            ref={ref}
            type={type}
            {...props}
            className={`${className || ''} w-full bg-none text-gray-200 text-xs sm:text-base px-4 py-2 sm:px-5 sm:py-3 pr-10 transition-all rounded-full border border-gray-600 outline-none focus:border-amber-500`}
          />
          {suffix && (
            <div className='absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex items-center'>
              {suffix}
            </div>
          )}
        </div>
        <span className='text-red-600 font-medium text-sm min-h-5'>{error}</span>
      </div>
    );
  }
);
