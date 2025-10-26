export type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
  label?: string;
  error?: string;
  suffix?: React.ReactNode;
};
