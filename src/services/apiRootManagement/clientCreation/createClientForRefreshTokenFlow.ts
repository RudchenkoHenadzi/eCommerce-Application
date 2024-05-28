import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type RefreshAuthMiddlewareOptions
} from '@commercetools/sdk-client-v2'

export default function createClientForRefreshTokenFlow(
  refreshTokenFlowOptions: RefreshAuthMiddlewareOptions,
  httpMiddlewareOptions: HttpMiddlewareOptions
) {
  return new ClientBuilder()
    .withRefreshTokenFlow(refreshTokenFlowOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build()
}
