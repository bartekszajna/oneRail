import type { FormEventHandler, PropsWithChildren } from 'react';

export type FormProps = PropsWithChildren & {
  onSubmit: FormEventHandler<HTMLFormElement>;
  isSubmitting: boolean;
};
