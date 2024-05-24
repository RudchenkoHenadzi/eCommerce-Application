import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient
} from '@commercetools/platform-sdk'
import { type Client, ClientBuilder, type TokenCache } from '@commercetools/sdk-client-v2'
import config from '../configs/project-configs'
import type { PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk'
import MyTokenStore from '@/configs/tokenStore'
import type { ICustomerDraft } from '@/types/customer-types'
import { useUserStore } from '@/stores/User'
const { projectKey, authURL, apiURL, clientID, secret, scopes } = config

export class ApiRootStore {
  readonly projectKey: string
  readonly authURL: string
  readonly apiURL: string
  readonly clientID: string
  readonly secret: string
  readonly scopes: string[]
  anonymousToken: TokenCache
  authToken: TokenCache
  client: Client
  apiRoot: ByProjectKeyRequestBuilder
  constructor(
    projectKey: string,
    authURL: string,
    apiURL: string,
    clientID: string,
    secret: string,
    scopes: string[]
  ) {
    this.projectKey = projectKey
    this.authURL = authURL
    this.apiURL = apiURL
    this.clientID = clientID
    this.secret = secret
    this.scopes = scopes
    this.anonymousToken = new MyTokenStore()
    this.authToken = new MyTokenStore()
    this.client = this.createClientForAnonymousFlow()
    /* this.start()*/
    this.apiRoot = this.createApiRoot()
    this.apiRoot.me().get().execute().then(console.log).catch(console.error)
  }

  start() {
    const user = useUserStore()
    if (user.getUserRefreshToken) {
      this.client = this.createClientForRefreshTokenFlow()
    } else {
      this.client = this.createClientForAnonymousFlow()
    }
  }

  /*getToken() {
    this.apiRoot
      .get()
      .execute()
      .then(() => {

        const user = useUserStore();
        user.setUserToken(this.anonymousToken.get().token);
        const refreshToken = this.anonymousToken.get().refreshToken;
        if (refreshToken) user.setUserRefreshToken(refreshToken);
      })
      .catch((err) => console.log(err))
  }*/

  getAuthToken() {
    this.apiRoot
      .get()
      .execute()
      .then(() => {
        const user = useUserStore()
        user.setUserToken(this.authToken.get().token)
        const refreshToken = this.authToken.get().refreshToken
        if (refreshToken) user.setUserRefreshToken(refreshToken)
      })
      .catch((err) => console.log(err))
  }

  checkUserExist(email: string) {
    return this.apiRoot
      .customers()
      .get({
        queryArgs: {
          where: `email="${email}"`
        }
      })
      .execute()
      .then((res) => res.body.results.length > 0)
  }

  loginUser(
    email: string,
    password: string,
    userNotExistHandler: (text: string) => void,
    successHandler: (email: string) => void
  ) {
    this.checkUserExist(email)
      .then((isUserExist) => {
        if (isUserExist) {
          this.apiRoot
            .me()
            .login()
            .post({ body: { email, password } })
            .execute()
            .then((res) => {
              if (res.statusCode === 200) {
                this.createClientForPasswordFlow(email, password)
                this.createApiRoot()
                this.getAuthToken()
                /*const config = {
                  headers: { Authorization: `Bearer ${token}` }
                };

                const bodyParameters = {
                  key: "value"
                };

                Axios.post(
                  'http://localhost:8000/api/v1/get_token_payloads',
                  bodyParameters,
                  config
                ).then(console.log).catch(console.log);
                this.getToken()*/
                /*.then((res) => console.log(res, this.anonymousToken, this.authToken))
                  .catch(console.error)*/
                successHandler(email)
              } else {
                console.log(`error. The statusCode is ${res.statusCode}`)
              }
            })
            .catch((err) => {
              if (err.statusCode === 400) {
                userNotExistHandler(
                  'Неверный пароль. Пожалуйста, исправьте введенный пароль и попробуйте еще раз.'
                )
              }
            })
        } else {
          userNotExistHandler(
            'Такого пользователя не существует. Пожалуйста, исправьте введенный адрес электронной почты и попробуйте еще раз.'
          )
        }
      })
      .catch(console.error)
  }

  registerUser(customerDraft: ICustomerDraft) {
    return this.apiRoot
      .customers()
      .post({ body: customerDraft })
      .execute()
      .then((res) => console.log(res))
      .catch(console.error)
  }

  createApiRoot() {
    return createApiBuilderFromCtpClient(this.client).withProjectKey({
      projectKey: this.projectKey
    })
  }

  createAuthMiddlewareOptions(tokenCache?: TokenCache) {
    return {
      host: this.authURL,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientID,
        clientSecret: this.secret
      },
      scopes: this.scopes,
      tokenCache: tokenCache || this.anonymousToken,
      fetch
    }
  }

  createHttpMiddlewareOptions() {
    return {
      host: this.apiURL,
      fetch
    }
  }

  createClientForAnonymousFlow() {
    return new ClientBuilder()
      .withAnonymousSessionFlow(this.createAuthMiddlewareOptions(this.anonymousToken))
      .withHttpMiddleware(this.createHttpMiddlewareOptions())
      .withLoggerMiddleware()
      .build()
  }

  createClientForRefreshTokenFlow() {
    return new ClientBuilder()
      .withRefreshTokenFlow(this.createRefreshTokenFlowOptions())
      .withHttpMiddleware(this.createHttpMiddlewareOptions())
      .withLoggerMiddleware()
      .build()
  }

  createRefreshTokenFlowOptions() {
    const user = useUserStore()
    return {
      host: this.authURL,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientID,
        clientSecret: this.secret
      },
      refreshToken: user.userRefreshToken
    }
  }

  createClientForPasswordFlow(email: string, password: string) {
    return new ClientBuilder()
      .withPasswordFlow(this.createClientCredentialsFlowOptions(email, password, this.authToken))
      .withHttpMiddleware(this.createHttpMiddlewareOptions())
      .withLoggerMiddleware()
      .build()
  }

  createAuthClient() {
    return new ClientBuilder()
      .withClientCredentialsFlow(this.createAuthMiddlewareOptions(this.authToken))
      .withHttpMiddleware(this.createHttpMiddlewareOptions())
      .withLoggerMiddleware()
      .build()
  }

  createClientCredentialsFlowOptions(
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

  /*createRefreshTokenFlowOptions(tokenCache: TokenCache) {
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
  }*/
}

const apiRootStore = new ApiRootStore(projectKey, authURL, apiURL, clientID, secret, scopes)

export default apiRootStore
