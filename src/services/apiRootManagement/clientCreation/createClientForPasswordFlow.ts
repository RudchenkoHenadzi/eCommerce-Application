import { ClientBuilder, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import type { PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk';

export default function createClientForPasswordFlow(
  credentialsFlowOptions: PasswordAuthMiddlewareOptions,
  httpMiddlewareOptions: HttpMiddlewareOptions
) {
  return new ClientBuilder()
    .withPasswordFlow(credentialsFlowOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
}
