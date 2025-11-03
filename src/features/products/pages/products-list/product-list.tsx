import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Modal } from '../../components/modal';
import { ProductsTable } from '../../components/products-table';
import { useMethods } from './hooks';

export const ProductsList = () => {
  const {
    data,
    modalVisible,
    limit,
    offset,
    titleSort,
    priceSort,
    titleFilter,
    categoryFilter,
    minPriceFilter,
    maxPriceFilter,
    titleFilterHandler,
    categoryFilterHandler,
    minPriceFilterHandler,
    maxPriceFilterHandler,
    limitSelectHandler,
    previousPageHandler,
    nextPageHandler,
    openDeleteModalHandler,
    closeDeleteModalHandler,
    productDeleteHandler,
    titleSortHandler,
    priceSortHandler } = useMethods();

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

      <ProductsTable 
        data={data}
        limit={limit}
        offset={offset}
        titleSort={titleSort}
        priceSort={priceSort}
        titleFilter={titleFilter}
        categoryFilter={categoryFilter}
        minPriceFilter={minPriceFilter}
        maxPriceFilter={maxPriceFilter}
        titleFilterHandler={titleFilterHandler}
        categoryFilterHandler={categoryFilterHandler}
        minPriceFilterHandler={minPriceFilterHandler}
        maxPriceFilterHandler={maxPriceFilterHandler}
        limitSelectHandler={limitSelectHandler}
        previousPageHandler={previousPageHandler}
        nextPageHandler={nextPageHandler}
        deleteProductHandler={openDeleteModalHandler}
        titleSortHandler={titleSortHandler}
        priceSortHandler={priceSortHandler}
      />
      
      <Modal isOpen={modalVisible} confirmHandler={productDeleteHandler} cancelHandler={closeDeleteModalHandler}>
        <h3 className="my-8 font-bold text-2xl text-amber-500">Are you sure?</h3>
        <p className="mb-12">This action is irreversible.</p>
      </Modal>
    </section>
  );
};
