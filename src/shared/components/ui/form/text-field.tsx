import { BaseInput } from '@/shared/components/ui/form';
import type { InputFieldProps } from '@shared/components/ui/form';
import { useController, type FieldValues } from 'react-hook-form';

export function TextField<T extends FieldValues>({ name, control, ...props }: InputFieldProps<T>) {
  const { field, fieldState } = useController<T>({ name, control });

  return <BaseInput {...field} {...props} error={fieldState.error?.message} />;
}
