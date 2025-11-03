import { SessionStorageKeys, type URLState, URLStateKeys } from '../models';

export function getURLParamFromStorage(key: URLStateKeys) {
  const paramsItem = sessionStorage.getItem(SessionStorageKeys.PRODUCTS_LIST_URL_PARAMS);
  let paramsObj: URLState = {};

  if (paramsItem) {
    try {
      paramsObj = JSON.parse(paramsItem);
    } catch {
      return null;
    }
  }
  return paramsObj[key];
}
