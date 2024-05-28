import { ClientBuilder } from '@commercetools/sdk-client-v2'
import MyTokenStore from '@/constants/tokenStore'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import PROJECT_CONFIG from '@/constants/projectConfigs'
const { projectKey, authURL, apiURL, clientID, secret, scopes } = PROJECT_CONFIG

const anonymousClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withAnonymousSessionFlow({
    host: authURL,
    projectKey: projectKey,
    credentials: {
      clientId: clientID,
      clientSecret: secret
    },
    scopes: scopes,
    tokenCache: new MyTokenStore(),
    fetch
  })
  .withHttpMiddleware({
    host: apiURL,
    fetch
  })
  .build()

const apiRoot = createApiBuilderFromCtpClient(anonymousClient).withProjectKey({
  projectKey: projectKey
})

export { anonymousClient, apiRoot }
