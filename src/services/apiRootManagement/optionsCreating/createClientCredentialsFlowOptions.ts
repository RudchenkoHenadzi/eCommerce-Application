import MyTokenStore from '@/stores/tokenStore';
import PROJECT_CONFIG from '@/constants/projectConfigs';
import type { PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk';
const { projectKey, authURL, clientID, secret, scopes } = PROJECT_CONFIG;

export default function createClientCredentialsFlowOptions(
  email: string,
  password: string
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
    tokenCache: new MyTokenStore(),
    fetch
  };
}
