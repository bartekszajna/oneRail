import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PRODUCTS_LIST_URL_PARAMS = 'productsListURLParams';

export type urlState = {
  title?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  offset?: number;
  limit?: number;
};

export function useURLState(initial: urlState = {}) {
  const [searchParams] = useSearchParams();

  const paramsFromURL = Object.fromEntries(searchParams.entries());

  let paramsFromStorage: urlState = {};

  try {
    const storedSessionStorageParams = sessionStorage.getItem(PRODUCTS_LIST_URL_PARAMS);
    if (storedSessionStorageParams) {
      paramsFromStorage = JSON.parse(storedSessionStorageParams);
    }
  } catch {
    paramsFromStorage = {};
  }

  const [urlState, setUrlState] = useState<urlState>(() => ({
    ...initial,
    ...paramsFromStorage,
    ...paramsFromURL,
  }));

  function setURLParam(key: keyof typeof urlState, value: string | number) {
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
    sessionStorage.setItem(PRODUCTS_LIST_URL_PARAMS, JSON.stringify(urlState));
  }, [urlState]);

  useEffect(() => {
    const params = new URLSearchParams(urlState as Record<string, string>);
    const hasParamsInURL =
      window.location.search.includes('=') || window.location.hash.includes('?');

    if (!hasParamsInURL && Object.keys(urlState).length > 0) {
      // zbuduj nowy URL tak jak w setURLParam
      const newQuery = params.toString() ? `?${params.toString()}` : '';
      const hash = window.location.hash || '#/';
      const hashPath = hash.split('?')[0];
      const newFullUrl =
        window.location.pathname +
        window.location.search +
        '#' +
        hashPath.replace(/^#/, '') +
        newQuery;

      // nie wywoła loadera
      window.history.replaceState({}, '', newFullUrl);
    }
    // tylko przy mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    urlState,
    setURLParam,
  };
}
