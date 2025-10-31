// import { useQuery } from '@tanstack/react-query';

// import { useEffect, useState } from 'react';
// import { API_BASE_URL } from '../../../../shared/utils/env';
import { API_BASE_URL } from '@/shared/utils/env';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender } from '@tanstack/react-table';
import type { Product } from '../../api/models';

const columns = [
  {
    accessorKey: 'title',
    header: "Title",
    cell: (props) => props.getValue()
  },
  {
    accessorKey: 'price',
    header: "Price",
    cell: (props) => props.getValue()
  },
  {
    accessorKey: 'category.name',
    header: "Category",
    cell: (props) => {
      console.log(props.getValue())
      return props.getValue()
    }
  },
]


export const Products = () => {

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(API_BASE_URL + `/products`);
      return await res.json();
    },
  });

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

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
      <div className='flex justify-between'>
        <Link
          to='new'
          className='bg-gray-200 px-3 py-1 text-xs md:px-6 md:py-2 rounded-full transition-all font-semibold text-gray-900 hover:bg-amber-500 hover:text-gray-200 transition active:scale-95'
        >
          Add new
        </Link>
      </div>

      <table>
        <thead>

          {table.getHeaderGroups().map(headerGroup => (<tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (<th key={header.id}>{header.column.columnDef.header}</th>))}
          </tr>))}

        </thead>
        <tbody>
            {table.getRowModel().rows.map(row => (<tr key={row.id}>{row.getVisibleCells().map(cell =>(<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>))}</tr>))}
        </tbody>
      </table>
    </main>
  );
};
