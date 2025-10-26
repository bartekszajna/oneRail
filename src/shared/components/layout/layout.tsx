import { LogOut } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <main>
      <nav className='bg-[var(--dark-bg)] text-white fixed p-4 w-full z-10 flex flex-row gap-4 h-[70px] items-center justify-between shadow-xl'>
        <Link
          to='/products'
          className='font-bold text-2xl outline-none hover:text-amber-500 focus-visible:text-amber-500'
        >
          oneRail e-commerce
        </Link>
        <Link
          to='/login'
          className='flex items-center justify-center gap-2 p-2 outline-none hover:text-amber-500 focus-visible:text-amber-500'
        >
          <LogOut />
          Sign out
        </Link>
      </nav>
      <section className='pt-24'>
        <Outlet />
      </section>
    </main>
  );
};
