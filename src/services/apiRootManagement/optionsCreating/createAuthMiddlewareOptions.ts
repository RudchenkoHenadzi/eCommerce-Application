import MyTokenStore from '@/stores/tokenStore'
import PROJECT_CONFIG from '@/constants/projectConfigs'
import { getAnonymousId } from '@/helpers/localStorageServices/anonymousIdActions'
import { createAnonymousID } from '@/helpers/creators/createAnonymousID'
const { projectKey, authURL, clientID, secret, scopes } = PROJECT_CONFIG

export default function createAuthMiddlewareOptions(refreshToken?: string) {
  const anonymousId = getAnonymousId() || createAnonymousID()
  return {
    host: authURL,
    projectKey: projectKey,
    credentials: {
      clientId: clientID,
      clientSecret: secret
    },
    scopes: scopes,
    refreshToken: refreshToken,
    tokenCache: new MyTokenStore(),
    anonymousId,
    fetch
  }
}
