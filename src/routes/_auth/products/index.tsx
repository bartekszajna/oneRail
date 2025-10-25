import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
// import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../utils/env';

export const Route = createFileRoute('/_auth/products/')({
  component: Products,
});

function Products() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(API_BASE_URL + '/products?offset=0&limit=10');
      return await res.json();
    },
  });
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<Error | null>();

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=10')
  //     .then((res) => {
  //       if (!res.ok) {
  //         setError(new Error('TEST'));
  //         setIsLoading(false);
  //         return;
  //       } else {
  //         return res.json();
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setData(data);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (isLoading) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd: {(error as Error).message}</p>;

  return (
    <ul>
      {data?.map((p: { id: string; title: string; images: string[] }) => (
        <Link key={p.id} to='/products/$productId' params={{ productId: p.id }}>
          <li>
            <p>{p.title}</p>
            <img src={p.images[0]} className='w-2xs' />
          </li>
        </Link>
      ))}
    </ul>
  );
}
