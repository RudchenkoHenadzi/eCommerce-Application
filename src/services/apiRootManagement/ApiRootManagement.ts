import createAuthMiddlewareOptions from '@/services/apiRootManagement/optionsCreating/createAuthMiddlewareOptions';
import createHttpMiddlewareOptions from '@/services/apiRootManagement/optionsCreating/createHttpMiddlewareOptions';
import createClientForAnonymousFlow from '@/services/apiRootManagement/clientCreation/createClientForAnonymousFlow';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import PROJECT_CONFIG from '@/constants/projectConfigs';
import createClientCredentialsFlowOptions from '@/services/apiRootManagement/optionsCreating/createClientCredentialsFlowOptions';
import createClientForPasswordFlow from '@/services/apiRootManagement/clientCreation/createClientForPasswordFlow';
import createClientForRefreshTokenFlow from '@/services/apiRootManagement/clientCreation/createClientForRefreshTokenFlow';
import createAuthMiddlewareOptionsRefreshFlow from '@/services/apiRootManagement/optionsCreating/createAuthMiddlewareOptionsRefreshFlow';
const { projectKey } = PROJECT_CONFIG;

const ApiRootManagement = {
  createAnonymousSessionFlow() {
    const credentialsFlowOptions = createAuthMiddlewareOptions();
    const httpMiddlewareOptions = createHttpMiddlewareOptions();
    const client = createClientForAnonymousFlow(credentialsFlowOptions, httpMiddlewareOptions);
    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey
    });
  },

  createAuthSessionFlow(email: string, password: string) {
    const credentialsFlowOptions = createClientCredentialsFlowOptions(email, password);
    const httpMiddlewareOptions = createHttpMiddlewareOptions();
    const client = createClientForPasswordFlow(credentialsFlowOptions, httpMiddlewareOptions);
    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey
    });
  },

  createAuthSessionFlowWithRefresh(refreshToken: string) {
    const credentialsFlowOptions = createAuthMiddlewareOptionsRefreshFlow(refreshToken);
    const httpMiddlewareOptions = createHttpMiddlewareOptions();
    const client = createClientForRefreshTokenFlow(credentialsFlowOptions, httpMiddlewareOptions);
    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey
    });
  }
};

export default ApiRootManagement;
