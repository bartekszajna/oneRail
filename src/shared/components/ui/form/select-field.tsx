import { SelectInput } from '@/shared/components/ui/form';
import type { SelectFieldProps } from '@shared/components/ui/form';
import { useController, type FieldValues } from 'react-hook-form';
import type { SelectOption } from './select-input/models';
import { useMemo } from 'react';

export function SelectField<T extends FieldValues>({
  name,
  options,
  control,
  ...props
}: SelectFieldProps<T>) {
  const { field, fieldState } = useController({ name, control });

  const selectOptions:SelectOption[] = useMemo(() => options?.map(o => ({value: o.id, label: o.name})), [options])

  return <SelectInput options={selectOptions} {...field} {...props} error={fieldState.error?.message} />;
}
