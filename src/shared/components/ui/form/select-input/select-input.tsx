import { forwardRef, useId } from 'react';
import { type SelectInputProps } from './models';
import { ChevronDown } from 'lucide-react';

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ label, options, error, ...props }, ref) => {
    //   const [isOpen, setIsOpen] = useState(false);
    const id = useId();

    return (
      <div className='flex flex-col gap-2 items-stretch'>
        {label && (
          <label className='w-fit' htmlFor={id}>
            {label}
          </label>
        )}
        <div className='relative'>
          <select
            defaultValue={''}
            id={id}
            ref={ref}
            {...props}
            //   onClick={() => setIsOpen((prev) => !prev)}

            className='appearance-none w-full bg-transparent border rounded-full text-xs sm:text-base px-4 py-2 sm:px-5 sm:py-3 border-gray-600 pr-10 text-gray-200 focus:border-amber-500 outline-none'
          >
            <option value='' disabled hidden>
              Please Choose...
            </option>
            {options?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>

          <button
            type='button'
            tabIndex={-1}
            className='absolute outline-none pointer-events-none right-4 top-1/2 -translate-y-1/2'
          >
            <ChevronDown />
            {/* {isOpen ? <ChevronUp /> : <ChevronDown />} */}
          </button>
        </div>
        {error && <span className='text-red-600 font-medium text-sm'>{error}</span>}
      </div>
    );
  }
);
