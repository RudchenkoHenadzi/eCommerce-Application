import { useApiRootStore } from '@/stores/ApiRootStore';
import type { ClientResponse, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import { PRODUCTS_LIMIT_PER_LOAD } from '@/constants/projectConfigs';

export default async function getProducts(
  pageNumber?: number
): Promise<ClientResponse<ProductPagedQueryResponse>> {
  const apiRoot = useApiRootStore().apiRoot;

  try {
    return await apiRoot
      .products()
      .get({
        queryArgs: {
          limit: PRODUCTS_LIMIT_PER_LOAD,
          offset: pageNumber ? (pageNumber - 1) * PRODUCTS_LIMIT_PER_LOAD : 0
        }
      })
      .execute();
  } catch (error) {
    if (error instanceof Error) {
      const keyMessage = error.message.split(':')[0];
      throw new Error(keyMessage);
    } else {
      throw new Error('commonError');
    }
  }
}
