import { LoaderCircle } from 'lucide-react';

type LoaderProps = {
  isLoading: boolean;
};

export default function Loader({ isLoading }: LoaderProps) {
  return (
    <div
      className={`fixed top-0 left-0 size-full z-9999 transition-opacity duration-300 flex justify-center items-center bg-black/30 backdrop-blur-sm ${isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <LoaderCircle className='animate-spin  w-10 h-10' />
    </div>
  );
}
