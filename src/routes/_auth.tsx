import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const isLogged = true;

    if (!isLogged) {
      throw redirect({ to: '/login' });
    }
  },
  component: ProtectedRoute,
});

function ProtectedRoute() {
  return (
    <main>
      <nav className='bg-[--dark-bg] text-white border-b border-white fixed p-4 w-full z-10 flex flex-row gap-4 h-[70px] items-center justify-between shadow-xl'>
        <Link to='/products' className='[&.active]:font-bold'>
          oneRail
        </Link>
      </nav>
      <section className='pt-24'>
        <Outlet />
      </section>
    </main>
  );
}
