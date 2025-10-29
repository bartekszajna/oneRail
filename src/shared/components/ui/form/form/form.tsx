import { type FormProps } from './models';

export function Form({ children, onSubmit, isSubmitting }: FormProps) {
  return (
    <form
      className='w-[80%] mx-auto md:w-[600px] bg-[var(--dark-bg)] flex flex-col gap-2 sm:gap-6 px-8 py-12 sm:px-12 rounded-2xl shadow-2xl items-stretch'
      onSubmit={onSubmit}
    >
      {children}
      <button
        type='submit'
        disabled={isSubmitting}
        className='px-8 py-2 md:px-12 md:py-3 rounded-4xl bg-gray-200 text-gray-900 font-bold hover:cursor-pointer outline-none focus:bg-amber-500 hover:bg-amber-500 hover:text-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-all active:scale-95'
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
