import type { RequestInit } from '@vercel/fetch'
import type { CommerceAPIConfig } from '@commerce/api'
import { CommerceAPI, getCommerceApi as commerceApi } from '@commerce/api'
import fetcher from './utils/fetch-local'

import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getCustomerWishlist from './operations/get-customer-wishlist'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'

export interface LocalConfig extends CommerceAPIConfig {
  restFetch<Data = any>(
    url: string,
    fetchOptions?: RequestInit
  ): Promise<{ data: Data }>
}

const config: LocalConfig = {
  commerceUrl: '',
  apiToken: '',
  cartCookie: '',
  customerCookie: '',
  cartCookieMaxAge: 2592000,
  fetch: (): any => null,
  restFetch: fetcher,
}

const operations = {
  getAllPages,
  getPage,
  getSiteInfo,
  getCustomerWishlist,
  getAllProductPaths,
  getAllProducts,
  getProduct,
}

export const provider = { config, operations }

export type Provider = typeof provider
export type LocalAPI<P extends Provider = Provider> = CommerceAPI<P>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): LocalAPI<P> {
  return commerceApi(customProvider)
}
