
import { API_BASE_URL } from '@/shared/utils/env';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo } from 'react';
import type { Product } from '../../api/models';


export const Products = () => {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || 1);
  const limit = Number(params.get("limit") || 10);
  const sort = params.get("sort") || "title";
  const order = params.get("order") === "desc";
  const title = params.get("title") || "";
  const category = params.get("category") || "";
  const price_min = params.get("price_min") || "";
  const price_max = params.get("price_max") || "";

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: (info) => (
          <div className="font-medium">{info.getValue<string>()}</div>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => `$${info.getValue<number>().toFixed(2)}`,
      },
      {
        accessorKey: "category.name",
        header: "Category",
      },
    ],
    []
  );

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['products', { title, category, price_min, price_max, page, limit }],
    queryFn: async () => {
      const res = await fetch(API_BASE_URL + '/products?offset=0&limit=10');
      return await res.json();
    },
  });

   const table = useReactTable({
    data,
    columns,
    state: {
      sorting: [{ id: sort, desc: order }],
    },
    onSortingChange: (updater) => {
      const newSort = updater[0];
      setParams((prev) => {
        prev.set("sort", newSort?.id || "title");
        prev.set("order", newSort?.desc ? "desc" : "asc");
        return prev;
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(50 / limit), // rough estimate
  });


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
      <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Products</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
        <input
          className="border rounded p-2"
          placeholder="Search title..."
          value={title}
          onChange={(e) => {
            setParams((prev) => {
              prev.set("title", e.target.value);
              prev.set("page", "1");
              return prev;
            });
          }}
        />
        <input
          className="border rounded p-2"
          placeholder="Min price"
          value={price_min}
          onChange={(e) => {
            setParams((prev) => {
              prev.set("price_min", e.target.value);
              return prev;
            });
          }}
        />
        <input
          className="border rounded p-2"
          placeholder="Max price"
          value={price_max}
          onChange={(e) => {
            setParams((prev) => {
              prev.set("price_max", e.target.value);
              return prev;
            });
          }}
        />
        <input
          className="border rounded p-2"
          placeholder="Category ID"
          value={category}
          onChange={(e) => {
            setParams((prev) => {
              prev.set("category", e.target.value);
              return prev;
            });
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-sm text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setParams({ ...Object.fromEntries(params), page: String(page - 1) })}
        >
          Prev
        </button>
        <span className="text-sm text-gray-600">
          Page {page}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => setParams({ ...Object.fromEntries(params), page: String(page + 1) })}
        >
          Next
        </button>
      </div>
    </div>

    </main>
  );
};
