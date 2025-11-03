export const enum SessionStorageKeys {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  PRODUCTS_LIST_URL_PARAMS = 'productsListURLParams',
}

export const enum URLStateKeys {
  TITLE = 'title',
  CATEGORY = 'category',
  MIN_PRICE = 'minPrice',
  MAX_PRICE = 'maxPrice',
  OFFSET = 'offset',
  LIMIT = 'limit',
}

export type URLState = {
  [URLStateKeys.TITLE]?: string;
  [URLStateKeys.CATEGORY]?: string;
  [URLStateKeys.MIN_PRICE]?: string;
  [URLStateKeys.MAX_PRICE]?: string;
  [URLStateKeys.OFFSET]?: number;
  [URLStateKeys.LIMIT]?: number;
};

export const enum SORTING {
  ASC = 'asc',
  DESC = 'desc',
}
