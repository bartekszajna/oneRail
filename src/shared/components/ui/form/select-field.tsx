import { SelectInput } from '@/shared/components/ui/form';
import type { SelectFieldProps } from '@shared/components/ui/form';
import { useController, type FieldValues } from 'react-hook-form';

export function SelectField<T extends FieldValues>({
  name,
  options,
  control,
  ...props
}: SelectFieldProps<T>) {
  const { field, fieldState } = useController({ name, control });

  return <SelectInput options={options} {...field} {...props} error={fieldState.error?.message} />;
}
