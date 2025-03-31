export const DEVELOPMENT = 'development'

export enum COOKIES_KEY {
  USER_TOKEN = '__token',
  REFRESH_TOKEN = '__refresh_token',
  IP = '__ip',
  COUNTRY = '__country',
  CURRENCY = '__currency',
  IS_REDIRECT = '__is_redirect',
  LANG = '__language',
  LOCATION = '__location',
  GA_CLIENT_ID = '_ga',
  MAKE_PAYMENT_TOKEN = 'make_payment_id',
  ORDER_PAYMENT_TOKEN = 'order_payment_id'
}

export const PAGE_QUERY_PARAMS = [
  'page',
  'character',
  'status',
  'currency',
  'pageKeyword',
  'search',
  'category',
  'token',
  'step',
  'geo_country'
] as const
