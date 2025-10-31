import { LogOut, Store } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteAccessToken, deleteRefreshToken } from '@/shared/utils/authStorage';

export const Navigation = () => {
    const navigate = useNavigate();

    return <nav className='bg-[var(--dark-bg)] text-white fixed p-4 w-full z-10 flex flex-row gap-4 h-[70px] items-center justify-between shadow-xl'>
        <Link
          to='/products'
          className='font-bold text-2xl flex gap-2 p-2 items-center outline-none hover:text-amber-500 focus-visible:text-amber-500'
        >
          <Store />
          <span className='hidden sm:inline'>e-commerce</span>
        </Link>
        <Link
          onClick={() => {
            deleteAccessToken();
            deleteRefreshToken();
            navigate('/login');
          }}
          to='/login'
          className='flex items-center justify-center gap-2 p-2 outline-none hover:text-amber-500 focus-visible:text-amber-500'
        >
          <LogOut />
          <span className='hidden sm:inline'>Sign out</span>
        </Link>
      </nav>
}