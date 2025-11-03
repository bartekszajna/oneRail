import { BaseInput, SelectInput } from "@/shared/components/ui/form";
import { ChevronLeft, ChevronRight, Settings, Trash, ReceiptText, ChevronUp, ChevronDown } from 'lucide-react';
import { limitOptions } from './consts';
import { Link } from "react-router-dom";
import type { ProductsTableProps } from "./models";

export const ProductsTable = ({data, limit, offset, titleSort, priceSort, titleFilter, categoryFilter, minPriceFilter, maxPriceFilter, titleFilterHandler, categoryFilterHandler, minPriceFilterHandler, maxPriceFilterHandler, limitSelectHandler, previousPageHandler, nextPageHandler, deleteProductHandler, titleSortHandler, priceSortHandler}:ProductsTableProps) => {
    return <>
        <div>
        <h3 className="mb-6 font-bold text-amber-500">Filters:</h3>
        <div className="block md:flex gap-2 mb-6">
          <BaseInput label='Title' value={titleFilter} onChange={titleFilterHandler}/>
          <BaseInput label='Category' value={categoryFilter} onChange={categoryFilterHandler}/>
          <BaseInput label='Min price' value={minPriceFilter} onChange={minPriceFilterHandler}/>
          <BaseInput label='Max price' value={maxPriceFilter} onChange={maxPriceFilterHandler}/>
          <SelectInput label="Results per page" options={limitOptions} value={limit} onChange={limitSelectHandler}/>
        </div>
      </div>
      
      <div className="shadow-2xl rounded-2xl bg-[var(--dark-bg)] p-6 mb-6">
      <table className="table-fixed w-full text-left border-separate border-spacing-y-3">
        <thead className="">
          <tr className="text-center text-amber-500">
            <th className="p-2 pb-4 w-[70px]">Image</th>
            <th onClick={titleSortHandler} className="p-2 pb-4"><p className="flex items-center justify-center">Title {titleSort === 'asc' ? <ChevronUp /> : titleSort === 'desc' ? <ChevronDown /> : ""}</p></th>
            <th className="p-2 pb-4 text-center w-[120px]">Category</th>
            <th onClick={priceSortHandler} className="p-2 pb-4 w-[100px]"><p className="flex items-center justify-center">Price {priceSort === 'asc' ? <ChevronUp /> : priceSort === 'desc' ? <ChevronDown /> : ""}</p></th>
            <th className="w-[10px]"></th>
            <th className="p-2 pb-4 w-[120px] text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="mt-8">
          {data.map((p) => (
            <tr key={p?.id} className="bg-[var(--light-bg)]">
              <td className="p-2 mb-8 rounded-l-2xl"><img className="mr-8 rounded-xl size-full" src={p?.images?.[0]} alt={p?.title} /></td>
              <td className="p-2 w-full">{p?.title}</td>
              <td className="p-2 w-full text-center">{p?.category.name}</td>
              <td className="p-2 text-center rounded-r-2xl">{p?.price}$</td>
              <td className="bg-[var(--dark-bg)]"></td>
              <td className="p-2 text-center rounded-2xl">
                <div className="flex h-full items-center justify-evenly">
                  <Link className=' color-gray-200 p-1 rounded-full transition-all font-semibold hover:text-amber-500 transition active:scale-95' to={`/products/${p?.id}`}><ReceiptText className="size-5"/></Link>
                  <Link className=' color-gray-200 p-1 rounded-full transition-all font-semibold hover:text-amber-500 transition active:scale-95' to={`/products/${p?.id}/edit`}><Settings className="size-5"/></Link>
                  <Trash onClick={() => deleteProductHandler(p.id)} className='color-gray-200 size-5 cursor-pointer  rounded-full transition-all  hover:text-amber-500 transition active:scale-95' to={`/products/${p?.id}/edit`}/>
                </div>
              </td>
            </tr>))
          }
        </tbody>
        
      </table>
      </div>
      <div className="mb-8 flex justify-between items-center">
        <button onClick={previousPageHandler} disabled={offset === 0} className='flex h-fit disabled:cursor-auto disabled:opacity-25 disabled:pointer-events-none justify-between items-center bg-gray-200 px-2 py-1 text-xs md:px-4 md:py-2 rounded-full transition-all font-semibold text-gray-900 hover:bg-amber-500 hover:text-gray-200 transition active:scale-95'><ChevronLeft /> Previous page </button>
        <p className="text-gray-300">Page: {(offset+limit)/limit}</p>
        <button onClick={nextPageHandler} disabled={data.length < limit} className='flex h-fit disabled:cursor-auto disabled:opacity-25 disabled:pointer-events-none cursor-pointer justify-bwtween items-center bg-gray-200 px-2 py-1 text-xs md:px-4 md:py-2 rounded-full transition-all font-semibold text-gray-900 hover:bg-amber-500 hover:text-gray-200 transition active:scale-95'>Next page <ChevronRight /></button>
      </div>
    </>
}