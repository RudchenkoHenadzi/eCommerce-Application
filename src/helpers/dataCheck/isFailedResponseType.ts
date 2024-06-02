import type { ClientResponse, ProductPagedQueryResponse } from '@commercetools/platform-sdk'

export default function isFailedResponseType<T extends ClientResponse<ProductPagedQueryResponse>>(response: any): response is T {
  return 'message' in response
}
