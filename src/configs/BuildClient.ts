import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type TokenCache
} from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import type { PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk'
import projectConfig from './project-configs'

const { projectKey, authURL, apiURL, clientID, secret, scopes } = projectConfig

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

export function createClientCredentialsFlowOptions(
  email: string,
  password: string,
  token: TokenCache
): PasswordAuthMiddlewareOptions {
  return {
    host: authURL,
    projectKey: projectKey,
    credentials: {
      clientId: clientID,
      clientSecret: secret,
      user: {
        username: email,
        password
      }
    },
    scopes: scopes,
    tokenCache: token,
    fetch
  }
}

export function createRefreshTokenFlowOptions(tokenCache: TokenCache) {
  return {
    host: authURL,
    projectKey: projectKey,
    credentials: {
      clientId: clientID,
      clientSecret: secret
    },
    scopes: [scopes],
    tokenCache,
    fetch
  }
}

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiURL,
  fetch
}

export function createClientForCredentialsFlow(
  credentialsFlowOptions: PasswordAuthMiddlewareOptions
) {
  return new ClientBuilder()
    .withClientCredentialsFlow(credentialsFlowOptions)
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build()
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

export const authApiRoot = createApiBuilderFromCtpClient(newClient).withProjectKey({ projectKey })
export const anonymousApiRoot = createApiBuilderFromCtpClient(anonymousClient).withProjectKey({
  projectKey
})
