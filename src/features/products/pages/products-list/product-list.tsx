// import { useQuery } from '@tanstack/react-query';

// import { useEffect, useState } from 'react';
// import { API_BASE_URL } from '../../../../shared/utils/env';
import { API_BASE_URL } from '@/shared/utils/env';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export const Products = () => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(API_BASE_URL + '/products?offset=0&limit=10');
      return await res.json();
    },
  });

  // console.log('1');
  // const data = useLoaderData();
  // console.log('2');

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

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error...</p>;
  }

  return (
    <main>
      <div>
        <Link to='/login'>GO TO LOGIN</Link>
      </div>
      <ul>
        {data?.map((p: { id: string; title: string; images: string[] }) => (
          <Link key={p.id} to={`/products/${p.id}`}>
            <li>
              <p>{p.title}</p>
              <img src={p.images[0]} className='w-2xs' />
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
};
