import { useState } from 'react';
import { BaseInput } from '@shared/components/ui/form';

import type { MultiValueFieldProps } from '@shared/components/ui/form';

import { useController, type FieldValues } from 'react-hook-form';
import { Trash } from 'lucide-react';

export function MultiValueField<T extends FieldValues>({
  name,
  label,
  control,
  ...props
}: MultiValueFieldProps<T>) {
  const [input, setInput] = useState('');
  const {
    field: { value, onChange, ...fieldRest },
    fieldState,
  } = useController({ name, control });

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInput('');
    }
  };

  const handleRemove = (url: string) => {
    onChange(value.filter((v: string) => v !== url));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <BaseInput
        {...props}
        {...fieldRest}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        label={label}
        error={fieldState.error?.message}
      />
      <h4>URLs list:</h4>
      <ul className='mt-2'>
        {value?.map((url: string) => (
          <li
            key={url}
            className='w-full flex text-sm bg-[var(--light-bg)] rounded-full px-3 py-2 items-center justify-between gap-4 mb-4'
          >
            <span className='w-full truncate'>{url}</span>
            <button
              type='button'
              className='hover:cursor-pointer hover:text-amber-500 '
              onClick={() => handleRemove(url)}
            >
              <Trash className='size-4' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
