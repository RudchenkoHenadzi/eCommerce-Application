import { useApiRootStore } from '@/stores/ApiRootStore'
import type {
  ClientResponse,
  ErrorResponse,
  Product,
  ProductPagedQueryResponse
} from '@commercetools/platform-sdk'

export default async function getProducts(): Promise<
  ClientResponse<ProductPagedQueryResponse> | Product[]
> {
  const apiRoot = useApiRootStore().apiRoot

  try {
    const productsResult: ClientResponse<ProductPagedQueryResponse> | ErrorResponse = await apiRoot
      .products()
      .get()
      .execute()

    if (productsResult.statusCode === 200 || productsResult.statusCode === 201) {
      return productsResult.body.results
    } else {
      return productsResult
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      const keyMessage = error.message.split(':')[0]
      throw new Error(keyMessage)
    } else {
      throw new Error('commonError')
    }
  }
}
