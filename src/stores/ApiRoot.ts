import { defineStore } from 'pinia'
import {
  type ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient
} from '@commercetools/platform-sdk'
import projectConfig, {
  timeoutForErrorMessages,
  timeoutForShortMessages
} from '@/configs/projectConfigs'
import { type Client, ClientBuilder, type TokenCache } from '@commercetools/sdk-client-v2'
import MyTokenStore from '@/configs/tokenStore'
import type { PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk'
import { useUserStore } from '@/stores/User'
import type { ICustomerDraft } from '@/types/customer-types'
const { projectKey, authURL, apiURL, clientID, secret, scopes } = projectConfig

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
  .withLoggerMiddleware()
  .build()

const apiRoot = createApiBuilderFromCtpClient(anonymousClient).withProjectKey({
  projectKey: projectKey
})

export const useApiRootStore = defineStore('apiRoot', {
  state: (): {
    client: Client
    apiRoot: ByProjectKeyRequestBuilder
    projectKey: string
    authURL: string
    apiURL: string
    clientID: string
    secret: string
    scopes: string[]
    anonymousToken: MyTokenStore
    authToken: MyTokenStore
  } => ({
    client: anonymousClient,
    apiRoot: apiRoot,
    projectKey,
    authURL,
    apiURL,
    clientID,
    secret,
    scopes,
    anonymousToken: new MyTokenStore(),
    authToken: new MyTokenStore()
  }),
  getters: {},
  actions: {
    start() {
      const user = useUserStore()
      const refreshToken = user.getUserRefreshToken
      if (refreshToken) {
        console.log('here')
        this.authToken.set({ token: '', refreshToken: refreshToken, expirationTime: 0 })
        this.createClientForRefreshTokenFlow()
        this.refreshTokenFn()
      } else {
        this.saveAnonymousToken()
      }
    },
    createApiRoot() {
      this.apiRoot = createApiBuilderFromCtpClient(this.client).withProjectKey({
        projectKey: this.projectKey
      })
    },
    getProjectData() {
      if (this.apiRoot) {
        return this.apiRoot.get().execute()
      } else {
        return new Promise((res) => res(undefined))
      }
    },

    loginUser(email: string, password: string, showAlert: (text: string, delay: number) => void) {
      this.checkUserExist(email)
        .then((isUserExist) => {
          if (isUserExist && this.apiRoot) {
            this.apiRoot
              .me()
              .login()
              .post({ body: { email, password } })
              .execute()
              .then((res) => {
                if (res.statusCode === 200) {
                  const client = this.createClientForPasswordFlow(email, password)
                  this.saveAuthTokenTS(client, email, password)
                  this.createApiRoot()
                  showAlert('Вы успешно вошли в учетную запись.', timeoutForShortMessages)
                } else {
                  showAlert(
                    'Что-то пошло не так. Повторите попытку позже.',
                    timeoutForErrorMessages
                  )
                }
              })
              .catch((err) => {
                if (err.statusCode === 400) {
                  showAlert(
                    'Неверный пароль. Пожалуйста, исправьте введенный пароль и попробуйте еще раз.',
                    timeoutForErrorMessages
                  )
                }
              })
          } else if (isUserExist === undefined) {
            showAlert('Что-то пошло не так. Повторите попытку позже.', timeoutForErrorMessages)
          } else {
            showAlert(
              'Такого пользователя не существует. Пожалуйста, исправьте введенный адрес электронной почты и попробуйте еще раз.',
              timeoutForErrorMessages
            )
          }
        })
        .catch(() => {
          showAlert('Что-то пошло не так. Повторите попытку позже.', timeoutForErrorMessages)
        })
    },

    async registerUser(customerDraft: ICustomerDraft) {
      return this.apiRoot
        .customers()
        .post({ body: customerDraft })
        .execute()
        .then((res) => {
          console.log(res)
          return res
        })
        .catch((error) => {
          throw error
        })
    },
    async checkUserExist(email: string) {
      return this.apiRoot
        .customers()
        .get({
          queryArgs: {
            where: `email="${email}"`
          }
        })
        .execute()
        .then((res) => res.body.results.length > 0)
    },

    saveAnonymousToken() {
      this.apiRoot
        .get()
        .execute()
        .then(() => {
          const user = useUserStore()
          user.setUserToken(this.anonymousToken.get().token)
          const refreshToken = this.anonymousToken.get().refreshToken
          if (refreshToken) user.setUserRefreshToken(refreshToken)
          console.log('res anon tokens')
          console.log(user.userToken)
          console.log(user.userRefreshToken)
        })
        .catch((err) => console.log(err))
      return
    },
    async saveAuthTokenTS(client: Client, email: string, password: string) {
      try {
        const result = await client.execute({
          uri: `${this.apiURL}/oauth/${this.projectKey}/customers/token`,
          method: 'POST',
          body: JSON.stringify({
            grant_type: 'password',
            email,
            password,
            scope: this.scopes
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        console.log('Token:', result)
      } catch (error) {
        console.error('Error getting token:', error)
      }
    },
    getAuthTokenBySDK() {
      this.apiRoot
        .get()
        .execute()
        .then(() => {
          const user = useUserStore()
          user.setUserToken(this.authToken.get().token)
          const refreshToken = this.authToken.get().refreshToken
          if (refreshToken) user.setUserRefreshToken(refreshToken)
          console.log('res auth tokens')
          console.log(user.userToken)
          console.log(user.userRefreshToken)
        })
        .catch((err) => console.log(err))
      return
    },
    createClientCredentialsFlowOptions(
      email: string,
      password: string
    ): PasswordAuthMiddlewareOptions {
      this.authToken = new MyTokenStore()
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
        tokenCache: this.authToken,
        fetch
      }
    },
    createClientForAnonymousFlow() {
      this.client = new ClientBuilder()
        .withProjectKey(projectKey)
        .withAnonymousSessionFlow(this.createAuthMiddlewareOptions(this.anonymousToken))
        .withHttpMiddleware(this.createHttpMiddlewareOptions())
        .withLoggerMiddleware()
        .build()
    },
    createClientForRefreshTokenFlow() {
      this.client = new ClientBuilder()
        .withRefreshTokenFlow(this.createAuthMiddlewareOptions())
        .withHttpMiddleware(this.createHttpMiddlewareOptions())
        .withLoggerMiddleware()
        .build()
    },
    async refreshTokenFn() {
      this.getProjectData()
        .then((projectData) => {
          console.log(projectData)
        })
        .catch((err) => console.log(err))
      /*const refreshToken = this.authToken.get().refreshToken || this.anonymousToken.get().refreshToken || '';
      try {
        const result = await client.execute({
          uri: `${this.authURL}/oauth/token`,
          method: 'POST',
          body: JSON.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        console.log('New token:', result);
      } catch (error) {
        console.error('Error refreshing token:', error);
      }*/
    },
    createClientForPasswordFlow(email: string, password: string) {
      return new ClientBuilder()
        .withPasswordFlow(this.createClientCredentialsFlowOptions(email, password))
        .withHttpMiddleware(this.createHttpMiddlewareOptions())
        .withLoggerMiddleware()
        .build()
    },
    createAuthMiddlewareOptions(tokenCache?: TokenCache) {
      const refreshToken =
        this.authToken.get().refreshToken || this.anonymousToken.get().refreshToken || ''
      this.anonymousToken = new MyTokenStore()
      return {
        host: this.authURL,
        projectKey: this.projectKey,
        credentials: {
          clientId: this.clientID,
          clientSecret: this.secret
        },
        scopes: this.scopes,
        refreshToken: refreshToken,
        tokenCache: tokenCache || this.anonymousToken,
        fetch
      }
    },
    createHttpMiddlewareOptions() {
      return {
        host: this.apiURL,
        fetch
      }
    }
  }
})
