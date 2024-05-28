import { defineStore } from 'pinia'
import {
  type ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient
} from '@commercetools/platform-sdk'
import PROJECT_CONFIG from '@/constants/projectConfigs'
import { type Client, ClientBuilder, type TokenCache } from '@commercetools/sdk-client-v2'
import MyTokenStore from '@/constants/tokenStore'
import type { PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk'
import { useUserStore } from '@/stores/User'
import type { ICustomerDraft } from '@/types/customer-types'
import { anonymousClient, apiRoot } from '@/stores/createFirstAnonymousFlow'
const { projectKey, authURL, apiURL, clientID, secret, scopes } = PROJECT_CONFIG

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
    async start() {
      const user = useUserStore()
      const refreshToken = user.getUserRefreshToken
      if (user.isUserLoggedIn && refreshToken) {
        this.authToken.set({ token: '', refreshToken: refreshToken, expirationTime: 0 })
        this.createClientForRefreshTokenFlow(this.authToken)
      }
    },
    createApiRoot() {
      this.apiRoot = createApiBuilderFromCtpClient(this.client).withProjectKey({
        projectKey: this.projectKey
      })
    },
    getProjectData() {
      return this.apiRoot.get().execute()
    },

    async loginUser(email: string, password: string) {
      this.createClientForPasswordFlow(email, password)
      this.createApiRoot()
      try {
        const result = await this.apiRoot
          .me()
          .login()
          .post({ body: { email, password } })
          .execute()

        if (result.statusCode !== 200) {
          this.createClientForAnonymousFlow()
          this.createApiRoot()
        }
        return result
      } catch (e: unknown) {
        this.createClientForAnonymousFlow()
        this.createApiRoot()
        if (e instanceof Error && e.message.includes('not found')) {
          throw new Error('userNotExist')
        } else {
          throw new Error('commonError')
        }
      }
    },
    async registerUser(customerDraft: ICustomerDraft) {
      try {
        const res = await this.apiRoot
          .customers()
          .post({ body: customerDraft })
          .execute()

        if (res.statusCode === 201) {
          const { email, password } = customerDraft
          this.createClientForPasswordFlow(email, password)
          this.createApiRoot()
        }
        return res
      } catch (e) {
        throw new Error('commonError')
      }
    },
    logoutUser() {
      const user = useUserStore()
      user.logout()
      this.createClientForAnonymousFlow()
      this.createApiRoot()
      this.getProjectData()
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
        .build()
    },
    createClientForRefreshTokenFlow(token: MyTokenStore) {
      this.client = new ClientBuilder()
        .withRefreshTokenFlow(this.createAuthMiddlewareOptions(token))
        .withHttpMiddleware(this.createHttpMiddlewareOptions())
        .build()
    },
    createClientForPasswordFlow(email: string, password: string) {
      this.client = new ClientBuilder()
        .withPasswordFlow(this.createClientCredentialsFlowOptions(email, password))
        .withHttpMiddleware(this.createHttpMiddlewareOptions())
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
