import { API_BASE_URL } from '@/shared/utils/env';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../api/models';
import { ChevronLeft, ChevronRight, Settings, Trash, ReceiptText, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import { deleteProduct } from '@/api/deleteProduct';
import { BaseInput, SelectInput } from '@/shared/components/ui/form';
import type { SelectOption } from '@/shared/components/ui/form/select-input/models';
import { useURLState } from './hooks';

const limitOptions:SelectOption[] = [
  {
    value: 5,
    label: "5"
  },
  {
    value: 10,
    label: "10"
  },
  {
    value: 20,
    label: "20"
  },
  {
    value: 50,
    label: "50"
  },
]

export const Products = () => {
  const {urlState, setURLParam} = useURLState();

  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false)

  const [limit, setLimit] = useState(urlState.limit || 10)
  const [offset, setOffset] = useState(urlState.offset || 0)

  const [titleSort, setTitleSort] = useState<'asc' | 'desc' | null>(null)
  const [priceSort, setPriceSort] = useState<'asc' | 'desc' | null>(null)

  const [titleFilter, setTitleFilter] = useState<string>(urlState.title || "")
  const [categoryFilter, setCategoryFilter] = useState<string>(urlState.category || "")
  const [minPriceFilter, setMinPriceFilter] = useState<string>(String(urlState.minPrice) || "")
  const [maxPriceFilter, setMaxPriceFilter] = useState<string>(String(urlState.maxPrice) || "")
  const queryClient = useQueryClient();

  function priceSortHandler(){
    setPriceSort((prev)=>{
      return prev === null ? 'asc' : prev === 'asc' ? 'desc' : null
    })
  }
  function titleSortHandler(){
    setPriceSort(null)
    setTitleSort((prev)=>{
      return prev === null ? 'asc' : prev === 'asc' ? 'desc' : null
    })
  }

  const { data } = useQuery<Product[]>({
    queryKey: ['products', limit, offset],
    placeholderData: (prev) => prev,
    queryFn: async () => {
      const res = await fetch(API_BASE_URL + `/products?offset=${offset}&limit=${limit}`);
      return await res.json();
    },
  });

  const filteredData = useMemo(()=>{
    if(!data) return [];
    return data.filter(product => {
      const matchesTitle = titleFilter ? product.title.toLowerCase().includes(titleFilter.toLowerCase()) : true;
      const matchesMinPrice = minPriceFilter ? Number(product.price) >= Number(minPriceFilter) : true;
      const matchesMaxPrice = maxPriceFilter ? Number(product.price) <= Number(maxPriceFilter) : true;
      const matchesCategory = categoryFilter ? product.category.name.toLowerCase().includes(categoryFilter.toLowerCase()) : true;

      return matchesTitle && matchesMinPrice && matchesMaxPrice && matchesCategory
    }).sort((a,b)=>{
      if(titleSort === 'asc'){
        return a.title.localeCompare(b.title, 'pl', { sensitivity: 'base' })
      }
      if(titleSort === 'desc'){
        return b.title.localeCompare(a.title, 'pl', { sensitivity: 'base' });
      }
      if(priceSort === 'asc'){
        return a.price - b.price
      }
      if(priceSort === 'desc'){
        return b.price - a.price
      } else return 0
    })


  },[data, titleFilter, minPriceFilter, maxPriceFilter, categoryFilter, titleSort, priceSort])

  const {mutate} = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      setProductIdToDelete(null);
      setModalVisible(false);
      queryClient.invalidateQueries({queryKey: ['products', limit, offset]});
    }
  })

  const openDeleteModalHandler = (id: number)=>{
    setProductIdToDelete(id);
    setModalVisible(true);
  }

  const closeDeleteModalHandler = () => {
    setProductIdToDelete(null)
    setModalVisible(false)
  }

  const productDeleteHandler = () => {
    if(productIdToDelete !== null){
      mutate(productIdToDelete)
    }
  }

  

  return (
    <section>
      <div className='flex justify-end mb-8'>
        <Link
          to='new'
          className='bg-gray-200 flex items-center gap-2 px-3 py-1 text-xs md:px-4 md:py-2 rounded-full transition-all font-semibold text-gray-900 hover:bg-amber-500 hover:text-gray-200 transition active:scale-95'
        >
          <Plus />
          Add new
        </Link>
      </div>
      <div>
        <h3 className="mb-6 font-bold text-amber-500">Filters:</h3>
        <div className="block md:flex gap-2 mb-6">
          <BaseInput label='Title' value={titleFilter} onChange={(e)=>{setTitleFilter(e.target.value); setURLParam("title", e.target.value)}}/>
          <BaseInput label='Category' value={categoryFilter} onChange={(e)=>{setCategoryFilter(e.target.value); setURLParam("category", e.target.value)}}/>
        <BaseInput label='Min price' value={minPriceFilter} onChange={(e)=>{setMinPriceFilter(e.target.value); setURLParam("minPrice", Number(e.target.value))}}/>
        <BaseInput label='Max price' value={maxPriceFilter} onChange={(e)=>{setMaxPriceFilter(e.target.value); setURLParam("maxPrice", Number(e.target.value))}}/>
        <SelectInput label="Results per page" options={limitOptions} value={limit} onChange={(e)=>{setLimit(Number(e.target.value)); setOffset(0); setURLParam("limit", Number(e.target.value)); setURLParam("offset", 0)}}/>
        </div>
        <div>

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
          {filteredData.map((p) => (
            <tr key={p?.id} className="bg-[var(--light-bg)]">
              <td className="p-2 mb-8 rounded-l-2xl"><img className="mr-8 rounded-xl size-full" src={p?.images?.[0]} alt={p?.title} /></td>
              <td className="p-2 w-full">{p?.title}</td>
              <td className="p-2 w-full text-center">{p?.category.name}</td>
              <td className="p-2 text-center rounded-r-2xl">{p?.price}$</td>
              <td className="bg-[var(--dark-bg)]"></td>
              {/* <td className="w-1/2">{p?.description}</td> */}
              <td className="p-2 text-center rounded-2xl">
                <div className="flex h-full items-center justify-evenly">
                  <Link className=' color-gray-200 p-1 rounded-full transition-all font-semibold hover:text-amber-500 transition active:scale-95' to={`/products/${p?.id}`}><ReceiptText className="size-5"/></Link>
                  <Link className=' color-gray-200 p-1 rounded-full transition-all font-semibold hover:text-amber-500 transition active:scale-95' to={`/products/${p?.id}/edit`}><Settings className="size-5"/></Link>
                  <Trash onClick={()=>openDeleteModalHandler(p.id)} className='color-gray-200 size-5 cursor-pointer  rounded-full transition-all  hover:text-amber-500 transition active:scale-95' to={`/products/${p?.id}/edit`}/>
                </div>
              </td>
            </tr>))
          }
        </tbody>
        
      </table>
      </div>
      <div className="mb-8 flex justify-between items-center">
        <button onClick={()=>{
          const newOffset = offset - limit;
          setOffset(() => newOffset); 
          setURLParam("offset", newOffset)
        }} disabled={offset === 0} className='flex h-fit disabled:cursor-auto disabled:opacity-25 disabled:pointer-events-none justify-between items-center bg-gray-200 px-2 py-1 text-xs md:px-4 md:py-2 rounded-full transition-all font-semibold text-gray-900 hover:bg-amber-500 hover:text-gray-200 transition active:scale-95'><ChevronLeft /> Previous page </button>
        <p className="text-gray-300">Page: {(offset+limit)/limit}</p>
        <button onClick={()=>{
          const newOffset = offset + limit;
          setOffset(() => newOffset); 
          setURLParam("offset", newOffset)
        }} disabled={filteredData.length < limit} className='flex h-fit disabled:cursor-auto disabled:opacity-25 disabled:pointer-events-none cursor-pointer justify-bwtween items-center bg-gray-200 px-2 py-1 text-xs md:px-4 md:py-2 rounded-full transition-all font-semibold text-gray-900 hover:bg-amber-500 hover:text-gray-200 transition active:scale-95'>Next page <ChevronRight /></button>
      </div>
      { modalVisible && <div onClick={()=>{setModalVisible(false)}}
          className={`fixed top-0 left-0 size-full z-9999 transition-opacity duration-300 flex justify-center items-center bg-black/30 backdrop-blur-sm`}
        >
          <div onClick={(e) => e.stopPropagation()} className="rounded-2xl shadow-2xl bg-[var(--dark-bg)] text-center p-8">
            <h3 className="my-8 font-bold text-2xl text-amber-500">Are you sure?</h3>
            <p className="mb-12">This action is irreversible.</p>
            <div className="flex justify-between">
              <button onClick={closeDeleteModalHandler} className='border border-gray-200 px-2 py-1 cursor-pointer text-xs md:px-4 md:py-2 rounded-full transition-all font-semibold text-gray-200 hover:border-amber-500 hover:text-amber-500 transition active:scale-95'>Close</button>
              <button onClick={productDeleteHandler} className='bg-gray-200 px-2 py-1 cursor-pointer text-xs md:px-4 md:py-2 rounded-full transition-all font-semibold text-gray-900 text-gray-200 hover:bg-amber-500 hover:text-gray-200 transition active:scale-95'>Delete</button>
            </div>
          </div>
        </div>
      }
    </section>
  );
};
