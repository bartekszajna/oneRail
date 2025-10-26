import { TextAreaInput } from '@/shared/components/ui/form';
import type { TextAreaFieldProps } from '@shared/components/ui/form';
import { useController, type FieldValues } from 'react-hook-form';

export function TextAreaField<T extends FieldValues>({
  name,
  control,
  ...rest
}: TextAreaFieldProps<T>) {
  const { field, fieldState } = useController({ name, control });

  return (
    <TextAreaInput {...field} className='resize-none' {...rest} error={fieldState.error?.message} />
  );
}
