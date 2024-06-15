import { useApiRootStore } from '@/stores/ApiRootStore';
import type { ClientResponse, Product } from '@commercetools/platform-sdk';

export function getProductById(productId: string): Promise<ClientResponse<Product>> {
  const apiRoot = useApiRootStore().apiRoot;
  return apiRoot.products().withId({ ID: productId }).get().execute();
}
