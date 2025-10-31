// import { useQuery } from '@tanstack/react-query';

// import { useEffect, useState } from 'react';
// import { API_BASE_URL } from '../../../../shared/utils/env';
import { API_BASE_URL } from '@/shared/utils/env';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import type { Product } from '../../api/models';
import { ChevronLeft, ChevronRight, Settings, Trash, ReceiptText } from 'lucide-react';

export const Products = () => {
  const [limit, setLimit] = useState(10)
  const [modalVisible, setModalVisible] = useState(false)
  const [offset, setOffset] = useState(0)
  const { data, isLoading, isFetching, error } = useQuery<Product[]>({
    queryKey: ['products', limit, offset],
    queryFn: async () => {
      const res = await fetch(API_BASE_URL + `/products?offset=${offset}&limit=${limit}&price_min=500`);
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

  // if (isLoading || isFetching) {
  //   return <p>Loading...</p>;
  // }
  // if (error) {
  //   return <p>Error...</p>;
  // }

  return (
    <main>
      <div className='flex justify-between'>
        <Link
          to='new'
          className='bg-gray-200 px-3 py-1 text-xs md:px-6 md:py-2 rounded-full transition-all font-semibold text-gray-900 hover:bg-amber-500 hover:text-gray-200 transition active:scale-95'
        >
          Add new
        </Link>
      </div>
      
      <div className="shadow-2xl rounded-2xl bg-[var(--dark-bg)] p-6 mb-6">
      <table className="table-fixed w-full text-left border-separate border-spacing-y-3">
        <thead className="">
          <tr className="text-center text-amber-500">
            <th className="p-2 pb-4 w-[70px]">Image</th>
            <th className="p-2 pb-4">Title</th>
            <th className="p-2 pb-4 w-[50px]">Price</th>
            <th className="w-[10px]"></th>
            <th className="p-2 pb-4 w-[120px] text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="mt-8">
          {data?.map((p) => (
            <tr key={p?.id} className="bg-[var(--light-bg)]">
              <td className="p-2 mb-8 rounded-l-2xl"><img className="mr-8 rounded-xl size-full" src={p?.images?.[0]} alt={p?.title} /></td>
              <td className="p-2 w-full">{p?.title}</td>
              <td className="p-2 text-center rounded-r-2xl">{p?.price}$</td>
              <td className="bg-[var(--dark-bg)]"></td>
              {/* <td className="w-1/2">{p?.description}</td> */}
              <td className="p-2 text-center rounded-2xl">
                <div className="flex h-full items-center justify-evenly">
                  <Link className=' color-gray-200 p-1 rounded-full transition-all font-semibold hover:text-amber-500 transition active:scale-95' to={`/products/${p?.id}`}><ReceiptText className="size-5"/></Link>
                  <Link className=' color-gray-200 p-1 rounded-full transition-all font-semibold hover:text-amber-500 transition active:scale-95' to={`/products/${p?.id}/edit`}><Settings className="size-5"/></Link>
                  <Trash onClick={()=>setModalVisible(true)} className=' color-gray-200 size-5 cursor-pointer  rounded-full transition-all  hover:text-amber-500 transition active:scale-95' to={`/products/${p?.id}/edit`}/>
                </div>
              </td>
            </tr>))
          }
        </tbody>
        
      </table>
      </div>
      <div className="mb-8 flex justify-between">
        <button disabled={offset === 0} className='flex h-fit disabled:cursor-auto disabled:opacity-25 disabled:pointer-events-none justify-between items-center bg-gray-200 px-2 py-1 text-xs md:px-4 md:py-2 rounded-full transition-all font-semibold text-gray-900 hover:bg-amber-500 hover:text-gray-200 transition active:scale-95' onClick={()=>setOffset(prev => prev-limit)}><ChevronLeft /> Previous page </button>
        <button disabled={data?.length < limit} className='flex h-fit disabled:cursor-auto disabled:opacity-25 disabled:pointer-events-none cursor-pointer justify-bwtween items-center bg-gray-200 px-2 py-1 text-xs md:px-4 md:py-2 rounded-full transition-all font-semibold text-gray-900 hover:bg-amber-500 hover:text-gray-200 transition active:scale-95' onClick={()=>setOffset(prev => prev+limit)}>Next page <ChevronRight /></button>
      </div>
      { modalVisible && <div onClick={()=>{setModalVisible(false)}}
          className={`fixed top-0 left-0 size-full z-9999 transition-opacity duration-300 flex justify-center items-center bg-black/30 backdrop-blur-sm`}
        >
          <div onClick={(e) => e.stopPropagation()} className="rounded-2xl shadow-2xl bg-[var(--dark-bg)] text-center p-8">
            <h3 className="my-8 font-bold text-2xl text-amber-500">Are you sure?</h3>
            <p className="mb-12">This action is irreversible.</p>
            <div className="flex justify-between">
              <button onClick={()=>setModalVisible(false)} className='border border-gray-200 px-2 py-1 cursor-pointer text-xs md:px-4 md:py-2 rounded-full transition-all font-semibold text-gray-200 hover:border-amber-500 hover:text-amber-500 transition active:scale-95'>Close</button>
              <button onClick={()=>setModalVisible(false)} className='border border-gray-200 px-2 py-1 cursor-pointer text-xs md:px-4 md:py-2 rounded-full transition-all font-semibold text-gray-200 hover:border-amber-500 hover:text-amber-500 transition active:scale-95'>Close</button>
            </div>
          </div>
        </div>
      }
    </main>
  );
};
