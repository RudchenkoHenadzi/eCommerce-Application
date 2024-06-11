import MyTokenStore from '@/stores/tokenStore'
import PROJECT_CONFIG from '@/constants/projectConfigs'
const { projectKey, authURL, clientID, secret, scopes } = PROJECT_CONFIG

export default function createAuthMiddlewareOptions(refreshToken?: string) {
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
    fetch
  }
}
