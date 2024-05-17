import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type TokenCache
} from '@commercetools/sdk-client-v2'
const host = import.meta.env.VITE_CTP_AUTH_URL || ''
const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY || ''
const clientId = import.meta.env.VITE_CTP_CLIENT_ID || ''
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET || ''
const scope = import.meta.env.VITE_CTP_SCOPES || ''

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: host,
  projectKey: projectKey,
  credentials: {
    clientId: clientId,
    clientSecret: clientSecret
  },
  scopes: [scope],
  fetch
}

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: host,
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
