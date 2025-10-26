import type { Categories } from '@/features/products/api/models';
import type { Control, FieldValues, Path } from 'react-hook-form';

// export type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
//   type?: string;
//   label?: string;
//   error?: string;
//   suffix?: React.ReactNode;
// };

export type InputFieldProps<T extends FieldValues> = React.InputHTMLAttributes<HTMLInputElement> & {
  name: Path<T>;
  control: Control<T>;
  label?: string;
};

export type TextAreaFieldProps<T extends FieldValues> =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: Path<T>;
    control: Control<T>;
    label?: string;
  };

export type SelectFieldProps<T extends FieldValues> =
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    options: Categories;
  };

export type MultiValueFieldProps<T extends FieldValues> = InputFieldProps<T> & {
  values: string[];
};
