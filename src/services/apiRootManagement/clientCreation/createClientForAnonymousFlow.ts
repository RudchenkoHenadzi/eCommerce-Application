import {
  type AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions
} from '@commercetools/sdk-client-v2'
import PROJECT_CONFIG from '@/constants/projectConfigs'
const { projectKey } = PROJECT_CONFIG

export default function createClientForAnonymousFlow(
  credentialsFlowOptions: AnonymousAuthMiddlewareOptions,
  httpMiddlewareOptions: HttpMiddlewareOptions
) {
  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(credentialsFlowOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build()
}
