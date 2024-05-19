import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type TokenCache
} from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import type { PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk'
import config from './project-configs'

const { projectKey, authURL, apiURL, clientID, secret, scopes } = config

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authURL,
  projectKey: projectKey,
  credentials: {
    clientId: clientID,
    clientSecret: secret
  },
  scopes: scopes,
  fetch
}

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiURL,
  fetch
}

export const anonymousClient = new ClientBuilder()
  .withAnonymousSessionFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build()

export const newClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build()
// Export the ClientBuilder
