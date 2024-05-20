import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient
} from '@commercetools/platform-sdk'
import { type Client, ClientBuilder, type TokenCache } from '@commercetools/sdk-client-v2'
import config from '../configs/project-configs'
import type { PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk'
import MyTokenStore from '@/configs/tokenStore'
const { projectKey, authURL, apiURL, clientID, secret, scopes } = config

class ApiRootStore {
  private readonly projectKey: string
  private readonly authURL: string
  private readonly apiURL: string
  private readonly clientID: string
  private readonly secret: string
  private readonly scopes: string[]
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
    this.apiRoot = this.createApiRoot()
    this.getProjectInfo()
      .then((res) => console.log(res, this.anonymousToken, this.authToken))
      .catch(console.error)
  }

  getProjectInfo() {
    return this.apiRoot.get().execute()
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
    successHandler: () => void
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
                this.createClientForCredentialsFlow(email, password)
                this.createApiRoot()
                this.getProjectInfo()
                  .then((res) => console.log(res, this.anonymousToken, this.authToken))
                  .catch(console.error)
                successHandler()
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

  createApiRoot() {
    this.apiRoot = createApiBuilderFromCtpClient(this.client).withProjectKey({
      projectKey: this.projectKey
    })
    return this.apiRoot
  }

  createClientForAnonymousFlow() {
    return new ClientBuilder()
      .withAnonymousSessionFlow(this.createAuthMiddlewareOptions(this.anonymousToken))
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

  createClientForCredentialsFlow(email: string, password: string) {
    return new ClientBuilder()
      .withPasswordFlow(this.createClientCredentialsFlowOptions(email, password, this.authToken))
      .withProjectKey(projectKey)
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

  createRefreshTokenFlowOptions(tokenCache: TokenCache) {
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
}

const apiRootStore = new ApiRootStore(projectKey, authURL, apiURL, clientID, secret, scopes)

export default apiRootStore
