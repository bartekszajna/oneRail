import { useId, forwardRef } from 'react';
import type { TextAreaInputProps } from './models';

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ label, error, className, ...props }, ref) => {
    const id = useId();
    return (
      <div className='flex flex-col gap-2 items-stretch'>
        {label && (
          <label className='w-fit' htmlFor={id}>
            {label}
          </label>
        )}
        <div className='relative'>
          <textarea
            id={id}
            ref={ref}
            {...props}
            rows={7}
            className={`${className || ''} w-full bg-none text-gray-200 text-xs sm:text-base px-4 py-2 sm:px-5 sm:py-3 pr-10 transition-all rounded-2xl border border-gray-600 outline-none focus:border-amber-500`}
          />
        </div>
        <span className='text-red-600 font-medium text-sm min-h-5'>{error}</span>
      </div>
    );
  }
);
