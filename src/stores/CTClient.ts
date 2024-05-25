import { defineStore } from 'pinia'
import {
  type ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient
} from '@commercetools/platform-sdk'
import config from '@/configs/project-configs'
import { type Client, ClientBuilder, type TokenCache } from '@commercetools/sdk-client-v2'
import MyTokenStore from '@/configs/tokenStore'
import type { PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk'
import { useUserStore } from '@/stores/User'
import type { ICustomerDraft } from '@/types/customer-types'
const { projectKey, authURL, apiURL, clientID, secret, scopes } = config

export const useApiRootStore = defineStore('apiRoot', {
  state: (): {
    client: Client | ClientBuilder
    apiRoot: null | ByProjectKeyRequestBuilder
    projectKey: string
    authURL: string
    apiURL: string
    clientID: string
    secret: string
    scopes: string[]
    anonymousToken: MyTokenStore
    authToken: MyTokenStore
  } => ({
    client: new ClientBuilder(),
    apiRoot: null,
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
      this.createClientForAnonymousFlow()
      this.createApiRoot()
      this.getAnonymousToken()
    },
    createApiRoot() {
      this.apiRoot = createApiBuilderFromCtpClient(this.client).withProjectKey({
        projectKey: this.projectKey
      })
    },
    async getToken(client: Client, email: string, password: string) {
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
    createClientForAnonymousFlow() {
      this.client = new ClientBuilder()
        .withProjectKey(projectKey)
        .withAnonymousSessionFlow(this.createAuthMiddlewareOptions(this.anonymousToken))
        .withHttpMiddleware(this.createHttpMiddlewareOptions())
        .withLoggerMiddleware()
        .build()
    },
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
    },
    createHttpMiddlewareOptions() {
      return {
        host: this.apiURL,
        fetch
      }
    },
    getProjectData() {
      if (this.apiRoot) {
        return this.apiRoot.get().execute()
      } else {
        return new Promise((res) => res(undefined))
      }
    },
    loginUser(
      email: string,
      password: string,
      userNotExistHandler: (text: string) => void,
      successHandler: (email: string) => void
    ) {
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
                  this.getToken(client, email, password)
                  this.createApiRoot()
                  userNotExistHandler('Вы успешно вошли в учетную запись.')
                  setTimeout(() => {
                    successHandler(email)
                  }, 2300)
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
          } else if (isUserExist === undefined) {
            userNotExistHandler('Что-то пошло не так. Повторите попытку позже.')
          } else {
            userNotExistHandler(
              'Такого пользователя не существует. Пожалуйста, исправьте введенный адрес электронной почты и попробуйте еще раз.'
            )
          }
        })
        .catch(console.error)
    },
    async registerUser(customerDraft: ICustomerDraft) {
      if (this.apiRoot) {
        return this.apiRoot
          .customers()
          .post({ body: customerDraft })
          .execute()
          .then((res) => console.log(res))
          .catch(console.error)
      }
    },
    async checkUserExist(email: string) {
      if (this.apiRoot) {
        return this.apiRoot
          .customers()
          .get({
            queryArgs: {
              where: `email="${email}"`
            }
          })
          .execute()
          .then((res) => res.body.results.length > 0)
      } else {
        return new Promise((res) => res(undefined))
      }
    },
    createClientForPasswordFlow(email: string, password: string) {
      return new ClientBuilder()
        .withPasswordFlow(
          this.createClientCredentialsFlowOptions(email, password, new MyTokenStore())
        )
        .withHttpMiddleware(this.createHttpMiddlewareOptions())
        .withLoggerMiddleware()
        .build()
    },
    createClientCredentialsFlowOptions(
      email: string,
      password: string,
      token: TokenCache
    ): PasswordAuthMiddlewareOptions {
      token = new MyTokenStore()
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
    },
    getAnonymousToken() {
      if (this.apiRoot) {
        this.apiRoot
          .get()
          .execute()
          .then(() => {
            const user = useUserStore()
            user.setUserToken(this.anonymousToken.get().token)
            const refreshToken = this.anonymousToken.get().refreshToken
            if (refreshToken) user.setUserRefreshToken(refreshToken)
          })
          .catch((err) => console.log(err))
      } else {
        console.log("apiRoot doesn't exist. getAnonymousToken")
        return
      }
    },
    getAuthToken() {
      if (this.apiRoot) {
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
      } else {
        console.log("apiRoot doesn't exist")
        return
      }
    }
  }
})
