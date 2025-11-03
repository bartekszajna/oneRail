import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { type URLState, URLStateKeys, SessionStorageKeys } from '@/shared/models';

import { deleteProduct } from '@/api/deleteProduct';
import { getProducts } from '@/api';
import type { Products } from '../../api/models';
import { SORTING } from '@shared/models';
import { QUERY_KEYS } from '@/router/models';

export function useURLState(initial: URLState = {}) {
  const [searchParams] = useSearchParams();

  let paramsFromURL: URLState = Object.fromEntries(searchParams.entries());
  paramsFromURL = {
    ...paramsFromURL,
    ...(paramsFromURL.offset && { offset: Number(paramsFromURL.offset) }),
    ...(paramsFromURL.limit && { limit: Number(paramsFromURL.limit) }),
  };

  let paramsFromStorage: URLState = {};

  try {
    const storedSessionStorageParams = sessionStorage.getItem(
      SessionStorageKeys.PRODUCTS_LIST_URL_PARAMS
    );
    if (storedSessionStorageParams) {
      paramsFromStorage = JSON.parse(storedSessionStorageParams);
    }
  } catch {
    paramsFromStorage = {};
  }

  const [urlState, setUrlState] = useState<URLState>(() => ({
    ...initial,
    ...paramsFromStorage,
    ...paramsFromURL,
  }));

  function setURLParam(key: URLStateKeys, value: string | number) {
    setUrlState((prev) => {
      const next = { ...prev };
      if (!value) {
        delete next[key];
      } else {
        (next as Record<string, string | number>)[key] = value;
      }

      const params = new URLSearchParams(next as Record<string, string>);
      const newQuery = params.toString() ? `?${params.toString()}` : '';

      const hash = window.location.hash || '#/';
      const hashPath = hash.split('?')[0];
      const newFullUrl =
        window.location.pathname +
        window.location.search +
        '#' +
        hashPath.replace(/^#/, '') +
        newQuery;

      window.history.replaceState({}, '', newFullUrl);

      return next;
    });
  }

  useEffect(() => {
    sessionStorage.setItem(SessionStorageKeys.PRODUCTS_LIST_URL_PARAMS, JSON.stringify(urlState));
  }, [urlState]);

  useEffect(() => {
    const params = new URLSearchParams(urlState as Record<string, string>);
    const hasParamsInURL =
      window.location.search.includes('=') || window.location.hash.includes('?');

    if (!hasParamsInURL && Object.keys(urlState).length > 0) {
      const newQuery = params.toString() ? `?${params.toString()}` : '';
      const hash = window.location.hash || '#/';
      const hashPath = hash.split('?')[0];
      const newFullUrl =
        window.location.pathname +
        window.location.search +
        '#' +
        hashPath.replace(/^#/, '') +
        newQuery;

      window.history.replaceState({}, '', newFullUrl);
    }
  }, [urlState]);

  return {
    urlState,
    setURLParam,
  };
}

export const useMethods = () => {
  const { urlState, setURLParam } = useURLState();
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [limit, setLimit] = useState(urlState.limit || 10);
  const [offset, setOffset] = useState(urlState.offset || 0);

  const [titleSort, setTitleSort] = useState<SORTING | null>(null);
  const [priceSort, setPriceSort] = useState<SORTING | null>(null);

  const [titleFilter, setTitleFilter] = useState<string>(urlState.title || '');
  const [categoryFilter, setCategoryFilter] = useState<string>(urlState.category || '');
  const [minPriceFilter, setMinPriceFilter] = useState<string>(urlState.minPrice || '');
  const [maxPriceFilter, setMaxPriceFilter] = useState<string>(urlState.maxPrice || '');

  const queryClient = useQueryClient();

  function priceSortHandler() {
    setPriceSort((prev) => {
      return prev === null ? SORTING.ASC : prev === SORTING.ASC ? SORTING.DESC : null;
    });
  }
  function titleSortHandler() {
    setPriceSort(null);
    setTitleSort((prev) => {
      return prev === null ? SORTING.ASC : prev === SORTING.ASC ? SORTING.DESC : null;
    });
  }

  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      setProductIdToDelete(null);
      setModalVisible(false);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS, { limit, offset }] });
    },
  });

  const titleFilterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleFilter(e.target.value);
    setURLParam(URLStateKeys.TITLE, e.target.value);
  };

  const categoryFilterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFilter(e.target.value);
    setURLParam(URLStateKeys.CATEGORY, e.target.value);
  };

  const minPriceFilterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPriceFilter(e.target.value);
    setURLParam(URLStateKeys.MIN_PRICE, Number(e.target.value));
  };

  const maxPriceFilterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPriceFilter(e.target.value);
    setURLParam(URLStateKeys.MAX_PRICE, Number(e.target.value));
  };

  const limitSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setOffset(0);
    setURLParam(URLStateKeys.LIMIT, Number(e.target.value));
    setURLParam(URLStateKeys.OFFSET, 0);
  };

  const previousPageHandler = () => {
    const newOffset = offset - limit;
    setOffset(() => newOffset);
    setURLParam(URLStateKeys.OFFSET, newOffset);
  };

  const nextPageHandler = () => {
    const newOffset = offset + limit;
    setOffset(() => newOffset);
    setURLParam(URLStateKeys.OFFSET, newOffset);
  };

  const openDeleteModalHandler = (id: number) => {
    setProductIdToDelete(id);
    setModalVisible(true);
  };

  const closeDeleteModalHandler = () => {
    setProductIdToDelete(null);
    setModalVisible(false);
  };

  const productDeleteHandler = () => {
    if (productIdToDelete !== null) {
      mutate(productIdToDelete);
    }
  };

  const { data } = useQuery<Products>({
    queryKey: [QUERY_KEYS.PRODUCTS, { limit, offset }],
    placeholderData: (prev) => prev,
    queryFn: () => getProducts(limit, offset),
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data
      .filter((product) => {
        const matchesTitle = titleFilter
          ? product.title.toLowerCase().includes(titleFilter.toLowerCase())
          : true;
        const matchesMinPrice = minPriceFilter
          ? Number(product.price) >= Number(minPriceFilter)
          : true;
        const matchesMaxPrice = maxPriceFilter
          ? Number(product.price) <= Number(maxPriceFilter)
          : true;
        const matchesCategory = categoryFilter
          ? product.category.name.toLowerCase().includes(categoryFilter.toLowerCase())
          : true;

        return matchesTitle && matchesMinPrice && matchesMaxPrice && matchesCategory;
      })
      .sort((a, b) => {
        if (titleSort === SORTING.ASC) {
          return a.title.localeCompare(b.title, 'pl', { sensitivity: 'base' });
        }
        if (titleSort === SORTING.DESC) {
          return b.title.localeCompare(a.title, 'pl', { sensitivity: 'base' });
        }
        if (priceSort === SORTING.ASC) {
          return a.price - b.price;
        }
        if (priceSort === SORTING.DESC) {
          return b.price - a.price;
        } else return 0;
      });
  }, [data, titleFilter, minPriceFilter, maxPriceFilter, categoryFilter, titleSort, priceSort]);

  return {
    data: filteredData,
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
    nextPageHandler,
    previousPageHandler,
    openDeleteModalHandler,
    closeDeleteModalHandler,
    productDeleteHandler,
    priceSortHandler,
    titleSortHandler,
  };
};
