import getCategories from '../utils/get-categories'
import getVendors, { Brands } from '../utils/get-vendors'
import { Category } from '@commerce/types'
import { getConfig, SwellConfig } from '../api'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: Brands
  }
> = T

const getSiteInfo = async (options?: {
  variables?: any
  config: SwellConfig
  preview?: boolean
}): Promise<GetSiteInfoResult> => {
  let { config } = options ?? {}

  config = getConfig(config)

  const categoriesPromise = getCategories(config)
  const brandsPromise = getVendors(config)

  return {
    categories: await categoriesPromise,
    brands: await brandsPromise,
  }
}

export default getSiteInfo
