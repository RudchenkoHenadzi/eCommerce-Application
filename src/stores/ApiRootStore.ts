import { defineStore } from 'pinia'
import { type ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk'
import { useUserStore } from '@/stores/User'
import apiRootManagement from '@/services/apiRootManagement/ApiRootManagement'

export const useApiRootStore = defineStore('apiRoot', {
  state: (): {
    apiRoot: ByProjectKeyRequestBuilder
  } => ({
    apiRoot: apiRootManagement.createAnonymousSessionFlow()
  }),
  getters: {},
  actions: {
    async start() {
      const user = useUserStore()
      const refreshToken = user.refreshToken
      if (user.isLoggedIn) {
        if (refreshToken) {
          this.setNewApiRoot(apiRootManagement.createAuthSessionFlowWithRefresh(refreshToken))
        } else {
          user.logout()
        }
      }
    },
    setNewApiRoot(apiRoot: ByProjectKeyRequestBuilder) {
      this.apiRoot = apiRoot
    },
    createAnonymousApiRoot() {
      this.setNewApiRoot(apiRootManagement.createAnonymousSessionFlow())
    },
    createAuthApiRoot(email: string, password: string) {
      this.setNewApiRoot(apiRootManagement.createAuthSessionFlow(email, password))
    }
  }
})
