import { Outlet, useNavigation } from 'react-router-dom';
import { useIsFetching } from '@tanstack/react-query';
import Loader from '../../ui/loader/loader';
import { Navigation } from '../../navigation';

export function AuthenticatedLayout() {
  const fetchingCount = useIsFetching();
  const navigation = useNavigation();

  const isLoading =
    navigation.state === 'loading' || navigation.state === 'submitting' || fetchingCount > 0;

  return (
    <>
    <Navigation />
    <main className='pt-24 px-8 pb-8 relative'>
        <Loader isLoading={isLoading} />
        <Outlet />
    </main>
    </>
  );
}
