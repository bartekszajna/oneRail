import { PasswordInput } from '@/shared/components/ui/form';
import { useController, type FieldValues } from 'react-hook-form';
import type { InputFieldProps } from '@shared/components/ui/form';

export function PasswordField<T extends FieldValues>({
  name,
  control,
  ...rest
}: InputFieldProps<T>) {
  const { field, fieldState } = useController({ name, control });

  return <PasswordInput {...field} {...rest} error={fieldState.error?.message} />;
}
