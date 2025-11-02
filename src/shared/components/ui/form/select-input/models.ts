export type SelectOption = {
  value: string | number;
  label: string;
};

export type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: SelectOption[];
};
